import { loginApi, registerApi, logoutApi, getProfileApi } from '../api/auth.api';
import type { User, LoginCredentials, RegisterData } from '../types/auth.types';

export const authService = {
  /**
   * Login user with credentials
   */
  login: async (credentials: LoginCredentials): Promise<User> => {
    const response = await loginApi(credentials);
    return response.data.user;
  },

  /**
   * Register new user
   */
  register: async (data: RegisterData): Promise<User> => {
    const response = await registerApi(data);
    return response.data.user;
  },

  /**
   * Logout current user
   */
  logout: async (): Promise<void> => {
    await logoutApi();
  },

  /**
   * Get current user profile
   */
  getProfile: async (): Promise<User> => {
    const response = await getProfileApi();
    return response.data;
  },
};
