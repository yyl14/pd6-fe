import { Route, Switch } from 'react-router-dom';
import NoMatch from '../../../components/noMatch';
import Problem from './problem';

/* This is a level 2 container (role container) */
function ProblemSet() {
  return (
    <Switch>
      <Route exact path="/problem-set" component={Problem} />
      <Route path="/problem-set/:courseId/:classId" component={Problem} />
      <Route component={NoMatch} />
    </Switch>
  );
}

export default ProblemSet;
