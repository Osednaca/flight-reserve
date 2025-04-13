import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <div class="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
      <div class="max-w-md w-full space-y-8 p-8 bg-white dark:bg-gray-800 rounded-lg shadow-md">
        <h2 class="text-3xl font-bold text-center dark:text-white">Registro</h2>
        
        <form [formGroup]="registerForm" (ngSubmit)="onSubmit()" class="mt-8 space-y-6">
          <div class="rounded-md shadow-sm space-y-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">Nombre</label>
              <input
                formControlName="nombre"
                type="text"
                class="appearance-none rounded-lg relative block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 placeholder-gray-500 dark:placeholder-gray-400 text-gray-900 dark:text-white focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                placeholder="Nombre completo"
              >
            </div>
            
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">Email</label>
              <input
                formControlName="correo_electronico"
                type="email"
                class="appearance-none rounded-lg relative block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 placeholder-gray-500 dark:placeholder-gray-400 text-gray-900 dark:text-white focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                placeholder="correo@ejemplo.com"
              >
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">Teléfono</label>
              <input
                formControlName="telefono"
                type="tel"
                class="appearance-none rounded-lg relative block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 placeholder-gray-500 dark:placeholder-gray-400 text-gray-900 dark:text-white focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                placeholder="+34 123456789"
              >
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">Contraseña</label>
              <input
                formControlName="contrasena"
                type="password"
                class="appearance-none rounded-lg relative block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 placeholder-gray-500 dark:placeholder-gray-400 text-gray-900 dark:text-white focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                placeholder="********"
              >
            </div>
          </div>

          <div>
            <button
              type="submit"
              [disabled]="registerForm.invalid || isLoading"
              class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
            >
              {{ isLoading ? 'Registrando...' : 'Registrarse' }}
            </button>
          </div>
        </form>
      </div>
    </div>
  `
})
export class RegisterComponent {
  registerForm: FormGroup;
  isLoading = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.registerForm = this.fb.group({
      nombre: ['', [Validators.required]],
      correo_electronico: ['', [Validators.required, Validators.email]],
      telefono: [''],
      contrasena: ['', [Validators.required, Validators.minLength(8)]]
    });
  }

  async onSubmit() {
    if (this.registerForm.invalid) return;

    this.isLoading = true;
    try {
      await this.authService.signUp(
        this.registerForm.value.correo_electronico,
        this.registerForm.value.contrasena,
        this.registerForm.value.nombre,
        this.registerForm.value.telefono
      );
      this.router.navigate(['/login']);
    } catch (error) {
      console.error('Error en el registro:', error);
    } finally {
      this.isLoading = false;
    }
  }
}