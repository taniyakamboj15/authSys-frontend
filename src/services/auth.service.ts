import { loginApi, registerApi, logoutApi, getProfileApi } from '../api/auth.api';
import { type User } from '../types/auth.types';

// Service layer for business logic transformation if needed
// Currently acts as a proxy but essential for scalability
export const authService = {
  login: async (credentials: any) => {
    const response = await loginApi(credentials);
    return response.data.user;
  },

  register: async (data: any) => {
    const response = await registerApi(data);
    return response.data.user;
  },

  logout: async () => {
    await logoutApi();
  },

  getProfile: async (): Promise<User> => {
    const response = await getProfileApi();
    return response.data; // Adjusted based on backend response structure ResponseUtil.success(res, user)
  },
};
