import useSWR from 'swr';
import { browseAllSubmissionJudgment } from './fetchers';

const useSubmissionJudgements = (submissioinId: number) => {
  const browseAllSubmissionJudgmentSWR = useSWR(`/submissioin/${submissioinId}/judgement`, () =>
    browseAllSubmissionJudgment({ submission_id: submissioinId }),
  );

  return {
    submissionJudgements: browseAllSubmissionJudgmentSWR.data?.data.data,

    isLoading: {
      browseAll: browseAllSubmissionJudgmentSWR.isLoading,
    },
    error: {
      browseAll: browseAllSubmissionJudgmentSWR.error,
    },
  };
};

export default useSubmissionJudgements;
