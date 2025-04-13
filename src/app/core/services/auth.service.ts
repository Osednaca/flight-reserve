import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { SupabaseService } from './supabase.service';
import { User } from '../models/user.model';
import * as bcrypt from 'bcryptjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUser = new BehaviorSubject<User | null>(null);
  private isAuthenticated = new BehaviorSubject<boolean>(false);

  constructor(
    private supabase: SupabaseService,
    private router: Router
  ) {
    this.initializeAuth();
  }

  private async initializeAuth() {
    const { data: { session } } = await this.supabase.client.auth.getSession();
    if (session?.user) {
      await this.loadUserProfile(session.user.id);
    }

    this.supabase.client.auth.onAuthStateChange(async (event, session) => {
      if (event === 'SIGNED_IN' && session?.user) {
        await this.loadUserProfile(session.user.id);
      } else if (event === 'SIGNED_OUT') {
        this.clearAuthState();
      }
    });
  }

  async signUp(email: string, password: string, nombre: string, telefono?: string): Promise<void> {
    const { error: authError, data: { user } } = await this.supabase.client.auth.signUp({
      email,
      password
    });

    if (authError) throw authError;
    if (!user) throw new Error('No user returned after signup');
    const hashedPassword = await bcrypt.hash(password, 10);
    try {
      const { error: profileError } = await this.supabase.client
        .from('usuarios')
        .insert({
          id: user.id,
          nombre,
          correo_electronico: email,
          contrasena: hashedPassword
        });

      if (profileError) throw profileError;
    } catch (error) {
      await this.supabase.client.auth.admin.deleteUser(user.id); // Rollback
      throw error;
    }
  }

  private async validatePassword(plainTextPassword: string, hashedPassword: string): Promise<boolean> {
    return bcrypt.compare(plainTextPassword, hashedPassword);
  }

  async signIn(email: string, password: string): Promise<boolean> {
    try {
      // Buscar el usuario en la tabla usuarios
      const { data, error } = await this.supabase.client
        .from('usuarios')
        .select('*')
        .eq('correo_electronico', email)
        .single();
  
      if (error) {
        console.error('Error fetching user:', error);
        return false;
      }
  
      if (!data) {
        console.error('No user found with the provided email');
        return false;
      }
  
      // Validar la contraseña (debería estar cifrada en la base de datos)
      const isPasswordValid = await this.validatePassword(password, data.contrasena);
      if (!isPasswordValid) {
        console.error('Invalid password');
        return false;
      }
  
      // Cargar el perfil del usuario en el estado actual
      const user: User = {
        id: data.id,
        email: data.correo_electronico,
        name: data.nombre,
        registrationDate: new Date(data.fecha_registro)
      };
  
      this.currentUser.next(user);
      this.isAuthenticated.next(true);
      console.log('User signed in:', user);
  
      return true;
    } catch (err) {
      console.error('Login error:', err);
      return false;
    }
  }

  async signOut(): Promise<void> {
    const { error } = await this.supabase.client.auth.signOut();
    if (error) throw error;

    this.clearAuthState();
    this.router.navigate(['/login']);
  }

  getCurrentUser(): Observable<User | null> {
    return this.currentUser.asObservable();
  }

  isLoggedIn(): Observable<boolean> {
    return this.isAuthenticated.asObservable();
  }

  private async loadUserProfile(userId: string): Promise<void> {
    const { data, error } = await this.supabase.client
      .from('usuarios')
      .select('*')
      .eq('id', userId)
      .single();

    if (error) throw error;
    if (data) {
      const user: User = {
        id: data.id,
        email: data.correo_electronico,
        name: data.nombre,
        phone: data.telefono,
        registrationDate: new Date(data.fecha_registro)
      };
      this.currentUser.next(user);
      this.isAuthenticated.next(true);
    }
  }

  private clearAuthState(): void {
    this.currentUser.next(null);
    this.isAuthenticated.next(false);
  }
}
