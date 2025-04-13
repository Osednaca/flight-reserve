import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FlightService } from '../../../core/services/flight.service';
import { AirportService } from '../../../core/services/airport.service';
import { SeatClassService } from '../../../core/services/seat-class.service';
import { BookingService } from '../../../core/services/booking.service';
import { AuthService } from '../../../core/services/auth.service';
import { LoadingSpinnerComponent } from '../../../shared/components/loading-spinner/loading-spinner.component';
import { Booking, BookingStatus } from '../../../core/models/booking.model';
import { LucideAngularModule } from 'lucide-angular';

@Component({
  selector: 'app-flight-search',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, LoadingSpinnerComponent, LucideAngularModule],
  template: `
    <div class="container mx-auto px-4 py-8">
      <div class="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 backdrop-blur-sm border border-gray-200 dark:border-gray-700">
        <h2 class="text-2xl font-bold mb-6 dark:text-white flex items-center">
          <lucide-icon name="plane" class="w-6 h-6 mr-2 text-primary"></lucide-icon>
          Buscar Vuelos
        </h2>
        
        <form [formGroup]="searchForm" (ngSubmit)="onSearch()" class="space-y-6">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <!-- Origin -->
            <div class="space-y-2">
              <label class="text-sm font-medium text-gray-700 dark:text-gray-300">Origen</label>
              <div class="relative">
                <lucide-icon name="plane-takeoff" class="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400"></lucide-icon>
                <select
                  formControlName="origen"
                  class="pl-10 w-full py-3 px-4 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-colors duration-200"
                >
                  <option value="">Seleccionar origen</option>
                  <option *ngFor="let airport of airports" [value]="airport.id">
                    {{airport.codigo}} - {{airport.nombre}}
                  </option>
                </select>
              </div>
            </div>

            <!-- Destination -->
            <div class="space-y-2">
              <label class="text-sm font-medium text-gray-700 dark:text-gray-300">Destino</label>
              <div class="relative">
                <lucide-icon name="plane-landing" class="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400"></lucide-icon>
                <select
                  formControlName="destino"
                  class="pl-10 w-full py-3 px-4 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-colors duration-200"
                >
                  <option value="">Seleccionar destino</option>
                  <option *ngFor="let airport of airports" [value]="airport.id">
                    {{airport.codigo}} - {{airport.nombre}}
                  </option>
                </select>
              </div>
            </div>

            <!-- Date -->
            <div class="space-y-2">
              <label class="text-sm font-medium text-gray-700 dark:text-gray-300">Fecha</label>
              <div class="relative">
                <lucide-icon name="calendar-days" class="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400"></lucide-icon>
                <input
                  type="date"
                  formControlName="fecha"
                  class="pl-10 w-full py-3 px-4 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-colors duration-200"
                >
              </div>
            </div>

            <!-- Seat Class -->
            <div class="space-y-2">
              <label class="text-sm font-medium text-gray-700 dark:text-gray-300">Clase</label>
              <div class="relative">
                <lucide-icon name="user" class="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400"></lucide-icon>
                <select
                  formControlName="clase_asiento"
                  class="pl-10 w-full py-3 px-4 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-colors duration-200"
                >
                  <option value="">Seleccionar clase</option>
                  <option *ngFor="let class of seatClasses" [value]="class.id">
                    {{class.nombre}}
                  </option>
                </select>
              </div>
            </div>
          </div>

          <div class="flex justify-end">
            <button
              type="submit"
              [disabled]="searchForm.invalid || isLoading"
              class="flex items-center px-6 py-3 bg-primary hover:bg-primary/90 text-white rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 dark:focus:ring-offset-gray-800 shadow-lg hover:shadow-xl"
            >
              <lucide-icon name="search" class="w-5 h-5 mr-2"></lucide-icon>
              {{ isLoading ? 'Buscando...' : 'Buscar Vuelos' }}
            </button>
          </div>
        </form>
      </div>

      <!-- Results -->
      <div *ngIf="flights.length > 0" class="mt-8 space-y-6">
        <div *ngFor="let flight of flights" class="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-shadow duration-300">
          <div class="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
            <div class="flex-1">
              <div class="flex items-center space-x-4 mb-4">
                <div class="flex items-center space-x-2 text-primary">
                  <lucide-icon name="plane" class="w-6 h-6"></lucide-icon>
                  <span class="text-lg font-bold">{{flight.codigo_vuelo}}</span>
                </div>
                <div class="text-sm text-gray-500 dark:text-gray-400">
                  {{flight.duracion}}
                </div>
              </div>
              
              <div class="flex flex-col space-y-2">
                <div class="flex items-center space-x-2">
                  <div class="w-4 h-4 rounded-full bg-green-500"></div>
                  <p class="text-gray-600 dark:text-gray-300">
                    {{flight.fecha_salida | date:'medium'}}
                  </p>
                </div>
                <div class="flex items-center space-x-2">
                  <div class="w-4 h-4 rounded-full bg-red-500"></div>
                  <p class="text-gray-600 dark:text-gray-300">
                    {{flight.fecha_llegada | date:'medium'}}
                  </p>
                </div>
              </div>
            </div>

            <div class="flex flex-col items-end space-y-4">
              <div class="text-right">
                <p class="text-3xl font-bold text-primary">
                  {{calculatePrice(flight) | currency:'USD'}}
                </p>
                <p class="text-sm text-gray-500 dark:text-gray-400">Precio final con impuestos</p>
              </div>

              <button
                (click)="onBookFlight(flight)"
                class="flex items-center px-6 py-3 bg-green-500 hover:bg-green-600 text-white rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 shadow-md hover:shadow-lg"
              >
                <lucide-icon name="credit-card" class="w-5 h-5 mr-2"></lucide-icon>
                Reservar Ahora
              </button>
            </div>
          </div>
        </div>
      </div>

      <div *ngIf="isLoading" class="flex justify-center mt-8">
        <app-loading-spinner></app-loading-spinner>
      </div>

      <div *ngIf="!isLoading && flights.length === 0 && hasSearched" class="mt-8 text-center">
        <p class="text-gray-600 dark:text-gray-400">No se encontraron vuelos para los criterios seleccionados.</p>
      </div>
    </div>
  `
})
export class FlightSearchComponent implements OnInit {
  searchForm: FormGroup;
  flights: any[] = [];
  airports: any[] = [];
  seatClasses: any[] = [];
  isLoading = false;
  hasSearched = false;

