import useSWR from 'swr';

import { components } from '../../../types/schema';
import useCourses from '../course/useCourses';
import { browseAllClassUnderCourse } from './fetchers';

type ClassSchema = components['schemas']['pydantic__dataclasses__Class'];

const useCoursesClasses = () => {
  const { courses, isLoading } = useCourses();
  const browseCoursesClassesSWR = useSWR(courses ? 'coursesClasses' : null, () =>
    Promise.all(
      courses?.map(async (item) => {
        const classesRes = await browseAllClassUnderCourse({ course_id: item.id });
        return [item.id, classesRes.data.data];
      }) ?? [],
    ),
  );

  const coursesClasses = Object.fromEntries((browseCoursesClassesSWR.data as [number, ClassSchema[]][]) ?? []);

  return {
    coursesClasses,
    isLoading: {
      browse: isLoading.browseAll || browseCoursesClassesSWR.isLoading,
    },
  };
};

export default useCoursesClasses;
