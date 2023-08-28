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
      history.push('/6a');
    }
  }, [user, history]);

  useEffect(() => {
    if (location.pathname === '/6a/my-class') {
      if (userClasses) {
        if (userClasses.length === 0) {
          history.push('/6a/problem-set');
        }
        const sortedClasses = userClasses.sort(
          (a, b) => b.class_name.localeCompare(a.class_name) || b.course_name.localeCompare(a.course_name),
        );
        history.push(`/6a/my-class/${sortedClasses[0].course_id}/${sortedClasses[0].class_id}/challenge`);
      }
    }
  }, [history, location.pathname, userClasses]);
};

export default useMyClassMiddleware;
