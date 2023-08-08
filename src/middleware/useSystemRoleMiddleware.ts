import { useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';

import useUser from '@/lib/user/useUser';
import useUserClasses from '@/lib/user/useUserClasses';

const useSystemRoleMiddleware = () => {
  const history = useHistory();
  const location = useLocation();
  const { account: user } = useUser();
  const { accountClasses: userClasses } = useUserClasses();

  useEffect(() => {
    if (user && userClasses && location.pathname === '/6a') {
      if (user.role === 'MANAGER') {
        history.push('/6a/admin/course/course');
      } else if (user.role === 'NORMAL') {
        history.push('/6a/my-class');
      } else {
        history.push('/6a/my-profile');
      }
    }
  }, [history, location.pathname, user, userClasses]);
};

export default useSystemRoleMiddleware;
