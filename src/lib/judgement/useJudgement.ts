import useSWR from 'swr';
import { readJudgment } from './fetchers';

const useJudgement = (judgementId: number) => {
  const readJudgmentSWR = useSWR(`/judgment/${judgementId}`, () => readJudgment({ judgment_id: judgementId }));

  return {
    judgement: readJudgmentSWR.data?.data.data,

    isLoading: {
      read: readJudgmentSWR.isLoading,
    },
    error: {
      read: readJudgmentSWR.error,
    },
  };
};

export default useJudgement;
