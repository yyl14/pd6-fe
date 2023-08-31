import { Suspense, lazy } from 'react';
import { Route, Switch, useParams } from 'react-router-dom';

import GeneralLoading from '@/components/GeneralLoading';
import withConditionalRender from '@/components/hoc/withConditionalRender';
import useChallenge from '@/lib/challenge/useChallenge';
import useClass from '@/lib/class/useClass';
import useCourse from '@/lib/course/useCourse';
import useProblem from '@/lib/problem/useProblem';
import useSubmission from '@/lib/submission/useSubmission';

const ProblemMySubmissionList = lazy(
  () => import(/* webpackChunkName: "ProblemMySubmissionList" */ '@/pages/ProblemMySubmissionList'),
);
const SubmissionDetail = lazy(() => import(/* webpackChunkName: "SubmissionDetail" */ '@/pages/SubmissionDetail'));

function ProblemMySubmissionListRoute() {
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
      {withConditionalRender(ProblemMySubmissionList)({
        courseId,
        classId,
        challengeId,
        problemId,
        baseUrl: 'my-class',
        isLoading: courseIsLoading.read || classIsLoading.read || challengeIsLoading.read || problemIsLoading.read,
      })}
    </Suspense>
  );
}

function SubmissionDetailRoute() {
  const { courseId, classId, challengeId, problemId, submissionId } = useParams<{
    courseId: string;
    classId: string;
    challengeId: string;
    problemId: string;
    submissionId: string;
  }>();
  const { isLoading: courseLoading, error: courseError } = useCourse(Number(courseId));
  const { isLoading: classLoading, error: classError } = useClass(Number(classId));
  const { isLoading: challengeLoading, error: challengeError } = useChallenge(Number(challengeId));
  const { isLoading: problemLoading, error: problemError } = useProblem(Number(problemId));
  const { isLoading: submissionLoading, error: submissionError } = useSubmission(Number(submissionId));

  return (
    <Suspense fallback={<GeneralLoading />}>
      {withConditionalRender(SubmissionDetail)({
        courseId,
        classId,
        challengeId,
        problemId,
        submissionId,
        isLoading:
          courseLoading.read ||
          classLoading.read ||
          challengeLoading.read ||
          problemLoading.read ||
          submissionLoading.read,
        noMatch:
          courseError.read || classError.read || challengeError.read || problemError.read || submissionError.read,
      })}
    </Suspense>
  );
}

export default function ProblemMySubmissionRoutes() {
  return (
    <Switch>
      <Route
        path="/my-class/:courseId/:classId/challenge/:challengeId/problem/:problemId/my-submission/:submissionId"
        component={SubmissionDetailRoute}
      />
      <Route
        path="/my-class/:courseId/:classId/challenge/:challengeId/problem/:problemId/my-submission"
        component={ProblemMySubmissionListRoute}
      />
    </Switch>
  );
}
