import { Suspense, lazy } from 'react';
import { Route, Switch, useParams } from 'react-router-dom';

import GeneralLoading from '@/components/GeneralLoading';
import withConditionalRender from '@/components/hoc/withConditionalRender';
import useClass from '@/lib/class/useClass';
import useCourse from '@/lib/course/useCourse';
import useTeam from '@/lib/team/useTeam';

const TeamList = lazy(() => import('@/pages/TeamList'));
const TeamDetail = lazy(() => import('@/pages/TeamDetail'));

function TeamListRoute() {
  const { courseId, classId } = useParams<{ courseId: string; classId: string }>();

  const { isLoading: courseIsLoading, error: courseError } = useCourse(Number(courseId));
  const { isLoading: classIsLoading, error: classError } = useClass(Number(classId));

  return (
    <Suspense fallback={<GeneralLoading />}>
      {withConditionalRender(TeamList)({
        courseId,
        classId,
        isLoading: courseIsLoading.read || classIsLoading.read,
        noMatch: !courseId || !classId || classError.read || courseError.read,
      })}
    </Suspense>
  );
}

function TeamDetailRoute() {
  const { courseId, classId, teamId } = useParams<{ courseId: string; classId: string; teamId: string }>();

  const { isLoading: classIsLoading, error: classError } = useClass(Number(classId));
  const { isLoading: teamIsLoading, error: teamError } = useTeam(Number(teamId));

  return (
    <Suspense fallback={<GeneralLoading />}>
      {withConditionalRender(TeamDetail)({
        courseId,
        classId,
        teamId,
        isLoading: classIsLoading.read || teamIsLoading.read,
        noMatch: !courseId || !classId || !teamId || classError.read || teamError.read,
      })}
    </Suspense>
  );
}

export default function TeamRoutes() {
  return (
    <Switch>
      <Route exact path="/6a/my-class/:courseId/:classId/team" component={TeamListRoute} />
      <Route path="/6a/my-class/:courseId/:classId/team/:teamId" component={TeamDetailRoute} />
    </Switch>
  );
}
