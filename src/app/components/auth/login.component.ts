import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule],
  template: \`
    <div class="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
      <div class="max-w-md w-full space-y-8 p-8 bg-white dark:bg-gray-800 rounded-lg shadow-md">
        <h2 class="text-3xl font-bold text-center dark:text-white">{{ labels[language].signIn }}</h2>
        
        <form (ngSubmit)="onSubmit()" class="mt-8 space-y-6">
          <div class="rounded-md shadow-sm space-y-4">
            <div>
              <label class="sr-only">{{ labels[language].email }}</label>
              <input
                [(ngModel)]="email"
                name="email"
                type="email"
                required
                class="appearance-none rounded-lg relative block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 placeholder-gray-500 dark:placeholder-gray-400 text-gray-900 dark:text-white focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                [placeholder]="labels[language].email"
              >
            </div>
            <div>
              <label class="sr-only">{{ labels[language].password }}</label>
              <input
                [(ngModel)]="password"
                name="password"
                type="password"
                required
                class="appearance-none rounded-lg relative block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 placeholder-gray-500 dark:placeholder-gray-400 text-gray-900 dark:text-white focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                [placeholder]="labels[language].password"
              >
            </div>
          </div>

          <div>
            <button
              type="submit"
              class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              {{ labels[language].signIn }}
            </button>
          </div>
        </form>
      </div>
    </div>
  \`
})
export class LoginComponent {
  email = '';
  password = '';
  language: 'en' | 'es' = 'en';

  labels = {
    en: {
      signIn: 'Sign in',
      email: 'Email address',
      password: 'Password'
    },
    es: {
      signIn: 'Iniciar sesión',
      email: 'Correo electrónico',
      password: 'Contraseña'
    }
  };

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  async onSubmit() {
    try {
      await this.authService.signIn(this.email, this.password);
      this.router.navigate(['/']);
    } catch (error) {
      console.error('Login error:', error);
      // Handle error appropriately
    }
  }
}