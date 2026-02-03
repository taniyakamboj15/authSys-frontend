import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { verifyOTP, resendOTP } from '../api/email.api';
import { showToast } from '../utils/toast.util';
import { useCountdown } from './useCountdown';

/**
 * Custom hook for email verification page logic
 */
export const useVerifyEmail = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [otp, setOtp] = useState('');
  const [email, setEmail] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);
  const [isResending, setIsResending] = useState(false);

  const { countdown, start: startCountdown } = useCountdown({
    initialSeconds: 60,
  });

  // Get email from route state
  useEffect(() => {
    const stateEmail = location.state?.email;
    if (!stateEmail) {
      showToast.error('Email not found. Please register again.');
      navigate('/register');
      return;
    }
    setEmail(stateEmail);
  }, [location, navigate]);

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();

    if (otp.length !== 6) {
      showToast.error('Please enter a 6-digit code');
      return;
    }

    setIsVerifying(true);
    try {
      await verifyOTP(email, otp);
      showToast.success('Email verified successfully!');
      navigate('/login');
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || 'Verification failed';
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
      showToast.success('Verification code resent!');
      startCountdown();
      setOtp('');
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || 'Failed to resend code';
      showToast.error(errorMessage);
    } finally {
      setIsResending(false);
    }
  };

  return {
    otp,
    setOtp,
    email,
    isVerifying,
    isResending,
    countdown,
    handleVerify,
    handleResend,
  };
};
