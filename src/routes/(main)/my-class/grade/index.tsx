import { Suspense, lazy } from 'react';
import { Route, Switch, useParams } from 'react-router-dom';

import GeneralLoading from '@/components/GeneralLoading';
import withConditionalRender from '@/components/hoc/withConditionalRender';
import useClass from '@/lib/class/useClass';
import useCourse from '@/lib/course/useCourse';
import useGrade from '@/lib/grade/useGrade';

const GradeList = lazy(() => import('@/pages/GradeList'));
const GradeDetail = lazy(() => import('@/pages/GradeDetail'));

function GradeListRoute() {
  const { courseId, classId } = useParams<{ courseId: string; classId: string }>();

  const { isLoading: courseIsLoading } = useCourse(Number(courseId));
  const { isLoading: classIsLoading } = useClass(Number(classId));

  return (
    <Suspense fallback={<GeneralLoading />}>
      {withConditionalRender(GradeList)({
        courseId,
        classId,
        isLoading: courseIsLoading.read || classIsLoading.read,
      })}
    </Suspense>
  );
}

function GradeDetailRoute() {
  const { classId, gradeId } = useParams<{ classId: string; gradeId: string }>();

  const { isLoading: classIsLoading } = useClass(Number(classId));
  const { isLoading: gradeIsLoading } = useGrade(Number(gradeId));

  return (
    <Suspense fallback={<GeneralLoading />}>
      {withConditionalRender(GradeDetail)({
        classId,
        gradeId,
        isLoading: classIsLoading.read || gradeIsLoading.read,
      })}
    </Suspense>
  );
}

export default function GradeRoutes() {
  return (
    <Switch>
      <Route exact path="/6a/my-class/:courseId/:classId/grade" component={GradeListRoute} />
      <Route path="/6a/my-class/:courseId/:classId/grade/:gradeId" component={GradeDetailRoute} />
    </Switch>
  );
}
