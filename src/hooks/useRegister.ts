import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '../app/hooks';
import { registerApi } from '../api/auth.api';
import { showToast } from '../utils/toast.util';
import { getValidationErrors, getErrorMessage } from '../utils/error.util';

interface RegisterData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

/**
 * Custom hook for register page logic
 */
export const useRegister = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAppSelector((state) => state.auth);

  // Redirect if already authenticated
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
    } catch (error: any) {
      // Handle validation errors
      const validationErrors = getValidationErrors(error);
      if (validationErrors.length > 0) {
        validationErrors.forEach((err) => {
          showToast.error(`${err.field}: ${err.message}`);
        });
      } else {
        showToast.error(getErrorMessage(error, 'Registration failed'));
      }
      throw error; // Re-throw for form to handle
    }
  };

  return {
    handleRegister,
  };
};
