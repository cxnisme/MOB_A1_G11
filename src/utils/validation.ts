// All form rules live here. Member 3 owns this file.
import { Draft } from '../types';

// Stall code: MSZ, a dash, then exactly three digits. Example: MSZ-104
export const STALL_CODE_PATTERN = /^MSZ-\d{3}$/;

// Rwanda mobile (fictional numbers only): +250 7XX XXX XXX or 07X XXX XXXX, where the digit after 7 is 2, 3, 8 or 9.
export const PHONE_PATTERN = /^(\+250|0)7[2389]\d{7}$/;

export const ALIAS_PATTERN = /^[A-Za-z0-9 ]{3,30}$/;

export type FieldName = 'alias' | 'stallCode' | 'category' | 'phone' | 'risk' | 'consent' | 'image';
export type Errors = Partial<Record<FieldName, string>>;

// Removes spaces and dashes so "+250 788 000 123" and "+250-788-000-123" are both read as "+250788000123".
export function cleanPhone(value: string): string {
  return value.replace(/[\s-]/g, '');
}

export function validateDraft(draft: Draft): Errors {
  const errors: Errors = {};

  const alias = draft.alias.trim();
  if (alias === '') {
    errors.alias = 'Enter a vendor alias';
  } else if (!ALIAS_PATTERN.test(alias)) {
    errors.alias = 'Use 3 to 30 letters or numbers';
  }

  const stall = draft.stallCode.trim();
  if (stall === '') {
    errors.stallCode = 'Enter a stall code';
  } else if (!STALL_CODE_PATTERN.test(stall)) {
    errors.stallCode = 'Use the format MSZ-000';
  }

  if (draft.category === null) {
    errors.category = 'Select a category';
  }

  const phone = cleanPhone(draft.phone);
  if (phone === '') {
    errors.phone = 'Enter a contact number';
  } else if (!PHONE_PATTERN.test(phone)) {
    errors.phone = 'Use +250 7XX XXX XXX';
  }

  if (draft.risk === null) {
    errors.risk = 'Select a risk level';
  }

  if (!draft.consent) {
    errors.consent = 'Consent is required';
  }

  if (draft.imageUri === null) {
    errors.image = 'Add an evidence photo';
  }

  return errors;
}

export function isValid(errors: Errors): boolean {
  return Object.keys(errors).length === 0;
}
