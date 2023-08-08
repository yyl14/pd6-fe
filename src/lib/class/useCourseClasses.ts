import useSWR from 'swr';
import useSWRMutation from 'swr/mutation';

import toSWRMutationFetcher from '@/function/toSWRMutationFetcher';

import { addClassUnderCourse, browseAllClassUnderCourse } from './fetchers';

const useCourseClasses = (courseId: number) => {
  const browseAllClassUnderCourseSWR = useSWR(`/course/${courseId}/class`, () =>
    browseAllClassUnderCourse({ course_id: courseId }),
  );
  const addClassUnderCourseSWR = useSWRMutation(`/course/${courseId}/class`, toSWRMutationFetcher(addClassUnderCourse));

  return {
    browse: browseAllClassUnderCourseSWR.data?.data.data,
    add: addClassUnderCourseSWR.trigger,
    isLoading: {
      browse: browseAllClassUnderCourseSWR.isLoading,
      add: addClassUnderCourseSWR.isMutating,
    },
    error: {
      browse: browseAllClassUnderCourseSWR.error,
      add: addClassUnderCourseSWR.error,
    },
  };
};

export default useCourseClasses;
