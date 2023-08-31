import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import useUser from '@/lib/user/useUser';

const useAdminMiddleware = () => {
  const history = useHistory();

  const { account: user } = useUser();

  useEffect(() => {
    if (user && user?.role !== 'MANAGER') {
      history.push('/');
    }
  }, [user, history]);
};

export default useAdminMiddleware;
