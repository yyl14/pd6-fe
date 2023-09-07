import { Suspense, lazy } from 'react';
import { Route, Switch, useParams } from 'react-router-dom';

import GeneralLoading from '@/components/GeneralLoading';
import withConditionalRender from '@/components/hoc/withConditionalRender';
import useQuery from '@/hooks/useQuery';
import useChallenge from '@/lib/challenge/useChallenge';
import useClass from '@/lib/class/useClass';
import useCourse from '@/lib/course/useCourse';
import useProblem from '@/lib/problem/useProblem';
import useSubmission from '@/lib/submission/useSubmission';

const SubmissionList = lazy(() => import(/* webpackChunkName: "SubmissionList" */ '@/pages/SubmissionList'));
const SubmissionDetail = lazy(() => import(/* webpackChunkName: "SubmissionDetail" */ '@/pages/SubmissionDetail'));

function SubmissionListRoute() {
  const { courseId, classId } = useParams<{ courseId: string; classId: string }>();

  const { isLoading: courseIsLoading } = useCourse(Number(courseId));
  const { isLoading: classIsLoading } = useClass(Number(classId));

  return (
    <Suspense fallback={<GeneralLoading />}>
      {withConditionalRender(SubmissionList)({
        courseId,
        classId,
        isLoading: courseIsLoading.read || classIsLoading.read,
      })}
    </Suspense>
  );
}

function SubmissionDetailRoute() {
  const { courseId, classId, submissionId } = useParams<{
    courseId: string;
    classId: string;
    submissionId: string;
  }>();

  const [query] = useQuery();
  const challengeId = query.get('challengeId');
  const problemId = query.get('problemId');

  const { isLoading: courseLoading, error: courseError } = useCourse(Number(courseId));
  const { isLoading: classLoading, error: classError } = useClass(Number(classId));
  const { submission, isLoading: submissionLoading, error: submissionError } = useSubmission(Number(submissionId));
  const {
    problem,
    isLoading: problemLoading,
    error: problemError,
  } = useProblem(problemId ? Number(problemId) : submission?.problem_id);
  const {
    challenge,
    isLoading: challengeLoading,
    error: challengeError,
  } = useChallenge(challengeId ? Number(challengeId) : problem?.challenge_id);

  return (
    <Suspense fallback={<GeneralLoading />}>
      {withConditionalRender(SubmissionDetail)({
        courseId,
        classId,
        challengeId: challengeId || String(challenge?.id),
        problemId: problemId || String(problem?.id),
        submissionId,
        isLoading:
          courseLoading.read ||
          classLoading.read ||
          !challenge ||
          challengeLoading.read ||
          !problem ||
          problemLoading.read ||
          submissionLoading.read,
        noMatch:
          courseError.read || classError.read || challengeError.read || problemError.read || submissionError.read,
      })}
    </Suspense>
  );
}

export default function SubmissionRoutes() {
  return (
    <Switch>
      <Route path="/my-class/:courseId/:classId/submission/:submissionId" component={SubmissionDetailRoute} />
      <Route path="/my-class/:courseId/:classId/submission" component={SubmissionListRoute} />
    </Switch>
  );
}
