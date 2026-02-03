import api from './axios';

export const sendVerificationOTP = async (email: string) => {
  const response = await api.post('/email/send-verification', { email });
  return response.data;
};

export const verifyOTP = async (email: string, otp: string) => {
  const response = await api.post('/email/verify-otp', { email, otp });
  return response.data;
};

export const resendOTP = async (email: string) => {
  const response = await api.post('/email/resend-otp', { email });
  return response.data;
};
