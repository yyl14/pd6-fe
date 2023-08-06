import useSWR from 'swr';
import useSWRMutation from 'swr/mutation';
import toSWRMutationFetcher from '../../function/toSWRMutationFetcher';
import { browseEssaySubmissionByEssayId, uploadEssay } from './fetchers';

const useEssayEssaySubmissions = (essayId: number) => {
  const browseEssaySubmissionByEssayIdSWR = useSWR(`/essay/{essay_id}/essay-submission`, () =>
    browseEssaySubmissionByEssayId({ essay_id: essayId }),
  );

  const uploadEssaySWR = useSWRMutation(`/essay/{essay_id}/essay-submission`, toSWRMutationFetcher(uploadEssay));

  return {
    essaySubmission: browseEssaySubmissionByEssayIdSWR.data?.data.data,
    uploadEssay: uploadEssaySWR.trigger,

    isLoading: {
      browse: browseEssaySubmissionByEssayIdSWR.isLoading,
      upload: uploadEssaySWR.isMutating,
    },

    error: {
      browse: browseEssaySubmissionByEssayIdSWR.error,
      upload: uploadEssaySWR.error,
    },
  };
};

export default useEssayEssaySubmissions;
