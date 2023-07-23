import useSWR from 'swr';
import useSWRMutation from 'swr/mutation';
import toSWRMutationFetcher from '../../function/toSWRMutationFetcher';
import { readEssaySubmission, reuploadEssay } from './fetchers';

const useEssaySubmission = (essaySubmissionId: number) => {
  const readEssaySubmissionSWR = useSWR(`/essay/{essay_id}/essay-submission`, () =>
    readEssaySubmission({ essay_submission_id: essaySubmissionId }),
  );

  const reuploadEssaySWR = useSWRMutation(
    `/essay-submission/{essay_submission_id}`,
    toSWRMutationFetcher(reuploadEssay),
  );

  return {
    essaySubmission: readEssaySubmissionSWR.data?.data.data,
    reuploadEssay: reuploadEssaySWR.trigger,

    isLoading: {
      read: readEssaySubmissionSWR.isLoading,
      reupload: reuploadEssaySWR.isMutating,
    },

    error: {
      read: readEssaySubmissionSWR.error,
      reupload: reuploadEssaySWR.error,
    },
  };
};

export default useEssayEssaySubmissions;
