import { Route, Switch } from 'react-router-dom';
import useMyClassMiddleware from '../../../middleware/useMyClassMiddleware';
import ChallengeRoutes from './challenge';

export default function MyClassRoutes() {
  useMyClassMiddleware();

  return (
    <Switch>
      <Route path="/6a/my-class/:courseId/:problemId/challenge" component={ChallengeRoutes} />
      {/* TODO: submission, grade, team, member routes */}
    </Switch>
  );
}
