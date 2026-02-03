import { Outlet } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

export const AppLayout = () => {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 font-sans">
      <Toaster position="top-right" reverseOrder={false} />
      <main className="w-full h-full">
        <Outlet />
      </main>
    </div>
  );
};
