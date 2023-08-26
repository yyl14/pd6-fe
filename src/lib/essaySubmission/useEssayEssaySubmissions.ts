import useSWR from 'swr';
import useSWRMutation from 'swr/mutation';

import toSWRMutationFetcher from '@/function/toSWRMutationFetcher';

import { browseEssaySubmissionByEssayId, downloadAllEssaySubmissions, uploadEssay } from './fetchers';

const useEssayEssaySubmissions = (essayId: number) => {
  const browseEssaySubmissionByEssayIdSWR = useSWR(`/essay/${essayId}/essay-submission`, () =>
    browseEssaySubmissionByEssayId({ essay_id: essayId }),
  );

  const uploadEssaySWR = useSWRMutation(`/essay/${essayId}/essay-submission`, toSWRMutationFetcher(uploadEssay));

  const downloadAllEssaySubmissionsSWR = useSWRMutation(`/essay/${essayId}/all-essay-submission`, () =>
    downloadAllEssaySubmissions({ essay_id: essayId, as_attachment: true }),
  );

  return {
    essaySubmission: browseEssaySubmissionByEssayIdSWR.data?.data.data,
    downloadAllSubmissions: downloadAllEssaySubmissionsSWR.trigger,
    uploadEssay: uploadEssaySWR.trigger,
    mutateEssaySubmission: browseEssaySubmissionByEssayIdSWR.mutate,

    isLoading: {
      browse: browseEssaySubmissionByEssayIdSWR.isLoading,
      download: downloadAllEssaySubmissionsSWR.isMutating,
      upload: uploadEssaySWR.isMutating,
    },

    error: {
      browse: browseEssaySubmissionByEssayIdSWR.error,
      download: downloadAllEssaySubmissionsSWR.error,
      upload: uploadEssaySWR.error,
    },
  };
};

export default useEssayEssaySubmissions;
