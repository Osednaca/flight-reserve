import { Component } from '@angular/core';
import { RouterLink, Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, CommonModule],
  template: `
    <div class="min-h-screen bg-gray-100 dark:bg-gray-900">
      <div class="container mx-auto px-4 py-12">
        <div class="text-center">
          <h1 class="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Sistema de Reserva de Vuelos
          </h1>
          <p class="text-lg text-gray-600 dark:text-gray-300 mb-8">
            Encuentra y reserva tu próximo vuelo de manera fácil y rápida
          </p>
          <div class="space-x-4">
            <a 
              routerLink="/flights" 
              class="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition duration-300"
            >
              Buscar Vuelos
            </a>
            <a 
              *ngIf="!(authService.getCurrentUser() | async)"
              routerLink="/login" 
              class="inline-block bg-gray-600 text-white px-6 py-3 rounded-lg hover:bg-gray-700 transition duration-300"
            >
              Iniciar Sesión
            </a>
          </div>
        </div>
      </div>
    </div>
  `
})
export class HomeComponent {
  constructor(public authService: AuthService) {}
}