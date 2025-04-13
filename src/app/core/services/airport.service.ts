import { Injectable } from '@angular/core';
import { Observable, from } from 'rxjs';
import { map } from 'rxjs/operators';
import { SupabaseService } from './supabase.service';
import { Airport } from '../models';

@Injectable({
  providedIn: 'root'
})
export class AirportService {
  constructor(private supabase: SupabaseService) {}

  getAirports(): Observable<Airport[]> {
    return from(
      this.supabase.client
        .from('aeropuertos')
        .select('*')
        .order('nombre')
    ).pipe(
      map(response => {
        if (response.error) throw response.error;
        return response.data;
      })
    );
  }

  searchAirports(query: string): Observable<Airport[]> {
    return from(
      this.supabase.client
        .from('aeropuertos')
        .select('*')
        .or(`nombre.ilike.%${query}%,codigo.ilike.%${query}%,ciudad.ilike.%${query}%`)
        .limit(10)
    ).pipe(
      map(response => {
        if (response.error) throw response.error;
        return response.data;
      })
    );
  }
}