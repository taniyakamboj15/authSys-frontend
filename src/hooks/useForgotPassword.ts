import { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { forgotPasswordApi } from '../api';
import { showToast } from '../utils/toast.util';
import { getErrorMessage } from '../utils/error.util';
import { ROUTES, TOAST_MESSAGES } from '../constants';

export const useForgotPassword = () => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleForgotPassword = useCallback(async (email: string) => {
    setIsSubmitting(true);
    try {
      await forgotPasswordApi(email);
      showToast.success(TOAST_MESSAGES.PASSWORD.RESET_OTP_SENT);
      navigate(ROUTES.RESET_PASSWORD, { state: { email } });
    } catch (error: any) {
      showToast.error(getErrorMessage(error, TOAST_MESSAGES.PASSWORD.RESET_REQUEST_FAILED));
    } finally {
      setIsSubmitting(false);
    }
  }, [navigate]);

  return {
    isSubmitting,
    handleForgotPassword,
  };
};
