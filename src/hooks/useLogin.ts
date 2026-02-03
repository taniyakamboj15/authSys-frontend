import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { loginUser, clearError } from '../auth/auth.slice';
import { showToast } from '../utils/toast.util';


import type { LoginCredentials } from '../types/auth.types';

export const useLogin = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { error, isAuthenticated } = useAppSelector((state) => state.auth);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const previousErrorRef = useRef<string | null>(null);

  
  useEffect(() => {
    dispatch(clearError());
  }, [dispatch]);


  useEffect(() => {
    if (isAuthenticated) {
      navigate('/profile');
    }
  }, [isAuthenticated, navigate]);


  useEffect(() => {
    if (error && error !== previousErrorRef.current) {
      showToast.error(error);
      previousErrorRef.current = error;
    }
  }, [error]);

  const handleLogin = async (data: LoginCredentials) => {
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
