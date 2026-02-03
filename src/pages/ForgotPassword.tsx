import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { useForgotPassword } from '../hooks';
import { forgotPasswordSchema, type ForgotPasswordFormValues } from '../validations';
import { UI_TEXT, ROUTES } from '../constants';

const ForgotPassword = () => {
  const { isSubmitting, handleForgotPassword } = useForgotPassword();

  const { register, handleSubmit, formState: { errors } } = useForm<ForgotPasswordFormValues>({
    resolver: yupResolver(forgotPasswordSchema),
  });

  const onSubmit = (data: ForgotPasswordFormValues) => {
    handleForgotPassword(data.email);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-12 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8 bg-white p-8 shadow-lg rounded-xl">
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-bold tracking-tight text-gray-900">{UI_TEXT.FORGOT_PASSWORD.TITLE}</h2>
          <p className="mt-2 text-sm text-gray-600">
            {UI_TEXT.FORGOT_PASSWORD.DESCRIPTION}
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-6">
          <Input
            label={UI_TEXT.FORGOT_PASSWORD.EMAIL_LABEL}
            type="email"
            autoComplete="email"
            error={errors.email?.message}
            {...register('email')}
          />

          <Button type="submit" isLoading={isSubmitting} className="w-full">
            {UI_TEXT.FORGOT_PASSWORD.SUBMIT_BUTTON}
          </Button>

          <div className="text-center">
            <Link to={ROUTES.LOGIN} className="text-sm font-medium text-blue-600 hover:text-blue-500">
              {UI_TEXT.FORGOT_PASSWORD.BACK_TO_LOGIN}
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
