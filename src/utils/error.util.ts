/**
 * API Error Response types
 */
export interface ValidationError {
  field: string;
  message: string;
}

export interface ApiErrorResponse {
  success: false;
  message: string;
  errors?: ValidationError[];
}

/**
 * Helper to check if error is ApiErrorResponse
 */
export const isApiError = (error: any): error is { response: { data: ApiErrorResponse } } => {
  return error?.response?.data && typeof error.response.data.message === 'string';
};

/**
 * Extract error message from API error
 */
export const  getErrorMessage = (error: any, defaultMessage = 'An error occurred'): string => {
  if (isApiError(error)) {
    return error.response.data.message;
  }
  if (error.message) {
    return error.message;
  }
  return defaultMessage;
};

/**
 * Extract validation errors from API error
 */
export const getValidationErrors = (error: any): ValidationError[] => {
  if (isApiError(error) && error.response.data.errors) {
    return error.response.data.errors;
  }
  return [];
};
