import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../core/services/auth.service';
import { ErrorMessageComponent } from '../../../shared/components/error-message/error-message.component';
import { ButtonComponent } from '../../../shared/components/button/button.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ErrorMessageComponent, ButtonComponent, RouterLink],
  template: `
    <div class="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
      <div class="max-w-md w-full space-y-8 p-8 bg-white dark:bg-gray-800 rounded-lg shadow-md">
        <div class="text-center">
          <h2 class="text-3xl font-bold text-gray-900 dark:text-white">{{ labels[language].signIn }}</h2>
          <p class="mt-2 text-sm text-gray-600 dark:text-gray-400">
            {{ labels[language].noAccount }} 
            <a routerLink="/register" class="text-blue-600 hover:text-blue-500">
              {{ labels[language].register }}
            </a>
          </p>
        </div>

        <form [formGroup]="loginForm" (ngSubmit)="onSubmit()" class="mt-8 space-y-6">
          <div class="rounded-md shadow-sm space-y-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">
                {{ labels[language].email }}
              </label>
              <input
                formControlName="email"
                type="email"
                required
                class="appearance-none rounded-lg relative block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 placeholder-gray-500 dark:placeholder-gray-400 text-gray-900 dark:text-white focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                [placeholder]="labels[language].emailPlaceholder"
              >
              <app-error-message
                *ngIf="loginForm.get('email')?.errors?.['required'] && loginForm.get('email')?.touched"
                [message]="labels[language].emailRequired"
              ></app-error-message>
              <app-error-message
                *ngIf="loginForm.get('email')?.errors?.['email'] && loginForm.get('email')?.touched"
                [message]="labels[language].emailInvalid"
              ></app-error-message>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">
                {{ labels[language].password }}
              </label>
              <input
                formControlName="password"
                type="password"
                required
                class="appearance-none rounded-lg relative block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 placeholder-gray-500 dark:placeholder-gray-400 text-gray-900 dark:text-white focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                [placeholder]="labels[language].passwordPlaceholder"
              >
              <app-error-message
                *ngIf="loginForm.get('password')?.errors?.['required'] && loginForm.get('password')?.touched"
                [message]="labels[language].passwordRequired"
              ></app-error-message>
            </div>
          </div>

          <app-error-message
            *ngIf="errorMessage"
            [message]="errorMessage"
          ></app-error-message>

          <app-button
            type="submit"
            [loading]="isLoading"
            [disabled]="loginForm.invalid || isLoading"
          >
            {{ labels[language].signIn }}
          </app-button>
        </form>
      </div>
    </div>
  `
})
export class LoginComponent {
  loginForm: FormGroup;
  isLoading = false;
  errorMessage = '';
  language: 'en' | 'es' = 'en';

  labels = {
    en: {
      signIn: 'Sign In',
      noAccount: 'Don\'t have an account?',
      register: 'Register',
      email: 'Email',
      emailPlaceholder: 'Enter your email',
      emailRequired: 'Email is required',
      emailInvalid: 'Please enter a valid email',
      password: 'Password',
      passwordPlaceholder: 'Enter your password',
      passwordRequired: 'Password is required'
    },
    es: {
      signIn: 'Iniciar Sesión',
      noAccount: '¿No tienes una cuenta?',
      register: 'Regístrate',
      email: 'Correo electrónico',
      emailPlaceholder: 'Ingresa tu correo electrónico',
      emailRequired: 'El correo electrónico es requerido',
      emailInvalid: 'Por favor ingresa un correo electrónico válido',
      password: 'Contraseña',
      passwordPlaceholder: 'Ingresa tu contraseña',
      passwordRequired: 'La contraseña es requerida'
    }
  };

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }

  async onSubmit() {
    if (this.loginForm.invalid) return;

    this.isLoading = true;
    this.errorMessage = '';

    try {
      await this.authService.signIn(
        this.loginForm.value.email,
        this.loginForm.value.password
      );
      this.router.navigate(['/']);
    } catch (error: any) {
      this.errorMessage = this.language === 'en' 
        ? 'Invalid email or password'
        : 'Correo electrónico o contraseña inválidos';
      console.error('Login error:', error);
    } finally {
      this.isLoading = false;
    }
  }
}