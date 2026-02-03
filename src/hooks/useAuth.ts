import { useCallback } from 'react';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { useNavigate } from 'react-router-dom';
import { loginUser, logoutUser } from '../auth/auth.slice';
import { showToast } from '../utils/toast.util';
import { ROUTES, TOAST_MESSAGES } from '../constants';

export const useAuth = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { user, isAuthenticated, isLoading, error } = useAppSelector((state) => state.auth);



  const login = useCallback(async (email: string, password: string) => {
    const resultAction = await dispatch(loginUser({ email, password }));
    if (loginUser.fulfilled.match(resultAction)) {
      showToast.success(TOAST_MESSAGES.AUTH.LOGIN_SUCCESS);
      navigate(ROUTES.PROFILE);
      return { success: true };
    }
    return { success: false, error: resultAction.payload };
  }, [dispatch, navigate]);

  const logout = useCallback(async () => {
    await dispatch(logoutUser());
    showToast.success(TOAST_MESSAGES.AUTH.LOGOUT_SUCCESS);
    navigate(ROUTES.LOGIN);
  }, [dispatch, navigate]);

  return {
    user,
    isAuthenticated,
    isLoading,
    error,
    login,
    logout,
  };
};
