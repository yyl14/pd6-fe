import { Suspense, lazy } from 'react';
import { Route, Switch, useParams } from 'react-router-dom';

import GeneralLoading from '@/components/GeneralLoading';
import withConditionalRender from '@/components/hoc/withConditionalRender';
import useChallenge from '@/lib/challenge/useChallenge';
import useClass from '@/lib/class/useClass';
import useCourse from '@/lib/course/useCourse';

import ProblemRoutes from './problem';

const ChallengeInfo = lazy(() => import('@/pages/ChallengeInfo'));

function ChallengeInfoRoute() {
  const { courseId, classId, challengeId } = useParams<{ courseId: string; classId: string; challengeId: string }>();

  const { isLoading: courseIsLoading } = useCourse(Number(courseId));
  const { isLoading: classIsLoading } = useClass(Number(classId));
  const { isLoading: challengeIsLoading } = useChallenge(Number(challengeId));

  return (
    <Suspense fallback={<GeneralLoading />}>
      {withConditionalRender(ChallengeInfo)({
        classId,
        challengeId,
        isProblemSet: true,
        isLoading: courseIsLoading.read || classIsLoading.read || challengeIsLoading.read,
      })}
    </Suspense>
  );
}

export default function ChallengeRoutes() {
  return (
    <Switch>
      <Route path="/problem-set/:courseId/:classId/challenge/:challengeId/problem" component={ProblemRoutes} />
      <Route path="/problem-set/:courseId/:classId/challenge/:challengeId" component={ChallengeInfoRoute} />
    </Switch>
  );
}
