import { Route, Switch } from 'react-router-dom';
import useProblemSetMiddleware from '../../../middleware/useProblemSetMiddleware';

export default function ProblemSetRoutes() {
  useProblemSetMiddleware();

  return (
    <Switch>
      <Route path="/6a/problem-set/:courseId/:classId" />
    </Switch>
  );
}
