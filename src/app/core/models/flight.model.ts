import { Airport } from "./airport.model";

export interface Flight {
  id: string;
  flightCode: string;
  origin: string;
  destination: string;
  departureDate: Date;
  arrivalDate: Date;
  duration: string;
  basePrice: number;
  totalCapacity: number;
  availableSeats: number;
  originDetails?: Airport;
  destinationDetails?: Airport;
}