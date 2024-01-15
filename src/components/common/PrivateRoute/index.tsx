import { useCheckUserAuth } from '@/hooks/useAuth';

import { Navigate, Outlet } from 'react-router-dom';

export default function PrivateRoute() {
  const result = useCheckUserAuth();
  if (result.isSuccess && result.data) {
    return <Outlet context={result} />;
  }

  return <Navigate replace to="/login" />;
}
