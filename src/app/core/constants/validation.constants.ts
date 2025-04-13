export const VALIDATION_PATTERNS = {
  EMAIL: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
  PHONE: /^\+?[1-9]\d{1,14}$/,
  FLIGHT_CODE: /^[A-Z]{2}\d{3,4}$/
};

export const VALIDATION_MESSAGES = {
  REQUIRED: 'Este campo es obligatorio',
  EMAIL: 'Ingrese un correo electrónico válido',
  PHONE: 'Ingrese un número de teléfono válido',
  PASSWORD: {
    MIN_LENGTH: 'La contraseña debe tener al menos 8 caracteres',
    PATTERN: 'La contraseña debe contener al menos una letra mayúscula, una minúscula y un número'
  }
};