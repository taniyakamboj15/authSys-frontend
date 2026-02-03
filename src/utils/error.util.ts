import type { ApiErrorResponse, ValidationError } from '../types/api.types';

/**
 * Helper to check if error is ApiErrorResponse
 */
export const isApiError = (error: unknown): error is { response: { data: ApiErrorResponse } } => {
  if (typeof error !== 'object' || error === null || !('response' in error)) {
    return false;
  }
  const err = error as { response: unknown };
  if (typeof err.response !== 'object' || err.response === null || !('data' in err.response)) {
    return false;
  }
  const response = err.response as { data: unknown };
  if (typeof response.data !== 'object' || response.data === null || !('message' in response.data)) {
    return false;
  }
  const data = response.data as { message: unknown };
  return typeof data.message === 'string';
};

/**
 * Extract error message from API error
 */
export const getErrorMessage = (error: unknown, defaultMessage = 'An error occurred'): string => {
  if (isApiError(error)) {
    return error.response.data.message;
  }
  if (error instanceof Error) {
    return error.message;
  }
  if (typeof error === 'object' && error !== null && 'message' in error) {
    return String((error as { message: unknown }).message);
  }
  return defaultMessage;
};

/**
 * Extract validation errors from API error
 */
export const getValidationErrors = (error: unknown): ValidationError[] => {
  if (isApiError(error) && error.response.data.errors) {
    return error.response.data.errors;
  }
  return [];
};
