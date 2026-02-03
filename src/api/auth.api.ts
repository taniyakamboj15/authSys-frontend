import api from './axios';
import { API_ENDPOINTS } from '../constants/api.constants';
import type { LoginResponse, User } from '../types/auth.types';

// Raw API calls
export const loginApi = async (credentials: any) => {
  const response = await api.post<LoginResponse>(API_ENDPOINTS.AUTH.LOGIN, credentials);
  return response.data;
};

export const registerApi = async (data: any) => {
  const response = await api.post<LoginResponse>(API_ENDPOINTS.AUTH.REGISTER, data);
  return response.data;
};

export const logoutApi = async () => {
  const response = await api.post(API_ENDPOINTS.AUTH.LOGOUT);
  return response.data;
};

export const getProfileApi = async () => {
  const response = await api.get<{ success: boolean; data: User }>(API_ENDPOINTS.AUTH.PROFILE);
  return response.data;
};
