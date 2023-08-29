import useSWR from 'swr';

import { components } from '../../../types/schema';
import { browseAllClassUnderCourse } from './fetchers';

type ClassSchema = components['schemas']['BrowseAllClassUnderCourseOutput'];

const useCoursesClasses = (courseIds: number[] | null) => {
  const browseCoursesClassesSWR = useSWR(courseIds ? 'coursesClasses' : null, async () =>
    Promise.all(
      courseIds?.map(async (id) => {
        const classesRes = await browseAllClassUnderCourse({ course_id: id });
        return [id, classesRes.data.data];
      }) ?? [],
    ),
  );

  const coursesClasses = Object.fromEntries((browseCoursesClassesSWR.data as [number, ClassSchema[]][]) ?? []);

  return {
    coursesClasses,
    isLoading: {
      browse: browseCoursesClassesSWR.isLoading,
    },
  };
};

export default useCoursesClasses;
