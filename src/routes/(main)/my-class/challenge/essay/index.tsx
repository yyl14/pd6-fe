import { Suspense, lazy } from 'react';
import { Route, Switch, useParams } from 'react-router-dom';

import GeneralLoading from '@/components/GeneralLoading';
import withConditionalRender from '@/components/hoc/withConditionalRender';
import useChallenge from '@/lib/challenge/useChallenge';
import useClass from '@/lib/class/useClass';
import useCourse from '@/lib/course/useCourse';
import useEssay from '@/lib/essay/useEssay';

const Essay = lazy(() => import('@/pages/Essay'));

function EssayRoute() {
  const { courseId, classId, challengeId, essayId } = useParams<{
    courseId: string;
    classId: string;
    challengeId: string;
    essayId: string;
  }>();

  const { isLoading: courseIsLoading, error: courseError } = useCourse(Number(courseId));
  const { isLoading: classIsLoading, error: classError } = useClass(Number(classId));
  const { isLoading: challengeIsLoading, error: challengeError } = useChallenge(Number(challengeId));
  const { isLoading: essayIsLoading, error: essayError } = useEssay(Number(essayId));

  return (
    <Suspense fallback={<GeneralLoading />}>
      {withConditionalRender(Essay)({
        courseId,
        classId,
        challengeId,
        essayId,
        isLoading: courseIsLoading.read || classIsLoading.read || challengeIsLoading.read || essayIsLoading.read,
        noMatch:
          !courseId ||
          !classId ||
          !challengeId ||
          !essayId ||
          courseError.read ||
          classError.read ||
          challengeError.read ||
          essayError.read,
      })}
    </Suspense>
  );
}

export default function EssayRoutes() {
  return (
    <Switch>
      <Route exact path="/my-class/:courseId/:classId/challenge/:challengeId/essay/:essayId" component={EssayRoute} />
    </Switch>
  );
}
