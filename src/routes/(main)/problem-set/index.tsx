import { Suspense, lazy } from 'react';
import { Route, Switch, useParams } from 'react-router-dom';

import GeneralLoading from '@/components/GeneralLoading';
import withConditionalRender from '@/components/hoc/withConditionalRender';
import NoMatch from '@/components/noMatch';
import useChallenge from '@/lib/challenge/useChallenge';
import useClass from '@/lib/class/useClass';
import useCourse from '@/lib/course/useCourse';
import useProblemSetMiddleware from '@/middleware/useProblemSetMiddleware';

const ChallengeInfo = lazy(() => import('@/pages/ChallengeInfo'));
const ProblemList = lazy(() => import('@/pages/ProblemList'));

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

function ProblemListRoute() {
  const { courseId, classId } = useParams<{ courseId: string; classId: string }>();
  const { isLoading: courseLoading, error: courseError } = useCourse(Number(courseId));
  const { isLoading: classLoading, error: classError } = useClass(Number(classId));

  return (
    <Suspense fallback={<GeneralLoading />}>
      {withConditionalRender(ProblemList)({
        courseId,
        classId,
        isLoading: courseLoading.read || classLoading.read,
        noMatch: courseError.read || classError.read,
      })}
    </Suspense>
  );
}

export default function ProblemSetRoutes() {
  useProblemSetMiddleware();

  return (
    <Switch>
      <Route path="/6a/problem-set/:courseId/:classId/challenge/:challengeId" component={ChallengeInfoRoute} />
      <Route path="/6a/problem-set/:courseId/:classId" component={ProblemListRoute} />
      <Route path="/6a/problem-set" component={NoMatch} />
    </Switch>
  );
}
