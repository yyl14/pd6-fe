import { useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';

import useCoursesClasses from '@/lib/class/useCoursesClasses';
import useCourses from '@/lib/course/useCourses';

const useProblemSetMiddleware = () => {
  const history = useHistory();
  const location = useLocation();

  const { courses } = useCourses();
  const { coursesClasses } = useCoursesClasses(courses?.map((course) => course.id) ?? null);

  useEffect(() => {
    if (location.pathname === '/problem-set') {
      const sortedCourses = courses?.sort((a, b) => a.name.localeCompare(b.name));
      const sortedClasses = sortedCourses
        ?.map((course) => coursesClasses[course.id] ?? [])
        .map((classes) => classes?.sort((a, b) => a.class_info.name.localeCompare(b.class_info.name)))
        .flat();

      const defaultClass = sortedClasses?.at(0);

      if (defaultClass) {
        history.push(`/problem-set/${defaultClass?.class_info.course_id}/${defaultClass?.class_info.id}`);
      }
    }
  }, [courses, coursesClasses, history, location.pathname]);
};

export default useProblemSetMiddleware;
