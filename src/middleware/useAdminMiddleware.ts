import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import useUser from '@/lib/user/useUser';

const useAdminMiddleware = () => {
  const history = useHistory();

  const { account: user } = useUser();

  useEffect(() => {
    if (user?.role !== 'MANAGER') {
      history.push('/6a');
    }
  }, [user?.role, history]);
};

export default useAdminMiddleware;
