export interface Flight {
  id: number;
  origin: string;
  destination: string;
  departureDate: Date;
  arrivalDate: Date;
  price: number;
  availableSeats: number;
}