import { AbstractControl, ValidationErrors } from '@angular/forms';
import { VALIDATION_PATTERNS } from '../../core/constants/validation.constants';

export function createPasswordValidator(minLength: number = 8): (control: AbstractControl) => ValidationErrors | null {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;
    
    if (!value) return null;

    const hasUpperCase = /[A-Z]/.test(value);
    const hasLowerCase = /[a-z]/.test(value);
    const hasNumber = /\d/.test(value);
    const hasMinLength = value.length >= minLength;

    const valid = hasUpperCase && hasLowerCase && hasNumber && hasMinLength;
    
    return !valid ? { 'password': true } : null;
  };
}

export function validateEmail(control: AbstractControl): ValidationErrors | null {
  return VALIDATION_PATTERNS.EMAIL.test(control.value) ? null : { 'email': true };
}

export function validatePhone(control: AbstractControl): ValidationErrors | null {
  if (!control.value) return null;
  return VALIDATION_PATTERNS.PHONE.test(control.value) ? null : { 'phone': true };
}