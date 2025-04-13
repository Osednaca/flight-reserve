import { AbstractControl, ValidationErrors } from '@angular/forms';

export const EMAIL_PATTERN = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
export const PHONE_PATTERN = /^\+?[1-9]\d{1,14}$/;

export function validateEmail(control: AbstractControl): ValidationErrors | null {
  return EMAIL_PATTERN.test(control.value) ? null : { email: true };
}

export function validatePhone(control: AbstractControl): ValidationErrors | null {
  if (!control.value) return null;
  return PHONE_PATTERN.test(control.value) ? null : { phone: true };
}

export function validatePassword(minLength = 8): (control: AbstractControl) => ValidationErrors | null {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;
    if (!value) return null;

    const hasUpperCase = /[A-Z]/.test(value);
    const hasLowerCase = /[a-z]/.test(value);
    const hasNumber = /\d/.test(value);
    const hasMinLength = value.length >= minLength;

    if (hasUpperCase && hasLowerCase && hasNumber && hasMinLength) {
      return null;
    }

    return { password: true };
  };
}