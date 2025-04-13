import { Injectable } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { Observable, from } from 'rxjs';
import { map } from 'rxjs/operators';
import { Airport } from '../models/airport.model';

@Injectable({
  providedIn: 'root'
})
export class AirportService {
  private supabase: SupabaseClient;

  constructor() {
    this.supabase = createClient('YOUR_SUPABASE_URL', 'YOUR_SUPABASE_KEY');
  }

  getAirports(): Observable<Airport[]> {
    return from(
      this.supabase
        .from('airports')
        .select('*')
        .order('name')
    ).pipe(
      map(response => {
        if (response.error) throw response.error;
        return response.data as Airport[];
      })
    );
  }

  searchAirports(query: string): Observable<Airport[]> {
    return from(
      this.supabase
        .from('airports')
        .select('*')
        .or(\`name.ilike.%${query}%,code.ilike.%${query}%,city.ilike.%${query}%\`)
        .limit(10)
    ).pipe(
      map(response => {
        if (response.error) throw response.error;
        return response.data as Airport[];
      })
    );
  }
}