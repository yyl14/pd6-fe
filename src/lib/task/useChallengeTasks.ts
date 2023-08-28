import useSWR from 'swr';
import useSWRMutation from 'swr/mutation';

import toSWRMutationFetcher from '@/function/toSWRMutationFetcher';

import { addTaskEssay, addTaskPeerReview, addTaskProblem, addTaskTeamProjectScoreboard, readTask } from './fetchers';

const useChallengeTasks = (challengeId: number) => {
  const readTaskSWR = useSWR(`/challenge/${challengeId}/task`, () => readTask({ challenge_id: challengeId }));

  const addTaskProblemSWR = useSWRMutation(`/challenge/${challengeId}/task`, toSWRMutationFetcher(addTaskProblem));

  const addTaskEssaySWR = useSWRMutation(`/challenge/${challengeId}/task`, toSWRMutationFetcher(addTaskEssay));

  const addTaskPeerReviewSWR = useSWRMutation(
    `/challenge/${challengeId}/task`,
    toSWRMutationFetcher(addTaskPeerReview),
  );

  const addTaskTeamProjectScoreboardSWR = useSWRMutation(
    `/challenge/${challengeId}/task`,
    toSWRMutationFetcher(addTaskTeamProjectScoreboard),
  );

  return {
    tasks: readTaskSWR.data?.data.data,
    addProblem: addTaskProblemSWR.trigger,
    addEssay: addTaskEssaySWR.trigger,
    addPeerReview: addTaskPeerReviewSWR.trigger,
    addTeamProjectScoreboard: addTaskTeamProjectScoreboardSWR.trigger,
    mutateTask: readTaskSWR.mutate,

    isLoading: {
      read: readTaskSWR.isLoading,
      addProblem: addTaskProblemSWR.isMutating,
      addEssay: addTaskEssaySWR.isMutating,
      addPeerReview: addTaskPeerReviewSWR.isMutating,
      addTeamProjectScoreboard: addTaskTeamProjectScoreboardSWR.isMutating,
    },

    error: {
      read: readTaskSWR.error,
      addProblem: addTaskProblemSWR.error,
      addEssay: addTaskEssaySWR.error,
      addPeerReview: addTaskPeerReviewSWR.error,
      addTeamProjectScoreboard: addTaskTeamProjectScoreboardSWR.error,
    },
  };
};

export default useChallengeTasks;
