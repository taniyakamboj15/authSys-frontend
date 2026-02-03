import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { useResetPassword } from '../hooks/useResetPassword';
import { 
  verifyOtpSchema, 
  resetPasswordSchema, 
  type VerifyOtpFormValues,
  type ResetPasswordFormValues 
} from '../validations';
import { UI_TEXT } from '../constants';

const VerificationStatusMap = {
  UNVERIFIED: 'unverified',
  VERIFIED: 'verified',
};

const ResetPassword = () => {
  const {
    email,
    isVerifying,
    isResetting,
    isOtpVerified,
    countdown,
    handleVerifyOTP,
    handleResetPassword,
    handleResendOTP,
  } = useResetPassword();

  // Form 1: OTP Verification - Uncontrolled
  const { 
    register: registerOtp,
    handleSubmit: handleOtpSubmit, 
    formState: { errors: otpErrors } 
  } = useForm<VerifyOtpFormValues>({
    resolver: yupResolver(verifyOtpSchema),
  });

  // Form 2: Password Reset - Uncontrolled
  const { 
    register: registerPassword, 
    handleSubmit: handlePasswordSubmit, 
    formState: { errors: passwordErrors } 
  } = useForm<ResetPasswordFormValues>({
    resolver: yupResolver(resetPasswordSchema),
  });

  const onOtpSubmit = async (data: VerifyOtpFormValues) => {
    await handleVerifyOTP(data.otp);
  };

  const onPasswordSubmit = async (data: ResetPasswordFormValues) => {
    await handleResetPassword(data.newPassword);
  };

  const StepsValues = {
    [VerificationStatusMap.UNVERIFIED]: (
      <form onSubmit={handleOtpSubmit(onOtpSubmit)} className="mt-8 space-y-6">
        <Input
          label={UI_TEXT.RESET_PASSWORD.OTP_LABEL}
          type="text"
          placeholder={UI_TEXT.RESET_PASSWORD.OTP_PLACEHOLDER}
          maxLength={6}
          error={otpErrors.otp?.message}
          className="text-center text-2xl tracking-widest font-mono"
          autoComplete="one-time-code"
          {...registerOtp('otp')}
        />

        <div className="flex flex-col space-y-3">
          <Button type="submit" isLoading={isVerifying} className="w-full">
            {UI_TEXT.RESET_PASSWORD.VERIFY_BUTTON}
          </Button>

          <div className="text-center">
            <p className="text-sm text-gray-600">
              {UI_TEXT.RESET_PASSWORD.DIDNT_RECEIVE}{' '}
              {countdown > 0 ? (
                <span className="text-gray-500">
                  {UI_TEXT.RESET_PASSWORD.RESEND_IN} {countdown}s
                </span>
              ) : (
                <button
                  type="button"
                  onClick={handleResendOTP}
                  className="font-medium text-blue-600 hover:text-blue-500"
                >
                  {UI_TEXT.RESET_PASSWORD.RESEND_BUTTON}
                </button>
              )}
            </p>
          </div>
        </div>
      </form>
    ),
    [VerificationStatusMap.VERIFIED]: (
      <form onSubmit={handlePasswordSubmit(onPasswordSubmit)} className="mt-8 space-y-6">
        <Input
          label={UI_TEXT.RESET_PASSWORD.NEW_PASSWORD_LABEL}
          type="password"
          autoComplete="new-password"
          error={passwordErrors.newPassword?.message}
          {...registerPassword('newPassword')}
        />
        <Input
          label={UI_TEXT.RESET_PASSWORD.CONFIRM_PASSWORD_LABEL}
          type="password"
          autoComplete="new-password"
          error={passwordErrors.confirmPassword?.message}
          {...registerPassword('confirmPassword')}
        />

        <Button type="submit" isLoading={isResetting} className="w-full">
          {UI_TEXT.RESET_PASSWORD.RESET_BUTTON}
        </Button>
      </form>
    ),
  };

  const currentStatus = isOtpVerified ? VerificationStatusMap.VERIFIED : VerificationStatusMap.UNVERIFIED;

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-12 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8 bg-white p-8 shadow-lg rounded-xl">
        <div className="text-center">
          <div className="mx-auto h-16 w-16 flex items-center justify-center rounded-full bg-red-100">
            <svg className="h-10 w-10 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
          <h2 className="mt-6 text-3xl font-bold tracking-tight text-gray-900">
            {UI_TEXT.RESET_PASSWORD.TITLE}
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            {!isOtpVerified ? (
              <>
                {UI_TEXT.RESET_PASSWORD.DESCRIPTION_OTP}<br />
                <span className="font-medium text-gray-900">{email}</span>
              </>
            ) : (
              UI_TEXT.RESET_PASSWORD.DESCRIPTION_PASSWORD
            )}
          </p>
        </div>

        {StepsValues[currentStatus]}
      </div>
    </div>
  );
};

export default ResetPassword;
