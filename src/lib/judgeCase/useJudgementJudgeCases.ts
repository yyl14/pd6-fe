import useSWR from 'swr';
import browseAllJudgmentJudgeCase from './fetchers';

const useJudgementJudgeCases = (judgementId: number) => {
  const browseAllJudgmentJudgeCaseSWR = useSWR(`/judgment/${judgementId}/judge-case`, () =>
    browseAllJudgmentJudgeCase({ judgment_id: judgementId }),
  );

  return {
    judge_case: browseAllJudgmentJudgeCaseSWR.data?.data.data,

    isLoading: {
      browse: browseAllJudgmentJudgeCaseSWR.isLoading,
    },

    error: {
      browse: browseAllJudgmentJudgeCaseSWR.error,
    },
  };
};

export default useJudgementJudgeCases;
