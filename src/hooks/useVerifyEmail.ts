import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { verifyOTP, resendOTP } from '../api/email.api';
import { showToast } from '../utils/toast.util';
import { useCountdown } from './useCountdown';
import { ROUTES, TOAST_MESSAGES, TIMING } from '../constants';

export const useVerifyEmail = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [email, setEmail] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);
  const [isResending, setIsResending] = useState(false);

  const { countdown, start: startCountdown } = useCountdown({
    initialSeconds: TIMING.OTP_RESEND_COUNTDOWN,
  });

  useEffect(() => {
    const stateEmail = location.state?.email;
    if (!stateEmail) {
      showToast.error(TOAST_MESSAGES.EMAIL.EMAIL_NOT_FOUND);
      navigate(ROUTES.REGISTER);
      return;
    }
    setEmail(stateEmail);
  }, [location, navigate]);

  const handleVerify = async (otp: string) => {
    if (otp.length !== 6) {
      showToast.error(TOAST_MESSAGES.EMAIL.INVALID_OTP_LENGTH);
      return;
    }

    setIsVerifying(true);
    try {
      await verifyOTP(email, otp);
      showToast.success(TOAST_MESSAGES.EMAIL.VERIFICATION_SUCCESS);
      navigate(ROUTES.LOGIN);
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || TOAST_MESSAGES.EMAIL.VERIFICATION_FAILED;
      showToast.error(errorMessage);
    } finally {
      setIsVerifying(false);
    }
  };

  const handleResend = async () => {
    if (countdown > 0) return;

    setIsResending(true);
    try {
      await resendOTP(email);
      showToast.success(TOAST_MESSAGES.EMAIL.CODE_RESENT);
      startCountdown();
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || TOAST_MESSAGES.EMAIL.RESEND_FAILED;
      showToast.error(errorMessage);
    } finally {
      setIsResending(false);
    }
  };

  return {
    email,
    isVerifying,
    isResending,
    countdown,
    handleVerify,
    handleResend,
  };
};
