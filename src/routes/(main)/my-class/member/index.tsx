import { Suspense, lazy } from 'react';
import { Route, Switch, useParams } from 'react-router-dom';

import GeneralLoading from '@/components/GeneralLoading';
import withConditionalRender from '@/components/hoc/withConditionalRender';
import useClass from '@/lib/class/useClass';
import useCourse from '@/lib/course/useCourse';

const ClassMemberList = lazy(() => import('@/pages/ClassMemberList'));

function ClassMemberListRoute() {
  const { courseId, classId } = useParams<{ courseId: string; classId: string }>();

  const { isLoading: courseIsLoading } = useCourse(Number(courseId));
  const { isLoading: classIsLoading } = useClass(Number(classId));

  return (
    <Suspense fallback={<GeneralLoading />}>
      {withConditionalRender(ClassMemberList)({
        courseId,
        classId,
        isAdmin: false,
        isLoading: courseIsLoading.read || classIsLoading.read,
      })}
    </Suspense>
  );
}

export default function MemberRoutes() {
  return (
    <Switch>
      <Route exact path="/my-class/:courseId/:classId/member" component={ClassMemberListRoute} />
    </Switch>
  );
}
