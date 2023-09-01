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
    if (user && userClasses && location.pathname === '/') {
      if (user.role === 'MANAGER') {
        history.push('/admin/course/course');
      } else if (user.role === 'NORMAL') {
        history.push('/my-class');
      } else {
        history.push('/my-profile');
      }
    }
  }, [history, location.pathname, user, userClasses]);
};

export default useSystemRoleMiddleware;
