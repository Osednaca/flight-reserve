import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LucideAngularModule } from 'lucide-angular';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, FormsModule, LucideAngularModule],
  template: `
    <div [ngClass]="{'dark': isDarkMode}" class="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <header class="bg-gradient-to-r from-blue-600 to-indigo-700 dark:from-blue-800 dark:to-indigo-900 text-white py-4 shadow-lg">
        <div class="container mx-auto px-4 flex justify-between items-center">
          <div class="flex items-center space-x-2">
            <lucide-icon name="plane" class="w-8 h-8"></lucide-icon>
            <h1 class="text-3xl font-bold tracking-tight">{{ title[language] }}</h1>
          </div>
          <div class="flex items-center space-x-4">
            <select 
              [(ngModel)]="language" 
              class="bg-white/20 backdrop-blur-sm text-white py-2 px-3 rounded-md border border-white/30 focus:outline-none focus:ring-2 focus:ring-white/50"
            >
              <option value="en">English</option>
              <option value="es">Español</option>
            </select>
            <button 
              (click)="toggleDarkMode()" 
              class="bg-white/20 backdrop-blur-sm text-white p-2 rounded-full hover:bg-white/30 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-white/50"
            >
              <lucide-icon [name]="isDarkMode ? 'sun' : 'moon'" class="w-5 h-5"></lucide-icon>
            </button>
          </div>
        </div>
      </header>
      <main class="container mx-auto px-4 py-8">
        <router-outlet></router-outlet>
      </main>
      <footer class="bg-gray-100 dark:bg-gray-800 py-6 border-t border-gray-200 dark:border-gray-700">
        <div class="container mx-auto px-4">
          <div class="flex flex-col md:flex-row justify-between items-center">
            <div class="text-center md:text-left mb-4 md:mb-0">
              <p class="text-gray-600 dark:text-gray-300">© 2025 Flight Booking. All rights reserved.</p>
            </div>
            <div class="flex space-x-4">
              <a href="#" class="text-gray-600 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400 transition-colors">
                <span class="sr-only">Twitter</span>
                <lucide-icon name="twitter" class="w-5 h-5"></lucide-icon>
              </a>
              <a href="#" class="text-gray-600 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400 transition-colors">
                <span class="sr-only">Facebook</span>
                <lucide-icon name="facebook" class="w-5 h-5"></lucide-icon>
              </a>
              <a href="#" class="text-gray-600 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400 transition-colors">
                <span class="sr-only">Instagram</span>
                <lucide-icon name="instagram" class="w-5 h-5"></lucide-icon>
              </a>
            </div>
          </div>
        </div>
      </footer>
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