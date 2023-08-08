import { useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';

import useCoursesClasses from '@/lib/class/useCoursesClasses';
import useCourses from '@/lib/course/useCourses';

const useProblemSetMiddleware = () => {
  const history = useHistory();
  const location = useLocation();

  const { courses } = useCourses();
  const { coursesClasses } = useCoursesClasses();

  useEffect(() => {
    if (location.pathname === '/6a/problem-set') {
      const sortedCourses = courses?.sort((a, b) => a.name.localeCompare(b.name));
      const sortedClasses = sortedCourses
        ?.map((course) => coursesClasses[course.id])
        .flatMap((classes) => classes?.sort((a, b) => a.name.localeCompare(b.name)));

      const defaultClass = sortedClasses?.at(0);

      if (defaultClass) {
        history.push(`/6a/problem-set/${defaultClass?.course_id}/${defaultClass?.id}`);
      }
    }
  }, [courses, coursesClasses, history, location.pathname]);
};

export default useProblemSetMiddleware;
