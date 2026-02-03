import apiClient from './axios';

export const forgotPasswordApi = async (email: string) => {
  const response = await apiClient.post('/auth/forgot-password', { email });
  return response.data;
};

export const verifyResetOTPApi = async (email: string, otp: string) => {
  const response = await apiClient.post('/auth/verify-reset-otp', { email, otp });
  return response.data;
};

export const resetPasswordApi = async (email: string, newPassword: string) => {
  const response = await apiClient.post('/auth/reset-password', { email, newPassword });
  return response.data;
};
