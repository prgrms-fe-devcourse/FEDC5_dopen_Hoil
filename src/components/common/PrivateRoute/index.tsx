import { useCheckUserAuth } from '@/hooks/useAuth';
import { Navigate, Outlet } from 'react-router-dom';

export default function PrivateRoute() {
  const { data: userInfo, isSuccess } = useCheckUserAuth();

  if (isSuccess && userInfo) {
    return <Outlet context={{ userInfo }} />;
  }

  return <Navigate replace to="/login" />;
}
