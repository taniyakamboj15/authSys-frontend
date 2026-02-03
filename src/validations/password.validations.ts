import * as yup from 'yup';

export const forgotPasswordSchema = yup.object().shape({
  email: yup
    .string()
    .email('Invalid email address')
    .required('Email is required'),
});

export type ForgotPasswordFormValues = yup.InferType<typeof forgotPasswordSchema>;

export const verifyOtpSchema = yup.object().shape({
  otp: yup
    .string()
    .matches(/^\d{6}$/, 'OTP must be 6 digits')
    .required('OTP is required'),
});

export type VerifyOtpFormValues = yup.InferType<typeof verifyOtpSchema>;

export const resetPasswordSchema = yup.object().shape({
  newPassword: yup
    .string()
    .min(6, 'Password must be at least 6 characters')
    .required('New password is required'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('newPassword')], 'Passwords must match')
    .required('Confirm password is required'),
});

export type ResetPasswordFormValues = yup.InferType<typeof resetPasswordSchema>;
