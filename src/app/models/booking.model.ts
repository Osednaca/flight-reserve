import { Flight } from './flight.model';
import { SeatClass } from './seat-class.model';
import { User } from './user.model';

export interface Booking {
  id: string;
  userId: string;
  flightId: string;
  seatClassId: string;
  seatNumber: string;
  status: BookingStatus;
  bookingDate: Date;
  amount: number;
  flight?: Flight;
  seatClass?: SeatClass;
  user?: User;
}

export type BookingStatus = 'pending' | 'confirmed' | 'cancelled';