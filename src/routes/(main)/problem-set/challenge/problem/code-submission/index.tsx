import { Suspense, lazy } from 'react';
import { useHistory, useParams } from 'react-router-dom';

import GeneralLoading from '@/components/GeneralLoading';
import withConditionalRender from '@/components/hoc/withConditionalRender';
import useChallenge from '@/lib/challenge/useChallenge';
import useClass from '@/lib/class/useClass';
import useCourse from '@/lib/course/useCourse';
import useProblem from '@/lib/problem/useProblem';

const CodeSubmission = lazy(() => import('@/pages/CodeSubmission'));

export default function CodeSubmissionRoute() {
  const history = useHistory();

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
      {withConditionalRender(CodeSubmission)({
        challengeId,
        problemId,
        handleSubmissionSuccess: () => {
          history.push(
            `/problem-set/${courseId}/${classId}/challenge/${challengeId}/problem/${problemId}/my-submission`,
          );
        },
        handleCancel: () =>
          history.push(`/problem-set/${courseId}/${classId}/challenge/${challengeId}/problem/${problemId}`),
        isLoading: courseIsLoading.read || classIsLoading.read || challengeIsLoading.read || problemIsLoading.read,
      })}
    </Suspense>
  );
}
