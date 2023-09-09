import { Suspense, lazy } from 'react';
import { Route, Switch, useParams } from 'react-router-dom';

import GeneralLoading from '@/components/GeneralLoading';
import withConditionalRender from '@/components/hoc/withConditionalRender';
import useClass from '@/lib/class/useClass';
import useCourse from '@/lib/course/useCourse';
import useProblemSetMiddleware from '@/middleware/useProblemSetMiddleware';

import ChallengeRoutes from './challenge';

const ProblemList = lazy(() => import(/* webpackChunkName: "ProblemList" */ '@/pages/ProblemList'));

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
      <Route path="/problem-set/:courseId/:classId/challenge" component={ChallengeRoutes} />
      <Route path="/problem-set/:courseId/:classId" component={ProblemListRoute} />
      <Route path="/problem-set" component={GeneralLoading} />
    </Switch>
  );
}
