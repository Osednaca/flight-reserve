import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FlightService } from '../../services/flight.service';
import { Flight } from '../../models/flight.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-flight-search',
  standalone: true,
  imports: [FormsModule, CommonModule],
  template: `
    <div class="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6">
      <h2 class="text-2xl font-semibold mb-4 dark:text-white">{{ labels.searchFlights[language] }}</h2>
      <form (ngSubmit)="searchFlights()" class="space-y-4">
        <div class="flex space-x-4">
          <input [(ngModel)]="origin" name="origin" [placeholder]="labels.origin[language]" required
                 class="flex-1 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white">
          <input [(ngModel)]="destination" name="destination" [placeholder]="labels.destination[language]" required
                 class="flex-1 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white">
          <input [(ngModel)]="date" name="date" type="date" required
                 class="flex-1 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white">
        </div>
        <button type="submit" class="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-300">
          {{ labels.search[language] }}
        </button>
      </form>
    </div>

    <div *ngIf="flights.length > 0" class="mt-8">
      <h3 class="text-xl font-semibold mb-4 dark:text-white">{{ labels.results[language] }}:</h3>
      <div class="space-y-4">
        <div *ngFor="let flight of flights" class="bg-white dark:bg-gray-800 shadow-md rounded-lg p-4 flex justify-between items-center">
          <div>
            <p class="font-semibold dark:text-white">{{ flight.origin }} - {{ flight.destination }}</p>
            <p class="text-sm text-gray-600 dark:text-gray-400">{{ flight.departureDate | date:'medium' }}</p>
          </div>
          <div class="text-right">
            <p class="text-lg font-bold text-blue-600 dark:text-blue-400">{{ flight.price | currency }}</p>
            <button (click)="bookFlight(flight.id)" class="mt-2 bg-green-500 text-white py-1 px-3 rounded-md hover:bg-green-600 transition duration-300">
              {{ labels.book[language] }}
            </button>
          </div>
        </div>
      </div>
    </div>
  `
})
export class FlightSearchComponent {
  @Input() language: 'en' | 'es' = 'es';
  
  origin = '';
  destination = '';
  date = '';
  flights: Flight[] = [];

  labels = {
    searchFlights: { en: 'Search Flights', es: 'Buscar Vuelos' },
    origin: { en: 'Origin', es: 'Origen' },
    destination: { en: 'Destination', es: 'Destino' },
    search: { en: 'Search', es: 'Buscar' },
    results: { en: 'Results', es: 'Resultados' },
    book: { en: 'Book', es: 'Reservar' }
  };

  constructor(private flightService: FlightService) {}

  searchFlights() {
    this.flightService.searchFlights(this.origin, this.destination, this.date)
      .subscribe(flights => this.flights = flights);
  }

  bookFlight(flightId: number) {
    const passengerName = prompt(this.language === 'en' ? 'Enter your name:' : 'Ingrese su nombre:');
    if (passengerName) {
      this.flightService.bookFlight(flightId, passengerName)
        .subscribe(
          () => alert(this.language === 'en' ? 'Booking successful' : 'Reserva realizada con éxito'),
          error => alert(this.language === 'en' ? 'Error making the booking' : 'Error al realizar la reserva')
        );
    }
  }
}