import { useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';

import useUser from '@/lib/user/useUser';
import useUserClasses from '@/lib/user/useUserClasses';

const useMyClassMiddleware = () => {
  const history = useHistory();
  const location = useLocation();

  const { account: user } = useUser();
  const { accountClasses: userClasses } = useUserClasses();

  useEffect(() => {
    if (user && user?.role !== 'NORMAL') {
      history.push('/');
    }
  }, [user, history]);

  useEffect(() => {
    if (location.pathname === '/my-class') {
      if (userClasses) {
        if (userClasses.length === 0) {
          history.push('/problem-set');
        } else {
          const sortedClasses = userClasses.sort(
            (a, b) => b.class_name.localeCompare(a.class_name) || b.course_name.localeCompare(a.course_name),
          );
          history.push(`/my-class/${sortedClasses[0].course_id}/${sortedClasses[0].class_id}/challenge`);
        }
      }
    }
  }, [history, location.pathname, userClasses]);
};

export default useMyClassMiddleware;
