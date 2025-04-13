import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookingService } from '../../../core/services/booking.service';
import { AuthService } from '../../../core/services/auth.service';
import { LoadingSpinnerComponent } from '../../../shared/components/loading-spinner/loading-spinner.component';

@Component({
  selector: 'app-booking-list',
  standalone: true,
  imports: [CommonModule, LoadingSpinnerComponent],
  template: `
    <div class="container mx-auto px-4 py-8">
      <h2 class="text-2xl font-bold mb-6 dark:text-white">Mis Reservas</h2>

      <div *ngIf="isLoading">
        <app-loading-spinner></app-loading-spinner>
      </div>

      <div *ngIf="!isLoading && bookings.length === 0" class="text-center py-8">
        <p class="text-gray-600 dark:text-gray-400">No tienes reservas activas</p>
      </div>

      <div *ngIf="bookings.length > 0" class="space-y-4">
        <div *ngFor="let booking of bookings" class="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
          <div class="flex justify-between items-start">
            <div>
              <h3 class="text-lg font-semibold dark:text-white">
                Vuelo {{booking.flight?.codigo_vuelo}}
              </h3>
              <p class="text-gray-600 dark:text-gray-400">
                Fecha: {{booking.fecha_reserva | date:'medium'}}
              </p>
              <p class="text-gray-600 dark:text-gray-400">
                Asiento: {{booking.numero_asiento}}
              </p>
              <p class="text-gray-600 dark:text-gray-400">
                Clase: {{booking.seat_class?.nombre}}
              </p>
            </div>
            <div class="text-right">
              <span class="inline-block px-3 py-1 rounded-full" 
                [ngClass]="{
                  'bg-green-100 text-green-800': booking.estado === 'confirmado',
                  'bg-yellow-100 text-yellow-800': booking.estado === 'pendiente',
                  'bg-red-100 text-red-800': booking.estado === 'cancelado'
                }"
              >
                {{booking.estado}}
              </span>
              <p class="mt-2 text-xl font-bold text-blue-600 dark:text-blue-400">
                {{booking.cantidad | currency}}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  `
})
export class BookingListComponent implements OnInit {
  bookings: any[] = [];
  isLoading = false;

  constructor(
    private bookingService: BookingService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.loadBookings();
  }

  private async loadBookings() {
    const user = await this.authService.getCurrentUser().toPromise();
    if (!user) return;

    this.isLoading = true;
    try {
      this.bookings = await this.bookingService.getUserBookings(user.id).toPromise() || [];
    } catch (error) {
      console.error('Error loading bookings:', error);
    } finally {
      this.isLoading = false;
    }
  }
}