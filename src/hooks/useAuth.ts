import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { useNavigate } from 'react-router-dom';
import { checkAuth, loginUser, logoutUser } from '../auth/auth.slice';
import { showToast } from '../utils/toast.util';

/**
 * Custom hook for authentication logic
 * Extracts common auth patterns used across components
 */
export const useAuth = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { user, isAuthenticated, isLoading, error } = useAppSelector((state) => state.auth);

  useEffect(() => {
    // Check authentication on mount
    dispatch(checkAuth());
  }, [dispatch]);

  const login = async (email: string, password: string) => {
    const resultAction = await dispatch(loginUser({ email, password }));
    if (loginUser.fulfilled.match(resultAction)) {
      showToast.success('Login successful!');
      navigate('/profile');
      return { success: true };
    }
    return { success: false, error: resultAction.payload };
  };

  const logout = async () => {
    await dispatch(logoutUser());
    showToast.success('Logged out successfully');
    navigate('/login');
  };

  return {
    user,
    isAuthenticated,
    isLoading,
    error,
    login,
    logout,
  };
};
