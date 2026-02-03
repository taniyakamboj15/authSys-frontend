import { sendVerificationOTP, verifyOTP, resendOTP } from '../api/email.api';

export const emailService = {
  
  sendVerification: async (email: string): Promise<void> => {
    await sendVerificationOTP(email);
  },

 
  verify: async (email: string, otp: string): Promise<void> => {
    await verifyOTP(email, otp);
  },

  resend: async (email: string): Promise<void> => {
    await resendOTP(email);
  },
};
