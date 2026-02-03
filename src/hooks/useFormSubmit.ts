import { useState, useCallback } from 'react';
import { showToast } from '../utils/toast.util';
import { getErrorMessage, getValidationErrors } from '../utils/error.util';

interface FormConfig<T> {
  onSubmit: (data: T) => Promise<void>;
  onSuccess?: (data: T) => void;
  onError?: (error: unknown) => void;
}


export const useFormSubmit = <T,>(config: FormConfig<T>) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = useCallback(
    async (data: T) => {
      setIsSubmitting(true);
      try {
        await config.onSubmit(data);
        config.onSuccess?.(data);
      } catch (error: unknown) {
      
        const validationErrors = getValidationErrors(error);
        if (validationErrors.length > 0) {
          validationErrors.forEach((err) => {
            showToast.error(`${err.field}: ${err.message}`);
          });
        } else {
          showToast.error(getErrorMessage(error, 'Operation failed'));
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
