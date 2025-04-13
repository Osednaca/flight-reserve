import { Flight } from './flight.interface';
import { SeatClass } from './seat-class.interface';

export interface Booking {
  id: string;
  usuario_id: string;
  vuelo_id: string;
  clase_asiento_id: string;
  numero_asiento: string;
  estado: BookingStatus;
  fecha_reserva: Date;
  cantidad: number;
  flight?: Flight;
  seat_class?: SeatClass;
}

export type BookingStatus = 'pendiente' | 'confirmado' | 'cancelado';