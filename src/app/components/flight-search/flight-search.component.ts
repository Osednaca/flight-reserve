import { Component, Input, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FlightService } from '../../services/flight.service';
import { AirportService } from '../../services/airport.service';
import { SeatClassService } from '../../services/seat-class.service';
import { AuthService } from '../../services/auth.service';
import { Flight } from '../../models/flight.model';
import { Airport } from '../../models/airport.model';
import { SeatClass } from '../../models/seat-class.model';
import { Router } from '@angular/router';
import { LucideAngularModule } from 'lucide-angular';

@Component({
  selector: 'app-flight-search',
  standalone: true,
  imports: [FormsModule, CommonModule, LucideAngularModule],
  template: `
    <div class="bg-white dark:bg-gray-800 shadow-xl rounded-xl p-8 backdrop-blur-sm border border-gray-100 dark:border-gray-700">
      <h2 class="text-2xl font-bold mb-6 dark:text-white flex items-center">
        <lucide-icon name="plane" class="w-6 h-6 mr-2 text-blue-600 dark:text-blue-400"></lucide-icon>
        {{ labels.searchFlights[language] }}
      </h2>
      
      <!-- User Status -->
      <div *ngIf="!user" class="mb-6 p-4 bg-blue-50 dark:bg-blue-900/30 rounded-lg border border-blue-100 dark:border-blue-800">
        <p class="text-gray-700 dark:text-gray-300 flex items-center text-sm">
          <lucide-icon name="user" class="w-4 h-4 mr-2 text-blue-600 dark:text-blue-400"></lucide-icon>
          {{ labels.loginPrompt[language] }}
          <button (click)="navigateToLogin()" class="ml-2 text-blue-600 dark:text-blue-400 font-medium hover:underline focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 rounded">
            {{ labels.login[language] }}
          </button>
        </p>
      </div>

      <form (ngSubmit)="searchFlights()" class="space-y-6">
        <!-- Origin Airport -->
        <div class="relative">
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            {{ labels.origin[language] }}
          </label>
          <div class="relative">
            <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <lucide-icon name="plane-takeoff" class="w-5 h-5 text-gray-400 dark:text-gray-500"></lucide-icon>
            </div>
            <input
              [(ngModel)]="originQuery"
              (input)="searchOriginAirports()"
              name="origin"
              [placeholder]="labels.origin[language]"
              required
              class="pl-10 w-full py-3 px-4 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-blue-500 dark:focus:border-blue-400 dark:text-white text-sm shadow-sm transition-colors duration-200"
            >
          </div>
          <div *ngIf="originAirports.length > 0" class="absolute z-10 w-full mt-1 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg shadow-xl max-h-64 overflow-y-auto">
            <div
              *ngFor="let airport of originAirports"
              (click)="selectOriginAirport(airport)"
              class="p-3 hover:bg-gray-50 dark:hover:bg-gray-600 cursor-pointer transition-colors duration-150 border-b border-gray-100 dark:border-gray-700 last:border-0"
            >
              <div class="flex items-center">
                <div class="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 font-bold rounded-full w-8 h-8 flex items-center justify-center mr-3">
                  {{ airport.code.substring(0, 1) }}
                </div>
                <div>
                  <p class="font-medium dark:text-white">{{ airport.code }} - {{ airport.name }}</p>
                  <p class="text-sm text-gray-500 dark:text-gray-400">{{ airport.city }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Destination Airport -->
        <div class="relative">
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            {{ labels.destination[language] }}
          </label>
          <div class="relative">
            <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <lucide-icon name="plane-landing" class="w-5 h-5 text-gray-400 dark:text-gray-500"></lucide-icon>
            </div>
            <input
              [(ngModel)]="destinationQuery"
              (input)="searchDestinationAirports()"
              name="destination"
              [placeholder]="labels.destination[language]"
              required
              class="pl-10 w-full py-3 px-4 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-blue-500 dark:focus:border-blue-400 dark:text-white text-sm shadow-sm transition-colors duration-200"
            >
          </div>
          <div *ngIf="destinationAirports.length > 0" class="absolute z-10 w-full mt-1 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg shadow-xl max-h-64 overflow-y-auto">
            <div
              *ngFor="let airport of destinationAirports"
              (click)="selectDestinationAirport(airport)"
              class="p-3 hover:bg-gray-50 dark:hover:bg-gray-600 cursor-pointer transition-colors duration-150 border-b border-gray-100 dark:border-gray-700 last:border-0"
            >
              <div class="flex items-center">
                <div class="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 font-bold rounded-full w-8 h-8 flex items-center justify-center mr-3">
                  {{ airport.code.substring(0, 1) }}
                </div>
                <div>
                  <p class="font-medium dark:text-white">{{ airport.code }} - {{ airport.name }}</p>
                  <p class="text-sm text-gray-500 dark:text-gray-400">{{ airport.city }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Date and Seat Class -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div class="relative">
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              {{ labels.date[language] }}
            </label>
            <div class="relative">
              <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <lucide-icon name="calendar-days" class="w-5 h-5 text-gray-400 dark:text-gray-500"></lucide-icon>
              </div>
              <input
                [(ngModel)]="date"
                name="date"
                type="date"
                required
                class="pl-10 w-full py-3 px-4 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-blue-500 dark:focus:border-blue-400 dark:text-white text-sm shadow-sm transition-colors duration-200"
              >
            </div>
          </div>
          
          <div class="relative">
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              {{ labels.seatClass[language] }}
            </label>
            <div class="relative">
              <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <lucide-icon name="briefcase" class="w-5 h-5 text-gray-400 dark:text-gray-500"></lucide-icon>
              </div>
              <select
                [(ngModel)]="selectedSeatClassId"
                name="seatClass"
                required
                class="pl-10 w-full py-3 px-4 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-blue-500 dark:focus:border-blue-400 dark:text-white text-sm shadow-sm transition-colors duration-200 appearance-none"
              >
                <option value="">{{ labels.selectClass[language] }}</option>
                <option *ngFor="let seatClass of seatClasses" [value]="seatClass.id">
                  {{ seatClass.name }}
                </option>
              </select>
              <div class="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                <lucide-icon name="chevron-down" class="w-5 h-5 text-gray-400 dark:text-gray-500"></lucide-icon>
              </div>
            </div>
          </div>
        </div>

        <button
          type="submit"
          [disabled]="!user"
          class="w-full flex items-center justify-center bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white py-3 px-6 rounded-lg transition-all duration-200 shadow-md hover:shadow-lg disabled:opacity-60 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800"
        >
          <lucide-icon name="search" class="w-5 h-5 mr-2"></lucide-icon>
          {{ labels.search[language] }}
        </button>
      </form>
    </div>

    <!-- Flight Results -->
    <div *ngIf="flights.length > 0" class="mt-10">
      <h3 class="text-xl font-bold mb-6 dark:text-white flex items-center">
        <lucide-icon name="list" class="w-5 h-5 mr-2 text-blue-600 dark:text-blue-400"></lucide-icon>
        {{ labels.results[language] }}
      </h3>
      <div class="space-y-6">
        <div *ngFor="let flight of flights" class="bg-white dark:bg-gray-800 shadow-md hover:shadow-lg transition-shadow duration-300 rounded-xl p-6 border border-gray-100 dark:border-gray-700">
          <div class="flex flex-col lg:flex-row justify-between items-start lg:items-center">
            <div class="mb-4 lg:mb-0">
              <div class="flex items-center mb-2">
                <div class="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 font-bold rounded-full w-10 h-10 flex items-center justify-center mr-3">
                  <lucide-icon name="plane" class="w-5 h-5"></lucide-icon>
                </div>
                <div>
                  <p class="font-bold text-xl dark:text-white">
                    {{ flight.origin }} → {{ flight.destination }}
                  </p>
                </div>
              </div>
              <div class="ml-13 pl-2 border-l-2 border-gray-200 dark:border-gray-700">
                <p class="text-sm text-gray-600 dark:text-gray-400 mb-1 flex items-center">
                  <lucide-icon name="calendar" class="w-4 h-4 mr-2 text-gray-500 dark:text-gray-400"></lucide-icon>
                  {{ flight.departureDate | date:'medium' }}
                </p>
                <p class="text-sm text-gray-600 dark:text-gray-400 flex items-center">
                  <lucide-icon name="users" class="w-4 h-4 mr-2 text-gray-500 dark:text-gray-400"></lucide-icon>
                  {{ labels.availableSeats[language] }}: <span class="font-medium ml-1">{{ flight.availableSeats }}</span>
                </p>
              </div>
            </div>
            <div class="flex flex-col items-end">
              <p class="mb-3 text-2xl font-bold text-blue-600 dark:text-blue-400">
                {{ calculatePrice(flight) | currency }}
              </p>
              <button
                (click)="bookFlight(flight)"
                [disabled]="!user || flight.availableSeats === 0"
                class="flex items-center justify-center bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-lg transition-colors duration-200 disabled:opacity-60 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800"
              >
                <lucide-icon name="credit-card" class="w-4 h-4 mr-2"></lucide-icon>
                {{ labels.book[language] }}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  `
})
export class FlightSearchComponent implements OnInit {
  @Input() language: 'en' | 'es' = 'es';
  
