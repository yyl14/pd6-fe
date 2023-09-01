import { useCallback, useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';

import useAuthStore from '@/stores/authStore';

const useAuthMiddleware = () => {
  const history = useHistory();
  const location = useLocation();
  const auth = useAuthStore();

  const redirectToLogin = useCallback(() => {
    if (location.pathname !== '/') {
      const redirectUrl = encodeURIComponent(`${location.pathname}${location.search}`);
      history.push(`/login?redirect_url=${redirectUrl}`);
    } else {
      history.push('/login');
    }
  }, [history, location]);

  useEffect(() => {
    if (!auth.authToken) {
      redirectToLogin();
    }
  }, [auth.authToken, redirectToLogin]);
};

export default useAuthMiddleware;
