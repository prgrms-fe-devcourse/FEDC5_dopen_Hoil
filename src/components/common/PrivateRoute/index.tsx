import { useCheckUserAuth } from '@/hooks/useAuth';

import { Outlet } from 'react-router-dom';

export default function PrivateRoute() {
  const result = useCheckUserAuth();
  if (result.isSuccess && result.data) {
    return <Outlet context={result} key="test" />;
  }
  location.href = '/login';
  return <></>;
}
