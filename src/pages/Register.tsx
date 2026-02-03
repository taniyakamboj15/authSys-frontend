import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { useRegister } from '../hooks';
import { registerSchema, type RegisterFormValues } from '../validations';
import { UI_TEXT, ROUTES } from '../constants';

const Register = () => {
  const { handleRegister } = useRegister();

  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<RegisterFormValues>({
    resolver: yupResolver(registerSchema),
  });

  const onSubmit = async (data: RegisterFormValues) => {
    try {
      await handleRegister(data);
    } catch {
      // Error already handled in hook
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-12 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8 bg-white p-8 shadow-lg rounded-xl">
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-bold tracking-tight text-gray-900">{UI_TEXT.REGISTER.TITLE}</h2>
          <p className="mt-2 text-sm text-gray-600">
            {UI_TEXT.REGISTER.HAVE_ACCOUNT} <Link to={ROUTES.LOGIN} className="font-medium text-blue-600 hover:text-blue-500">{UI_TEXT.REGISTER.SIGN_IN_LINK}</Link>
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-6">
          <Input
            label={UI_TEXT.REGISTER.NAME_LABEL}
            type="text"
            error={errors.name?.message}
            {...register('name')}
          />
          <Input
            label={UI_TEXT.REGISTER.EMAIL_LABEL}
            type="email"
            error={errors.email?.message}
            {...register('email')}
          />
          <Input
            label={UI_TEXT.REGISTER.PASSWORD_LABEL}
            type="password"
            error={errors.password?.message}
            {...register('password')}
          />
          <Input
            label={UI_TEXT.REGISTER.CONFIRM_PASSWORD_LABEL}
            type="password"
            error={errors.confirmPassword?.message}
            {...register('confirmPassword')}
          />

          <Button type="submit" isLoading={isSubmitting} className="w-full">
            {UI_TEXT.REGISTER.SUBMIT_BUTTON}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Register;
