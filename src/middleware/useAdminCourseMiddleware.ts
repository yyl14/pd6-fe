import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import useCourses from '@/lib/course/useCourses';

const useAdminCourseMiddleware = () => {
  const history = useHistory();

  const { courses } = useCourses();

  useEffect(() => {
    history.push(`/6a/admin/course/course/${courses?.at(0)?.id}/class-list`);
  }, [courses, history]);
};

export default useAdminCourseMiddleware;
