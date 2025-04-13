export interface Flight {
  id: string;
  codigo_vuelo: string;
  origen: string;
  destino: string;
  fecha_salida: Date;
  fecha_llegada: Date;
  duracion: string;
  precio_base: number;
  capacidad_total: number;
  origen_details?: Airport;
  destino_details?: Airport;
}