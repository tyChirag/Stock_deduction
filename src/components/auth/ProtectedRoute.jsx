import { useEffect } from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { toast } from 'sonner';
import useStore from '../../store/useStore';

export default function ProtectedRoute() {
  const { isAuthenticated, hasConnectedPlatform } = useStore();
  const location = useLocation();

  if (!isAuthenticated) return <Navigate to="/login" replace state={{ from: location }} />;
  if (!hasConnectedPlatform()) return <Navigate to="/connect-platforms" replace />;

  return <Outlet />;
}

