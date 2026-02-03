import * as yup from 'yup';

/**
 * Login validation schema
 */
export const loginSchema = yup.object().shape({
  email: yup
    .string()
    .email('Invalid email address')
    .required('Email is required'),
  password: yup
    .string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required'),
});

export type LoginFormValues = yup.InferType<typeof loginSchema>;

/**
 * Register validation schema
 */
export const registerSchema = yup.object().shape({
  name: yup
    .string()
    .min(2, 'Name must be at least 2 characters')
    .required('Name is required'),
  email: yup
    .string()
    .email('Invalid email address')
    .required('Email is required'),
  password: yup
    .string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password')], "Passwords don't match")
    .required('Confirm Password is required'),
});

export type RegisterFormValues = yup.InferType<typeof registerSchema>;

/**
 * Verify Email validation schema
 */
export const verifyEmailSchema = yup.object().shape({
  otp: yup
    .string()
    .matches(/^\d{6}$/, 'OTP must be 6 digits')
    .required('OTP is required'),
});

export type VerifyEmailFormValues = yup.InferType<typeof verifyEmailSchema>;
