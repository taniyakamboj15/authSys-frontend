import { useState, useCallback, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { verifyResetOTPApi, resetPasswordApi } from '../api';
import { showToast } from '../utils/toast.util';
import { getErrorMessage } from '../utils/error.util';
import { ROUTES, TOAST_MESSAGES, TIMING } from '../constants';
import { useCountdown } from './useCountdown';

export const useResetPassword = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email;
  
  const [isVerifying, setIsVerifying] = useState(false);
  const [isResetting, setIsResetting] = useState(false);
  const [isOtpVerified, setIsOtpVerified] = useState(false);

  const { countdown, start: startCountdown } = useCountdown({ initialSeconds: TIMING.OTP_RESEND_COUNTDOWN });

  useEffect(() => {
    if (!email) {
      showToast.error(TOAST_MESSAGES.EMAIL.EMAIL_NOT_FOUND);
      navigate(ROUTES.FORGOT_PASSWORD);
    } else {
      startCountdown();
    }
  }, [email, navigate, startCountdown]);

  const handleVerifyOTP = useCallback(async (otpValue: string) => {
    if (otpValue.length !== 6) {
      showToast.error(TOAST_MESSAGES.EMAIL.INVALID_OTP_LENGTH);
      return;
    }

    setIsVerifying(true);
    try {
      await verifyResetOTPApi(email, otpValue);
      setIsOtpVerified(true);
      showToast.success(TOAST_MESSAGES.PASSWORD.OTP_VERIFIED);
    } catch (error: any) {
      showToast.error(getErrorMessage(error, TOAST_MESSAGES.PASSWORD.INVALID_OTP));
    } finally {
      setIsVerifying(false);
    }
  }, [email]);

  const handleResetPassword = useCallback(async (newPassword: string) => {
    setIsResetting(true);
    try {
      await resetPasswordApi(email, newPassword);
      showToast.success(TOAST_MESSAGES.PASSWORD.RESET_SUCCESS);
      navigate(ROUTES.LOGIN);
    } catch (error: any) {
      showToast.error(getErrorMessage(error, TOAST_MESSAGES.PASSWORD.RESET_FAILED));
    } finally {
      setIsResetting(false);
    }
  }, [email, navigate]);

  const handleResendOTP = useCallback(async () => {
    const { forgotPasswordApi } = await import('../api');
    try {
      await forgotPasswordApi(email);
      showToast.success(TOAST_MESSAGES.PASSWORD.RESET_OTP_SENT);
      startCountdown();
    } catch (error: any) {
      showToast.error(getErrorMessage(error, TOAST_MESSAGES.PASSWORD.RESEND_FAILED));
    }
  }, [email, startCountdown]);

  return {
    email,
    isVerifying,
    isResetting,
    isOtpVerified,
    countdown,
    handleVerifyOTP,
    handleResetPassword,
    handleResendOTP,
  };
};
