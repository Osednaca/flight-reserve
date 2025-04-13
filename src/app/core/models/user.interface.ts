export interface User {
  id: string;
  nombre: string;
  correo_electronico: string;
  telefono?: string;
  fecha_registro: Date;
}