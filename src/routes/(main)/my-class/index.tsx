import { Route, Switch } from 'react-router-dom';

import useMyClassMiddleware from '@/middleware/useMyClassMiddleware';

import ChallengeRoutes from './challenge';
import SubmissionRoutes from './submission';

export default function MyClassRoutes() {
  useMyClassMiddleware();

  return (
    <Switch>
      <Route path="/6a/my-class/:courseId/:problemId/challenge" component={ChallengeRoutes} />
      <Route path="/6a/my-class/:courseId/:problemId/submission" component={SubmissionRoutes} />
      {/* TODO: submission, grade, team, member routes */}
    </Switch>
  );
}
