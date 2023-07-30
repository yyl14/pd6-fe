import useSWR from 'swr';
import useSWRMutation from 'swr/mutation';
import toSWRMutationFetcher from '../../function/toSWRMutationFetcher';
import { deleteCourse, editCourse, readCourse } from './fetchers';

const useCourse = (courseId: number) => {
  const readCourseSWR = useSWR(`/course/${courseId}`, () => readCourse({ course_id: courseId }));
  const deleteCourseSWR = useSWRMutation(`/course/${courseId}`, () => deleteCourse({ course_id: courseId }));
  const editCourseSWR = useSWRMutation(`/course/${courseId}`, toSWRMutationFetcher(editCourse));

  return {
    course: readCourseSWR.data?.data.data,
    editCourse: editCourseSWR.trigger,
    deleteCourse: deleteCourseSWR.trigger,

    isLoading: {
      read: readCourseSWR.isLoading,
      delete: deleteCourseSWR.isMutating,
      edit: editCourseSWR.isMutating,
    },
    error: {
      read: readCourseSWR.error,
      delete: deleteCourseSWR.error,
      edit: editCourseSWR.error,
    },
  };
};

export default useCourse;
