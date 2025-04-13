import { Injectable } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { Observable, from } from 'rxjs';
import { map } from 'rxjs/operators';
import { SeatClass } from '../models/seat-class.model';

@Injectable({
  providedIn: 'root'
})
export class SeatClassService {
  private supabase: SupabaseClient;

  constructor() {
    this.supabase = createClient('YOUR_SUPABASE_URL', 'YOUR_SUPABASE_KEY');
  }

  getSeatClasses(): Observable<SeatClass[]> {
    return from(
      this.supabase
        .from('seat_classes')
        .select('*')
        .order('price_multiplier')
    ).pipe(
      map(response => {
        if (response.error) throw response.error;
        return response.data as SeatClass[];
      })
    );
  }
}