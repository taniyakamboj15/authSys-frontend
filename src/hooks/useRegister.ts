import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '../app/hooks';
import { registerApi } from '../api/auth.api';
import { showToast } from '../utils/toast.util';
import { getValidationErrors, getErrorMessage } from '../utils/error.util';
import type { RegisterData } from '../types/auth.types';

// Extended type for form submission if needed, or if API expects different.
// Actually API RegisterData doesn't have confirmPassword usually, but let's check validation.
// The hook uses RegisterData for `handleRegister`. If `registerApi` takes `RegisterData`, it should match.
// Let's assume RegisterData in types matches what API needs.
// But wait, the form has confirmPassword. filtering it out?
// registerApi(data) is called. data probably has confirmPassword.
// If registerApi expects strict RegisterData, we might need Omit.
// Let's just import RegisterData for now and maybe Extend it if the form passes more.
// For now, replacing local interface.


export const useRegister = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAppSelector((state) => state.auth);


  useEffect(() => {
    if (isAuthenticated) {
      navigate('/profile');
    }
  }, [isAuthenticated, navigate]);

  const handleRegister = async (data: RegisterData) => {
    try {
      await registerApi(data);
      showToast.success('Registration successful! Please check your email for verification code.');
      navigate('/verify-email', { state: { email: data.email } });
    } catch (error: unknown) {
    
      const validationErrors = getValidationErrors(error);
      if (validationErrors.length > 0) {
        validationErrors.forEach((err) => {
          showToast.error(`${err.field}: ${err.message}`);
        });
      } else {
        showToast.error(getErrorMessage(error, 'Registration failed'));
      }
      throw error; 
    }
  };

  return {
    handleRegister,
  };
};
