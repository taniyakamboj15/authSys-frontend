import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { loginUser, clearError } from '../auth/auth.slice';
import { showToast } from '../utils/toast.util';

/**
 * Custom hook for login page logic
 */
export const useLogin = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { error, isAuthenticated } = useAppSelector((state) => state.auth);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const previousErrorRef = useRef<string | null>(null);

  // Clear error on mount
  useEffect(() => {
    dispatch(clearError());
  }, [dispatch]);

  // Redirect if authenticated
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/profile');
    }
  }, [isAuthenticated, navigate]);

  // Show only new errors
  useEffect(() => {
    if (error && error !== previousErrorRef.current) {
      showToast.error(error);
      previousErrorRef.current = error;
    }
  }, [error]);

  const handleLogin = async (data: { email: string; password: string }) => {
    setIsSubmitting(true);
    const resultAction = await dispatch(loginUser(data));
    if (loginUser.fulfilled.match(resultAction)) {
      showToast.success('Welcome back!');
    }
    setIsSubmitting(false);
  };

  const handleGoogleLogin = () => {
    window.location.href = 'http://localhost:5000/api/v1/auth/google';
  };

  return {
    isSubmitting,
    handleLogin,
    handleGoogleLogin,
  };
};
