import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Link, useNavigate } from 'react-router-dom';
import { useAppSelector } from '../app/hooks';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { showToast } from '../utils/toast.util';
import { registerApi } from '../api/auth.api'; // Call API directly or use thunk if we want to auto-login
import { useEffect } from 'react';

const registerSchema = yup.object().shape({
  name: yup.string().min(2, "Name must be at least 2 characters").required("Name is required"),
  email: yup.string().email("Invalid email address").required("Email is required"),
  password: yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
  confirmPassword: yup.string()
    .oneOf([yup.ref('password')], "Passwords don't match")
    .required("Confirm Password is required"),
});

type RegisterFormValues = yup.InferType<typeof registerSchema>;

export const Register = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAppSelector((state) => state.auth);

  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<RegisterFormValues>({
    resolver: yupResolver(registerSchema),
  });

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/profile');
    }
  }, [isAuthenticated, navigate]);

  const onSubmit = async (data: RegisterFormValues) => {
    try {
      await registerApi(data);
      showToast.success('Registration successful! Please check your email for verification code.');
      // Navigate to verify email page with email in state
      navigate('/verify-email', { state: { email: data.email } });
    } catch (error: any) {
      // Check if we have detailed validation errors
      const errors = error.response?.data?.errors;
      if (errors && Array.isArray(errors)) {
        // Show each validation error separately
        errors.forEach((err: { field: string; message: string }) => {
          showToast.error(`${err.field}: ${err.message}`);
        });
      } else {
        // Show generic error message
        showToast.error(error.response?.data?.message || 'Registration failed');
      }
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-12 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8 bg-white p-8 shadow-lg rounded-xl">
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-bold tracking-tight text-gray-900">Create your account</h2>
          <p className="mt-2 text-sm text-gray-600">
            Already have an account? <Link to="/login" className="font-medium text-blue-600 hover:text-blue-500">Sign in</Link>
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-6">
          <Input
            label="Full Name"
            type="text"
            error={errors.name?.message}
            {...register('name')}
          />
          <Input
            label="Email address"
            type="email"
            error={errors.email?.message}
            {...register('email')}
          />
          <Input
            label="Password"
            type="password"
            error={errors.password?.message}
            {...register('password')}
          />
          <Input
            label="Confirm Password"
            type="password"
            error={errors.confirmPassword?.message}
            {...register('confirmPassword')}
          />

          <Button type="submit" isLoading={isSubmitting} className="w-full">
            Create account
          </Button>
        </form>
      </div>
    </div>
  );
};
