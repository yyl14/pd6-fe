import { Suspense, lazy } from 'react';
import { Route, Switch, useParams } from 'react-router-dom';

import GeneralLoading from '@/components/GeneralLoading';
import withConditionalRender from '@/components/hoc/withConditionalRender';
import type { RouteParamsType } from '@/pages/Scoreboard';

const Scoreboard = lazy(() => import('@/pages/Scoreboard'));

function ScoreboardRoute() {
  const { courseId, classId, challengeId, scoreboardId } = useParams<RouteParamsType>();

  return (
    <Suspense fallback={<GeneralLoading />}>
      {withConditionalRender(Scoreboard)({
        courseId,
        classId,
        challengeId,
        scoreboardId,
        isLoading: false,
      })}
    </Suspense>
  );
}

export default function ScoreboardRoutes() {
  return (
    <Switch>
      <Route
        path="/6a/my-class/:courseId/:classId/challenge/:challengeId/scoreboard/:scoreboardId"
        component={ScoreboardRoute}
      />
    </Switch>
  );
}
