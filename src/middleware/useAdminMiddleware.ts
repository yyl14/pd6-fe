import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import useUser from '@/lib/user/useUser';

const useAdminMiddleware = () => {
  const history = useHistory();

  const { account: user } = useUser();

  useEffect(() => {
    if (user?.role === 'NORMAL') {
      history.push('/6a/my-class');
    } else if (user?.role === 'GUEST') {
      history.push('/6a/my-profile');
    }
  }, [user?.role, history]);
};

export default useAdminMiddleware;
