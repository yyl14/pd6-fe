import { Suspense, lazy } from 'react';
import { Route, Switch, useParams } from 'react-router-dom';

import GeneralLoading from '../../../../components/GeneralLoading';
import withConditionalRender from '../../../../components/hoc/withConditionalRender';
import useChallenge from '../../../../lib/challenge/useChallenge';
import useClass from '../../../../lib/class/useClass';
import useCourse from '../../../../lib/course/useCourse';

const ChallengeList = lazy(() => import('../../../../pages/ChallengeList'));
const ChallengeInfo = lazy(() => import('../../../../pages/ChallengeInfo'));

function ChallengeListRoute() {
  const { courseId, classId } = useParams<{ courseId: string; classId: string }>();

  const { isLoading: courseIsLoading } = useCourse(Number(courseId));
  const { isLoading: classIsLoading } = useClass(Number(classId));

  return (
    <Suspense fallback={<GeneralLoading />}>
      {withConditionalRender(ChallengeList)({
        courseId,
        classId,
        isLoading: courseIsLoading.read || classIsLoading.read,
      })}
    </Suspense>
  );
}

function ChallengeInfoRoute() {
  const { courseId, classId, challengeId } = useParams<{ courseId: string; classId: string; challengeId: string }>();

  const { isLoading: courseIsLoading } = useCourse(Number(courseId));
  const { isLoading: classIsLoading } = useClass(Number(classId));
  const { isLoading: challengeIsLoading } = useChallenge(Number(challengeId));

  return (
    <Suspense fallback={<GeneralLoading />}>
      {withConditionalRender(ChallengeInfo)({
        courseId,
        classId,
        challengeId,
        isLoading: courseIsLoading.read || classIsLoading.read || challengeIsLoading.read,
      })}
    </Suspense>
  );
}

export default function ChallengeRoutes() {
  return (
    <Switch>
      <Route path="/6a/my-class/:courseId/:classId/challenge/:challengeId" component={ChallengeInfoRoute} />
      <Route path="/6a/my-class/:courseId/:classId/challenge" component={ChallengeListRoute} />
      {/* TODO: add task, problem, essay, peer review, scoreboard routes */}
    </Switch>
  );
}
