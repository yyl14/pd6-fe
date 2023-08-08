import { useCallback, useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';

import useAuthStore from '@/stores/authStore';

const useAuthMiddleware = () => {
  const history = useHistory();
  const location = useLocation();
  const auth = useAuthStore();

  const redirectToLogin = useCallback(() => {
    if (location.pathname !== '/') {
      history.push(`/6a/login?redirect_url=${location.pathname}`);
    } else {
      history.push('/6a/login');
    }
  }, [history, location]);

  useEffect(() => {
    if (!auth.authToken) {
      redirectToLogin();
    }
  }, [auth.authToken, redirectToLogin]);
};

export default useAuthMiddleware;
