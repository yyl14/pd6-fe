import { Suspense, lazy } from 'react';
import { Route, Switch, useParams } from 'react-router-dom';

import GeneralLoading from '@/components/GeneralLoading';
import withConditionalRender from '@/components/hoc/withConditionalRender';
import useChallenge from '@/lib/challenge/useChallenge';
import useClass from '@/lib/class/useClass';
import useCourse from '@/lib/course/useCourse';
import useProblem from '@/lib/problem/useProblem';

import CodeSubmissionRoute from './code-submission';
import ProblemMySubmissionRoutes from './my-submission';

const ProblemInfo = lazy(() => import('@/pages/ProblemInfo'));

function ProblemInfoRoute() {
  const { courseId, classId, challengeId, problemId } = useParams<{
    courseId: string;
    classId: string;
    challengeId: string;
    problemId: string;
  }>();

  const { isLoading: courseIsLoading } = useCourse(Number(courseId));
  const { isLoading: classIsLoading } = useClass(Number(classId));
  const { isLoading: challengeIsLoading } = useChallenge(Number(challengeId));
  const { isLoading: problemIsLoading } = useProblem(Number(problemId));

  return (
    <Suspense fallback={<GeneralLoading />}>
      {withConditionalRender(ProblemInfo)({
        courseId,
        classId,
        challengeId,
        problemId,
        isLoading: courseIsLoading.read || classIsLoading.read || challengeIsLoading.read || problemIsLoading.read,
      })}
    </Suspense>
  );
}

export default function ProblemRoutes() {
  return (
    <Switch>
      <Route
        path="/my-class/:courseId/:classId/challenge/:challengeId/problem/:problemId/code-submission"
        component={CodeSubmissionRoute}
      />
      <Route
        path="/my-class/:courseId/:classId/challenge/:challengeId/problem/:problemId/my-submission"
        component={ProblemMySubmissionRoutes}
      />
      <Route
        path="/my-class/:courseId/:classId/challenge/:challengeId/problem/:problemId"
        component={ProblemInfoRoute}
      />
    </Switch>
  );
}
