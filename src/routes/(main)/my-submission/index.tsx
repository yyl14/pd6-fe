import { Suspense, lazy } from 'react';
import { Route, Switch, useParams } from 'react-router-dom';

import GeneralLoading from '@/components/GeneralLoading';
import withConditionalRender from '@/components/hoc/withConditionalRender';
import useChallenge from '@/lib/challenge/useChallenge';
import useClass from '@/lib/class/useClass';
import useCourse from '@/lib/course/useCourse';
import useProblem from '@/lib/problem/useProblem';
import useSubmission from '@/lib/submission/useSubmission';

const MySubmission = lazy(() => import(/* webpackChunkName: "MySubmission" */ '@/pages/MySubmissionList'));
const SubmissionDetail = lazy(() => import(/* webpackChunkName: "SubmissionDetail" */ '@/pages/SubmissionDetail'));

function MySubmissionRoute() {
  return (
    <Suspense fallback={<GeneralLoading />}>
      <MySubmission />
    </Suspense>
  );
}

function MySubmissionSubmissionDetailRoute() {
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

export default function MySubmissionRoutes() {
  return (
    <Switch>
      <Route
        path="/6a/my-submission/:courseId/:classId/:challengeId/:problemId/:submissionId"
        component={MySubmissionSubmissionDetailRoute}
      />
      <Route path="/6a/my-submission" component={MySubmissionRoute} />
    </Switch>
  );
}
