import useSWR from 'swr';
import { getMemberSubmissionStatistics } from './fetchers';

const useMemberSubmissionStatistics = (challengeId: number) => {
  const getMemberSubmissionStatisticsSWR = useSWR(`/challenge/${challengeId}/statistics/member-submission`, () =>
    getMemberSubmissionStatistics({ challenge_id: challengeId }),
  );

  return {
    memberSubmissionStatistics: getMemberSubmissionStatisticsSWR.data?.data.data,

    isLoading: getMemberSubmissionStatisticsSWR.isLoading,
    error: getMemberSubmissionStatisticsSWR.error,
  };
};

export default useMemberSubmissionStatistics;
