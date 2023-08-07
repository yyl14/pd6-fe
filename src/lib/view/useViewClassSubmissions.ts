import useSWRWithBrowseParams from 'swr';
import { browseSubmissionUnderClass } from './fetchers';

const useViewClassSubmissions = (classId: number) => {
  const browseSubmissionUnderClassSWR = useSWRWithBrowseParams(`/class/{class_id}/view/submission`, () =>
    browseSubmissionUnderClass({ class_id: classId }),
  );

  return {
    submissions: browseSubmissionUnderClassSWR.data?.data.data,

    isLoading: {
      browse: browseSubmissionUnderClassSWR.isLoading,
    },

    error: {
      browse: browseSubmissionUnderClassSWR.error,
    },
  };
};

export default useViewClassSubmissions;
