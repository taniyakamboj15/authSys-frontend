// Toast Messages
export const TOAST_MESSAGES = {
  AUTH: {
    LOGIN_SUCCESS: 'Login successful!',
    WELCOME_BACK: 'Welcome back!',
    LOGOUT_SUCCESS: 'Logged out successfully',
    REGISTER_SUCCESS: 'Registration successful! Please check your email for verification code.',
    REGISTRATION_FAILED: 'Registration failed',
  },
  EMAIL: {
    VERIFICATION_SUCCESS: 'Email verified successfully!',
    CODE_RESENT: 'Verification code resent!',
    EMAIL_NOT_FOUND: 'Email not found. Please register again.',
    INVALID_OTP_LENGTH: 'Please enter a 6-digit code',
    RESEND_FAILED: 'Failed to resend code',
    VERIFICATION_FAILED: 'Verification failed',
  },
  PASSWORD: {
    RESET_OTP_SENT: 'Password reset OTP has been sent to your email',
    OTP_VERIFIED: 'OTP verified successfully',
    INVALID_OTP: 'Invalid or expired OTP',
    RESET_SUCCESS: 'Password reset successfully! Please login with your new password',
    RESET_FAILED: 'Failed to reset password',
    RESET_REQUEST_FAILED: 'Failed to send reset OTP',
    RESEND_FAILED: 'Failed to resend OTP',
  },
  ERROR: {
    GENERIC: 'An error occurred',
  },
} as const;

// Route paths
export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  REGISTER: '/register',
  PROFILE: '/profile',
  VERIFY_EMAIL: '/verify-email',
  FORGOT_PASSWORD: '/forgot-password',
  RESET_PASSWORD: '/reset-password',
} as const;

// UI Text
export const UI_TEXT = {
  LOGIN: {
    TITLE: 'Sign in to your account',
    NO_ACCOUNT: "Don't have an account?",
    SIGN_UP_LINK: 'Sign up',
    CONTINUE_WITH: 'Or continue with',
    GOOGLE_BUTTON: 'Sign in with Google',
    SUBMIT_BUTTON: 'Sign in',
    EMAIL_LABEL: 'Email address',
    PASSWORD_LABEL: 'Password',
  },
  REGISTER: {
    TITLE: 'Create your account',
    HAVE_ACCOUNT: 'Already have an account?',
    SIGN_IN_LINK: 'Sign in',
    SUBMIT_BUTTON: 'Create account',
    NAME_LABEL: 'Full Name',
    EMAIL_LABEL: 'Email address',
    PASSWORD_LABEL: 'Password',
    CONFIRM_PASSWORD_LABEL: 'Confirm Password',
  },
  VERIFY_EMAIL: {
    TITLE: 'Verify Your Email',
    DESCRIPTION: "We've sent a 6-digit verification code to",
    LABEL: 'Verification Code',
    PLACEHOLDER: 'Enter 6-digit code',
    SUBMIT_BUTTON: 'Verify Email',
    DIDNT_RECEIVE: "Didn't receive the code?",
    RESEND_IN: 'Resend in',
    RESEND_BUTTON: 'Resend Code',
    SENDING: 'Sending...',
    EXPIRY_NOTE: 'The code will expire in 5 minutes',
  },
  PROFILE: {
    TITLE: 'My Profile',
    ACCOUNT_DETAILS: 'Account Details',
    USER_ID_LABEL: 'User ID',
    VERIFICATION_LABEL: 'Verification',
    VERIFIED: 'Verified',
    UNVERIFIED: 'Unverified',
    SIGN_OUT: 'Sign out',
  },
  FORGOT_PASSWORD: {
    TITLE: 'Forgot Password?',
    DESCRIPTION: 'Enter your email address and we will send you a code to reset your password',
    EMAIL_LABEL: 'Email address',
    SUBMIT_BUTTON: 'Send Reset Code',
    BACK_TO_LOGIN: 'Back to Login',
  },
  RESET_PASSWORD: {
    TITLE: 'Reset Your Password',
    DESCRIPTION_OTP: 'Enter the 6-digit code sent to',
    DESCRIPTION_PASSWORD: 'Enter your new password',
    OTP_LABEL: 'Verification Code',
    OTP_PLACEHOLDER: 'Enter 6-digit code',
    NEW_PASSWORD_LABEL: 'New Password',
    CONFIRM_PASSWORD_LABEL: 'Confirm Password',
    VERIFY_BUTTON: 'Verify Code',
    RESET_BUTTON: 'Reset Password',
    DIDNT_RECEIVE: "Didn't receive the code?",
    RESEND_IN: 'Resend in',
    RESEND_BUTTON: 'Resend Code',
    SENDING: 'Sending...',
  },
} as const;

// API URLs
export const GOOGLE_AUTH_URL = import.meta.env.VITE_GOOGLE_AUTH_URL || 'http://localhost:5000/api/v1/auth/google';

// Timing
export const TIMING = {
  OTP_RESEND_COUNTDOWN: 60,
} as const;
