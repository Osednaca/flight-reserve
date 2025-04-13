import { Injectable } from '@angular/core';
import { Observable, from, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { SupabaseService } from './supabase.service';
import { Booking } from '../models/booking.model';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class BookingService {
  constructor(private supabase: SupabaseService, private authService: AuthService) {}

  createBooking(booking: Partial<Booking>): Observable<Booking> {
    const currentUser = this.authService.getCurrentUser();
    if (!currentUser) {
      return throwError(() => new Error('User is not authenticated'));
    }

    return from(
      this.supabase.client
        .from('reservas')
        .insert(booking)
        .select()
        .single()
    ).pipe(
      map(response => {
        if (response.error) throw response.error;
        return response.data;
      }),
      catchError((error) => {
        console.error('Error creating booking:', error);
        return throwError(() => error);
      })
    );
  }

  getUserBookings(userId: string): Observable<Booking[]> {
    return from(
      this.supabase.client
        .from('reservas')
        .select(`
          *,
          flight:vuelos(*),
          seat_class:clases_asiento(*)
        `)
        .eq('usuario_id', userId)
        .order('fecha_reserva', { ascending: false })
    ).pipe(
      map(response => {
        if (response.error) throw response.error;
        return response.data;
      })
    );
  }

  updateBookingStatus(bookingId: string, status: string): Observable<void> {
    return from(
      this.supabase.client
        .from('reservas')
        .update({ estado: status })
        .eq('id', bookingId)
    ).pipe(
      map(response => {
        if (response.error) throw response.error;
      })
    );
  }
}