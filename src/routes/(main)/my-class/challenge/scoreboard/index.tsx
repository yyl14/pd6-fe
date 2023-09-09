import { Suspense, lazy } from 'react';
import { Route, Switch, useParams } from 'react-router-dom';

import GeneralLoading from '@/components/GeneralLoading';
import withConditionalRender from '@/components/hoc/withConditionalRender';

const Scoreboard = lazy(() => import(/* webpackChunkName: "Scoreboard" */ '@/pages/Scoreboard'));

function ScoreboardRoute() {
  const { courseId, classId, challengeId, scoreboardId } = useParams<{
    courseId: string;
    classId: string;
    challengeId: string;
    scoreboardId: string;
  }>();

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
        path="/my-class/:courseId/:classId/challenge/:challengeId/scoreboard/:scoreboardId"
        component={ScoreboardRoute}
      />
    </Switch>
  );
}
