import useSWR from 'swr';
import useSWRMutation from 'swr/mutation';

import toSWRMutationFetcher from '@/function/toSWRMutationFetcher';

import { downloadAllPlagiarismReports, downloadAllSubmissions, getChallengeStatistics } from './fetchers';

const useChallengeStatistics = (challengeId: number) => {
  const getChallengeStatisticsSWR = useSWR(`/challenge/${challengeId}/statistics/summary`, () =>
    getChallengeStatistics({ challenge_id: challengeId }),
  );
  const downloadAllSubmissionsSWR = useSWRMutation(
    `/challenge/${challengeId}/all-submission`,
    toSWRMutationFetcher(downloadAllSubmissions),
  );

  const downloadAllPlagiarismReportsSWR = useSWRMutation(
    `/challenge/${challengeId}/all-plagiarism-report`,
    toSWRMutationFetcher(downloadAllPlagiarismReports),
  );

  return {
    challengeStatistics: getChallengeStatisticsSWR.data?.data.data,
    downloadAllSubmissions: downloadAllSubmissionsSWR.trigger,
    downloadAllPlagiarismReports: downloadAllPlagiarismReportsSWR.trigger,

    isLoading: {
      getStatistics: getChallengeStatisticsSWR.isLoading,
      downloadSubmissions: downloadAllSubmissionsSWR.isMutating,
      downloadPlagiarisms: downloadAllPlagiarismReportsSWR.isMutating,
    },

    error: {
      getStatistics: getChallengeStatisticsSWR.error,
      downloadSubmissions: downloadAllSubmissionsSWR.error,
      downloadPlagiarisms: downloadAllPlagiarismReportsSWR.error,
    },
  };
};

export default useChallengeStatistics;
