import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Flight } from '../models/flight.model';

@Injectable({
  providedIn: 'root',
})
export class FlightService {
  private apiUrl = 'http://localhost:8000/api'; // URL de la API Laravel

  constructor(private http: HttpClient) {}

  searchFlights(
    origin: string,
    destination: string,
    date: string
  ): Observable<Flight[]> {
    return this.http.get<Flight[]>(
      `${this.apiUrl}/flights?origin=${origin}&destination=${destination}&date=${date}`
    );
  }

  bookFlight(flightId: number, passengerName: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/bookings`, {
      flightId,
      passengerName,
    });
  }
}
