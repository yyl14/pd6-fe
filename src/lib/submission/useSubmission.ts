import useSWR from 'swr';
import useSWRMutation from 'swr/mutation';

import toSWRFetcher from '@/function/toSWRMutationFetcher';

import { readSubmission, rejudgeSubmission } from './fetchers';

const useSubmission = (submissionId: number) => {
  const readSubmissionSWR = useSWR(`/submission/${submissionId}`, () =>
    readSubmission({ submission_id: submissionId }),
  );
  const rejudgeSubmissionSWR = useSWRMutation(`/submission/${submissionId}/rejudge`, toSWRFetcher(rejudgeSubmission));

  return {
    submission: readSubmissionSWR.data?.data.data,
    mutateSubmission: readSubmissionSWR.mutate,
    rejudge: rejudgeSubmissionSWR.trigger,
    isLoading: {
      read: readSubmissionSWR.isLoading,
      rejudge: rejudgeSubmissionSWR.isMutating,
    },
    error: {
      read: readSubmissionSWR.error,
      rejudge: rejudgeSubmissionSWR.error,
    },
  };
};

export default useSubmission;