  user: any = null;
  originQuery = '';
  destinationQuery = '';
  date = '';
  selectedSeatClassId = '';
  flights: Flight[] = [];
  originAirports: Airport[] = [];
  destinationAirports: Airport[] = [];
  seatClasses: SeatClass[] = [];
  selectedOriginAirport?: Airport;
  selectedDestinationAirport?: Airport;

  labels = {
    searchFlights: { en: 'Search Flights', es: 'Buscar Vuelos' },
    origin: { en: 'Origin', es: 'Origen' },
    destination: { en: 'Destination', es: 'Destino' },
    date: { en: 'Departure Date', es: 'Fecha de Salida' },
    seatClass: { en: 'Seat Class', es: 'Clase de Asiento' },
    search: { en: 'Search', es: 'Buscar' },
    results: { en: 'Available Flights', es: 'Vuelos Disponibles' },
    book: { en: 'Book Now', es: 'Reservar Ahora' },
    selectClass: { en: 'Select Class', es: 'Seleccionar Clase' },
    availableSeats: { en: 'Available Seats', es: 'Asientos Disponibles' },
    loginPrompt: { en: 'Please login to book flights', es: 'Por favor inicie sesión para reservar vuelos' },
    login: { en: 'Login', es: 'Iniciar Sesión' }
  };

