import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { useAppDispatch } from '../../app/hooks';
import { checkAuth } from '../../auth/auth.slice';

export const AppLayout = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch]);

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 font-sans">
      <Toaster position="top-right" reverseOrder={false} />
      <main className="w-full h-full">
        <Outlet />
      </main>
    </div>
  );
};
