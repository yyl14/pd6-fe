import useSWR from 'swr';
import { readSubmissionLatestJudgment } from './fetchers';

const useSubmissionLatestJudgement = (submissioinId: number) => {
  const readSubmissionLatestJudgmentSWR = useSWR(`/submissioin/${submissioinId}/latest-judgement`, () =>
    readSubmissionLatestJudgment({ submission_id: submissioinId }),
  );

  return {
    submissionLatestJudgement: readSubmissionLatestJudgmentSWR.data?.data.data,

    isLoading: {
      read: readSubmissionLatestJudgmentSWR.isLoading,
    },
    error: {
      read: readSubmissionLatestJudgmentSWR.error,
    },
  };
};

export default useSubmissionLatestJudgement;