  constructor(
    private flightService: FlightService,
    private airportService: AirportService,
    private seatClassService: SeatClassService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    this.loadSeatClasses();
    this.authService.getCurrentUser().subscribe(user => {
      this.user = user;
    });
  }

  loadSeatClasses() {
    this.seatClassService.getSeatClasses().subscribe(
      classes => this.seatClasses = classes
    );
  }

  searchOriginAirports() {
    if (this.originQuery.length >= 2) {
      this.airportService.searchAirports(this.originQuery).subscribe(
        airports => this.originAirports = airports
      );
    } else {
      this.originAirports = [];
    }
  }

  searchDestinationAirports() {
    if (this.destinationQuery.length >= 2) {
      this.airportService.searchAirports(this.destinationQuery).subscribe(
        airports => this.destinationAirports = airports
      );
    } else {
      this.destinationAirports = [];
    }
  }

  selectOriginAirport(airport: Airport) {
    this.selectedOriginAirport = airport;
    this.originQuery = airport.code + ' - ' + airport.name;
    this.originAirports = [];
  }

  selectDestinationAirport(airport: Airport) {
    this.selectedDestinationAirport = airport;
    this.destinationQuery = airport.code + ' - ' + airport.name;
    this.destinationAirports = [];
  }

  searchFlights() {
    if (!this.selectedOriginAirport || !this.selectedDestinationAirport || !this.date || !this.selectedSeatClassId) {
      return;
    }

    this.flightService.searchFlights(
      this.selectedOriginAirport.code,
      this.selectedDestinationAirport.code,
      this.date
    ).subscribe(
      flights => this.flights = flights
    );
  }

  calculatePrice(flight: Flight): number {
    const seatClass = this.seatClasses.find(sc => sc.id === this.selectedSeatClassId);
    if (!seatClass) {
      return flight.basePrice;
    }
    return flight.basePrice * seatClass.priceMultiplier;
  }

  bookFlight(flight: Flight) {
    if (!this.user) return;
    
    this.flightService.bookFlight(flight.id, this.user.id).subscribe(
      () => {
        // Update the flight in the list
        flight.availableSeats--;
      }
    );
  }

  navigateToLogin() {
    this.router.navigate(['/auth/login']);
  }
} 