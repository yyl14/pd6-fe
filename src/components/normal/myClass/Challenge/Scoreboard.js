import { Route, Switch } from 'react-router-dom';
import NoMatch from '../../../noMatch';
import ScoreboardInfo from './ScoreboardSettings/ScoreboardInfo';

export default function Scoreboard() {
  return (
    <>
      <Switch>
        <Route
          exact
          path="/my-class/:courseId/:classId/challenge/:challengeId/scoreboard/:scoreboardId"
          component={ScoreboardInfo}
        />
        <Route component={NoMatch} />
      </Switch>
    </>
  );
}
