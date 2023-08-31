import { useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';

import useCourses from '@/lib/course/useCourses';

const useAdminCourseMiddleware = () => {
  const history = useHistory();
  const location = useLocation();

  const { courses } = useCourses();

  useEffect(() => {
    if (location.pathname === '/6a/admin/course/course' && courses !== undefined) {
      history.push(`/6a/admin/course/course/${courses?.at(0)?.id}/class-list`);
    }
  }, [courses, history, location.pathname]);
};

export default useAdminCourseMiddleware;