  constructor(
    private fb: FormBuilder,
    private flightService: FlightService,
    private airportService: AirportService,
    private seatClassService: SeatClassService,
    private bookingService: BookingService,
    private authService: AuthService
  ) {
    this.searchForm = this.fb.group({
      origen: ['', Validators.required],
      destino: ['', Validators.required],
      fecha: ['', Validators.required],
      clase_asiento: ['', Validators.required]
    });
  }

  ngOnInit() {
    console.log('FlightSearchComponent initialized');
    this.checkLucideIcons();
    this.loadInitialData();
  }

  private async loadInitialData() {
    this.isLoading = true;
    try {
      const [airportsResponse, classesResponse] = await Promise.all([
        this.airportService.getAirports().toPromise(),
        this.seatClassService.getSeatClasses().toPromise()
      ]);
      
      this.airports = airportsResponse || [];
      this.seatClasses = classesResponse || [];
    } catch (error) {
      console.error('Error loading initial data:', error);
    } finally {
      this.isLoading = false;
    }
  }

  async onSearch() {
    if (this.searchForm.invalid) return;

    this.isLoading = true;
    this.hasSearched = true;
    try {
      const { origen, destino, fecha } = this.searchForm.value;
      this.flights = await this.flightService.searchFlights(origen, destino, fecha).toPromise() || [];
    } catch (error) {
      console.error('Error searching flights:', error);
    } finally {
      this.isLoading = false;
    }
  }

  calculatePrice(flight: any): number {
    const selectedClass = this.seatClasses.find(c => c.id === this.searchForm.value.clase_asiento);
    const basePrice = flight.precio_base;
    return basePrice + (selectedClass?.precio_extra || 0);
  }

  async onBookFlight(flight: any) {
    const user = await this.authService.getCurrentUser().toPromise();
    if (!user) return;

    const booking: Partial<Booking> = {
      usuario_id: user.id,
      vuelo_id: flight.id,
      clase_asiento_id: this.searchForm.value.clase_asiento,
      numero_asiento: this.generateSeatNumber(),
      estado: 'pendiente' as BookingStatus,
      cantidad: this.calculatePrice(flight)
    };

    try {
      await this.bookingService.createBooking(booking).toPromise();
      // Update available seats in UI
      const index = this.flights.findIndex(f => f.id === flight.id);
      if (index !== -1) {
        this.flights[index] = { ...flight, asientos_disponibles: flight.asientos_disponibles - 1 };
      }
      // Show success message or navigate to bookings page
    } catch (error) {
      console.error('Error creating booking:', error);
      // Show error message
    }
  }

  private generateSeatNumber(): string {
    // Simple seat number generation - you might want to implement a more sophisticated system
    const rows = 'ABCDEFGHIJK';
    const row = rows[Math.floor(Math.random() * rows.length)];
    const number = Math.floor(Math.random() * 30) + 1;
    return `${row}${number}`;
  }

  private checkLucideIcons(): void {
    const lucideIcons = document.querySelectorAll('lucide-icon');
    console.log(`Found ${lucideIcons.length} lucide-icon elements in the DOM.`);
    lucideIcons.forEach((icon, index) => {
      console.log(`Icon ${index + 1}:`, icon);
    });
  }
}