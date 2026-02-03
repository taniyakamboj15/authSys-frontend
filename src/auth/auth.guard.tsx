import { useEffect } from 'react';
import { useNavigate, useLocation, Outlet } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../app/hooks';
import { checkAuth } from './auth.slice';
import { Loader } from '../components/ui/Loader';

export const AuthGuard = () => {
  const { isAuthenticated, isLoading } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Only check auth if we don't know the state yet (though middleware handles this usually, 
    // it's good to trigger an initial check if user is null but cookies might exist)
    // Actually, slice initial state isLoading=true, we should dispatch checkAuth on mount
    dispatch(checkAuth());
  }, [dispatch]);

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      navigate('/login', { state: { from: location }, replace: true });
    }
  }, [isLoading, isAuthenticated, navigate, location]);

  if (isLoading) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <Loader size={48} />
      </div>
    );
  }

  return isAuthenticated ? <Outlet /> : null;
};
