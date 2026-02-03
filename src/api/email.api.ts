import api from './axios';

/**
 * Email verification API calls
 */

interface EmailResponse {
  success: boolean;
  message: string;
}

export const sendVerificationOTP = async (email: string): Promise<EmailResponse> => {
  const response = await api.post<EmailResponse>('/email/send-verification', { email });
  return response.data;
};

export const verifyOTP = async (email: string, otp: string): Promise<EmailResponse> => {
  const response = await api.post<EmailResponse>('/email/verify-otp', { email, otp });
  return response.data;
};

export const resendOTP = async (email: string): Promise<EmailResponse> => {
  const response = await api.post<EmailResponse>('/email/resend-otp', { email });
  return response.data;
};
