import { Suspense, lazy } from 'react';
import { Route, Switch, useParams } from 'react-router-dom';

import GeneralLoading from '@/components/GeneralLoading';
import withConditionalRender from '@/components/hoc/withConditionalRender';
import useClass from '@/lib/class/useClass';
import useCourse from '@/lib/course/useCourse';
import useGrade from '@/lib/grade/useGrade';

const GradeList = lazy(() => import(/* webpackChunkName: "GradeList" */ '@/pages/GradeList'));
const GradeDetail = lazy(() => import(/* webpackChunkName: "GradeDetail" */ '@/pages/GradeDetail'));

function GradeListRoute() {
  const { courseId, classId } = useParams<{ courseId: string; classId: string }>();

  const { isLoading: courseIsLoading, error: courseError } = useCourse(Number(courseId));
  const { isLoading: classIsLoading, error: classError } = useClass(Number(classId));

  return (
    <Suspense fallback={<GeneralLoading />}>
      {withConditionalRender(GradeList)({
        courseId,
        classId,
        isLoading: courseIsLoading.read || classIsLoading.read,
        noMatch: !courseId || !classId || classError.read || courseError.read,
      })}
    </Suspense>
  );
}

function GradeDetailRoute() {
  const { courseId, classId, gradeId } = useParams<{ courseId: string; classId: string; gradeId: string }>();

  const { isLoading: classIsLoading, error: classError } = useClass(Number(classId));
  const { isLoading: gradeIsLoading, error: gradeError } = useGrade(Number(gradeId));

  return (
    <Suspense fallback={<GeneralLoading />}>
      {withConditionalRender(GradeDetail)({
        courseId,
        classId,
        gradeId,
        isLoading: classIsLoading.read || gradeIsLoading.read,
        noMatch: !courseId || !classId || !gradeId || classError.read || gradeError.read,
      })}
    </Suspense>
  );
}

export default function GradeRoutes() {
  return (
    <Switch>
      <Route exact path="/my-class/:courseId/:classId/grade" component={GradeListRoute} />
      <Route path="/my-class/:courseId/:classId/grade/:gradeId" component={GradeDetailRoute} />
    </Switch>
  );
}
