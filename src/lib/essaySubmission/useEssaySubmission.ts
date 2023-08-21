import useSWRMutation from 'swr/mutation';

import { reuploadEssay } from './fetchers';

const useEssaySubmission = () => {
  const reuploadEssaySWR = useSWRMutation(`/essay-submission/{essaySubmissionId}`, reuploadEssay);

  return {
    reuploadEssay: reuploadEssaySWR.trigger,

    isLoading: {
      reupload: reuploadEssaySWR.isMutating,
    },

    error: {
      reupload: reuploadEssaySWR.error,
    },
  };
};

export default useEssaySubmission;
