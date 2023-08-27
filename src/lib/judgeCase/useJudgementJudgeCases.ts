import useSWR from 'swr';

import browseAllJudgmentJudgeCase from './fetchers';

const useJudgementJudgeCases = (judgementId: number | null) => {
  const browseAllJudgmentJudgeCaseSWR = useSWR(judgementId ? `/judgment/${judgementId}/judge-case` : null, () =>
    browseAllJudgmentJudgeCase({ judgment_id: judgementId ?? 0 }),
  );

  return {
    judgeCases: browseAllJudgmentJudgeCaseSWR.data?.data.data,

    isLoading: {
      browse: browseAllJudgmentJudgeCaseSWR.isLoading,
    },

    error: {
      browse: browseAllJudgmentJudgeCaseSWR.error,
    },
  };
};

export default useJudgementJudgeCases;
