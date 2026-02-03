import { useState, useCallback } from 'react';
import { showToast } from '../utils/toast.util';

interface FormConfig<T> {
  onSubmit: (data: T) => Promise<void>;
  onSuccess?: (data: T) => void;
  onError?: (error: any) => void;
}

/**
 * Custom hook for handling form submissions with loading state and error handling
 */
export const useFormSubmit = <T,>(config: FormConfig<T>) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = useCallback(
    async (data: T) => {
      setIsSubmitting(true);
      try {
        await config.onSubmit(data);
        config.onSuccess?.(data);
      } catch (error: any) {
        // Handle detailed validation errors
        const errors = error.response?.data?.errors;
        if (errors && Array.isArray(errors)) {
          errors.forEach((err: { field: string; message: string }) => {
            showToast.error(`${err.field}: ${err.message}`);
          });
        } else {
          const errorMessage = error.response?.data?.message || error.message || 'Operation failed';
          showToast.error(errorMessage);
        }
        config.onError?.(error);
      } finally {
        setIsSubmitting(false);
      }
    },
    [config]
  );

  return { isSubmitting, handleSubmit };
};
