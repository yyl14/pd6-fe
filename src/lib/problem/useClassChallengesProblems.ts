import useSWR from 'swr';

import { browseChallengeUnderClass } from '../challenge/fetchers';
import { readTask } from '../task/fetchers';

const useClassChallengesProblems = (classId: number) => {
  const challengesProblemsSWR = useSWR(['classChallengesProblems', classId], async () => {
    const challengesUnderClassRes = await browseChallengeUnderClass({ class_id: classId });
    return {
      challenges: challengesUnderClassRes.data.data.data,
      problems: (
        await Promise.all(
          challengesUnderClassRes?.data.data.data.map(async (challenge) => {
            const tasksRes = await readTask({ challenge_id: challenge.id });
            return tasksRes.data.data.problem;
          }) ?? [],
        )
      ).flat(),
    };
  });

  return {
    challengesUnderClass: challengesProblemsSWR.data?.challenges,
    classChallengesProblems: challengesProblemsSWR.data?.problems,
    isLoading: {
      browse: challengesProblemsSWR.isLoading,
    },
  };
};

export default useClassChallengesProblems;
