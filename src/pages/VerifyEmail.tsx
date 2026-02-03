import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { useVerifyEmail } from '../hooks';
import { verifyEmailSchema, type VerifyEmailFormValues } from '../validations';
import { UI_TEXT } from '../constants';

const VerifyEmail = () => {
  const { email, isVerifying, isResending, countdown, handleVerify, handleResend } = useVerifyEmail();

  const { register, handleSubmit, formState: { errors } } = useForm<VerifyEmailFormValues>({
    resolver: yupResolver(verifyEmailSchema),
  });

  const onSubmit = async (data: VerifyEmailFormValues) => {
    await handleVerify(data.otp);
  };

  const ResendButtonMap = {
    disabled: (
      <span className="text-gray-500">
        {UI_TEXT.VERIFY_EMAIL.RESEND_IN} {countdown}s
      </span>
    ),
    active: (
      <button
        type="button"
        onClick={handleResend}
        disabled={isResending}
        className="font-medium text-blue-600 hover:text-blue-500 disabled:opacity-50"
      >
        {isResending ? UI_TEXT.VERIFY_EMAIL.SENDING : UI_TEXT.VERIFY_EMAIL.RESEND_BUTTON}
      </button>
    ),
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-12 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8 bg-white p-8 shadow-lg rounded-xl">
        <div className="text-center">
          <div className="mx-auto h-16 w-16 flex items-center justify-center rounded-full bg-blue-100">
            <svg
              className="h-10 w-10 text-blue-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
              />
            </svg>
          </div>
          <h2 className="mt-6 text-3xl font-bold tracking-tight text-gray-900">
            {UI_TEXT.VERIFY_EMAIL.TITLE}
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            {UI_TEXT.VERIFY_EMAIL.DESCRIPTION}<br />
            <span className="font-medium text-gray-900">{email}</span>
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-6">
          <Input
            label={UI_TEXT.VERIFY_EMAIL.LABEL}
            type="text"
            error={errors.otp?.message}
            placeholder={UI_TEXT.VERIFY_EMAIL.PLACEHOLDER}
            maxLength={6}
            className="text-center text-2xl tracking-widest font-mono"
            autoComplete="one-time-code"
            {...register('otp')}
          />

          <div className="flex flex-col space-y-3">
            <Button type="submit" isLoading={isVerifying} className="w-full">
              {UI_TEXT.VERIFY_EMAIL.SUBMIT_BUTTON}
            </Button>

            <div className="text-center">
              <p className="text-sm text-gray-600">
                {UI_TEXT.VERIFY_EMAIL.DIDNT_RECEIVE}{' '}
                {ResendButtonMap[countdown > 0 ? 'disabled' : 'active']}
              </p>
            </div>
          </div>
        </form>

        <div className="mt-6 text-center">
          <p className="text-xs text-gray-500">
            {UI_TEXT.VERIFY_EMAIL.EXPIRY_NOTE}
          </p>
        </div>
      </div>
    </div>
  );
};

export default VerifyEmail;
