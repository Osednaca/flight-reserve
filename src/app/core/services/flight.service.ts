import { Injectable } from '@angular/core';
import { Observable, from } from 'rxjs';
import { map } from 'rxjs/operators';
import { SupabaseService } from './supabase.service';
import { Flight } from '../models/flight.model';

@Injectable({
  providedIn: 'root'
})
export class FlightService {
  constructor(private supabase: SupabaseService) {}

  searchFlights(originId: string, destinationId: string, date: string): Observable<Flight[]> {
    return from(
      this.supabase.client
        .from('vuelos')
        .select(`
          *,
          origen_details:aeropuertos!origen(*),
          destino_details:aeropuertos!destino(*)
        `)
        .eq('origen', originId)
        .eq('destino', destinationId)
        .gte('fecha_salida', `${date}T00:00:00`)
        .lte('fecha_salida', `${date}T23:59:59`)
    ).pipe(
      map(response => {
        if (response.error) throw response.error;
        return response.data;
      })
    );
  }

  getAvailableSeats(flightId: string): Observable<number> {
    return from(
      this.supabase.client
        .rpc('get_available_seats', { flight_id: flightId })
    ).pipe(
      map(response => {
        if (response.error) throw response.error;
        return response.data;
      })
    );
  }
}