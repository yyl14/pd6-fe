import { Route, Switch } from 'react-router-dom';

import useMyClassMiddleware from '@/middleware/useMyClassMiddleware';

import ChallengeRoutes from './challenge';
import GradeRoutes from './grade';
import MemberRoutes from './member';
import SubmissionRoutes from './submission';
import TeamRoutes from './team';

export default function MyClassRoutes() {
  useMyClassMiddleware();

  return (
    <Switch>
      <Route path="/6a/my-class/:courseId/:classId/challenge" component={ChallengeRoutes} />
      <Route path="/6a/my-class/:courseId/:classId/submission" component={SubmissionRoutes} />
      <Route path="/6a/my-class/:courseId/:classId/grade" component={GradeRoutes} />
      <Route path="/6a/my-class/:courseId/:classId/team" component={TeamRoutes} />
      <Route path="/6a/my-class/:courseId/:classId/member" component={MemberRoutes} />
    </Switch>
  );
}
