import { SupabaseErrorResponse } from '../../core/types/supabase.types';

export function handleSupabaseError(error: SupabaseErrorResponse): string {
  switch (error.code) {
    case '23505': // unique_violation
      return 'Ya existe un registro con estos datos';
    case '23503': // foreign_key_violation
      return 'No se puede realizar la operación debido a referencias existentes';
    case '42P01': // undefined_table
      return 'Error en la base de datos';
    default:
      return error.message || 'Ha ocurrido un error inesperado';
  }
}

export function isNetworkError(error: any): boolean {
  return !window.navigator.onLine || error.name === 'NetworkError';
}