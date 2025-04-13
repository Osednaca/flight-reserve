import { Injectable } from '@angular/core';
import { createClient, SupabaseClient, User as SupabaseUser } from '@supabase/supabase-js';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private supabase: SupabaseClient;
  private currentUser = new BehaviorSubject<User | null>(null);

  constructor() {
    // We'll need Supabase credentials here
    this.supabase = createClient('YOUR_SUPABASE_URL', 'YOUR_SUPABASE_KEY');
    
    // Check for existing session
    this.supabase.auth.onAuthStateChange((event, session) => {
      if (session?.user) {
        this.setUser(session.user);
      } else {
        this.currentUser.next(null);
      }
    });
  }

  async signUp(email: string, password: string): Promise<void> {
    const { error } = await this.supabase.auth.signUp({ email, password });
    if (error) throw error;
  }

  async signIn(email: string, password: string): Promise<void> {
    const { error } = await this.supabase.auth.signInWithPassword({ email, password });
    if (error) throw error;
  }

  async signOut(): Promise<void> {
    const { error } = await this.supabase.auth.signOut();
    if (error) throw error;
    this.currentUser.next(null);
  }

  getCurrentUser(): Observable<User | null> {
    return this.currentUser.asObservable();
  }

  private setUser(supabaseUser: SupabaseUser) {
    this.currentUser.next({
      id: supabaseUser.id,
      email: supabaseUser.email || ''
    });
  }
}