import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, FormsModule],
  template: `
    <div [ngClass]="{'dark': isDarkMode}" class="min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors duration-300">
      <header class="bg-blue-600 dark:bg-blue-800 text-white py-4">
        <div class="container mx-auto px-4 flex justify-between items-center">
          <h1 class="text-3xl font-bold">{{ title[language] }}</h1>
          <div class="flex items-center space-x-4">
            <select [(ngModel)]="language" class="bg-white dark:bg-gray-700 text-gray-800 dark:text-white py-1 px-2 rounded">
              <option value="en">English</option>
              <option value="es">Español</option>
            </select>
            <button (click)="toggleDarkMode()" class="bg-gray-200 dark:bg-gray-600 text-gray-800 dark:text-white py-1 px-3 rounded">
              {{ isDarkMode ? '☀️' : '🌙' }}
            </button>
          </div>
        </div>
      </header>
      <main class="container mx-auto px-4 py-8">
        <router-outlet></router-outlet>
      </main>
    </div>
  `,
})
export class AppComponent {
  title = {
    en: 'Flight Search and Booking',
    es: 'Consulta y Reserva de Vuelos'
  };
  language: 'en' | 'es' = 'es';
  isDarkMode = false;

  toggleDarkMode() {
    this.isDarkMode = !this.isDarkMode;
    document.documentElement.classList.toggle('dark', this.isDarkMode);
  }
}