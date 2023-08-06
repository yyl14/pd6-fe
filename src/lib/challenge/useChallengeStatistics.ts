import useSWR from 'swr';
import { getChallengeStatistics } from './fetchers';

const useChallengeStatistics = (challengeId: number) => {
  const getChallengeStatisticsSWR = useSWR(`/challenge/${challengeId}/statistics/summary`, () =>
    getChallengeStatistics({ challenge_id: challengeId }),
  );

  return {
    challengeStatistics: getChallengeStatisticsSWR.data?.data.data,

    isLoading: getChallengeStatisticsSWR.isLoading,
    error: getChallengeStatisticsSWR.error,
  };
};

export default useChallengeStatistics;
