import useSWR from 'swr';
import useSWRMutation from 'swr/mutation';

import toSWRMutationFetcher from '@/function/toSWRMutationFetcher';

import { addCourse, browseAllCourse } from './fetchers';

const useCourses = () => {
  const browseAllCourseSWR = useSWR('/course', () => browseAllCourse({}));
  const addCourseSWR = useSWRMutation('/course', toSWRMutationFetcher(addCourse));

  return {
    courses: browseAllCourseSWR.data?.data.data,
    addInstitute: addCourseSWR.trigger,
    isLoading: {
      browseAll: browseAllCourseSWR.isLoading,
      add: addCourseSWR.isMutating,
    },
    error: {
      browseAll: browseAllCourseSWR.error,
      add: addCourseSWR.error,
    },
  };
};

export default useCourses;
