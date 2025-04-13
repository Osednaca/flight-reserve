import { Injectable } from '@angular/core';
import { Observable, from } from 'rxjs';
import { map } from 'rxjs/operators';
import { SupabaseService } from './supabase.service';
import { SeatClass } from '../models/seat-class.model';

@Injectable({
  providedIn: 'root'
})
export class SeatClassService {
  constructor(private supabase: SupabaseService) {}

  getSeatClasses(): Observable<SeatClass[]> {
    return from(
      this.supabase.client
        .from('clases_asiento')
        .select('*')
        .order('precio_extra')
    ).pipe(
      map(response => {
        if (response.error) throw response.error;
        return response.data;
      })
    );
  }
}