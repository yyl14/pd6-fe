import useSWR from 'swr';
import useSWRMutation from 'swr/mutation';
import toSWRMutationFetcher from '../../function/toSWRMutationFetcher';
import { readTask, addTaskProblem, addTaskEssay, addTaskPeerReview, addTaskTeamProjectScoreboard } from './fetchers';

const useChallengeTasks = (challengeId: number) => {
    const readTaskSWR = useSWR(`/challenge/${challengeId}/task`, 
        () => readTask({ challenge_id: challengeId }));
  
    const addTaskProblemSWR = useSWRMutation(`/challenge/${challengeId}/problem`, 
          toSWRMutationFetcher(addTaskProblem));

    const addTaskEssaySWR = useSWRMutation(`/challenge/${challengeId}/problem`, 
          toSWRMutationFetcher(addTaskEssay));
    
    const addTaskPeerReviewSWR = useSWRMutation(`/challenge/${challengeId}/problem`, 
          toSWRMutationFetcher(addTaskPeerReview));

    const addTaskTeamProjectScoreboardSWR = useSWRMutation(`/challenge/${challengeId}/problem`, 
          toSWRMutationFetcher(addTaskTeamProjectScoreboard));
  
    return {
        task: readTaskSWR.data?.data.data,
        addProblem: addTaskProblemSWR.trigger,
        addEssay: addTaskEssaySWR.trigger,
        addPeerReview: addTaskPeerReviewSWR.trigger,
        addTeamProjectScoreboard: addTaskTeamProjectScoreboardSWR.trigger,
  
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
