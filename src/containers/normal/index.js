import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Route, Switch, useHistory } from 'react-router-dom';

import GeneralLoading from '@/components/GeneralLoading';
import NoMatch from '@/components/noMatch';
import Team from '@/components/normal/about/team';

import MyClass from './myClass';
import ProblemSet from './problemSet';

export default function Normal() {
  const history = useHistory();
  const auth = useSelector((state) => state.auth);
  const user = useSelector((state) => state.user);

  useEffect(() => {
    if (auth.isAuthenticated) {
      if (user.role.indexOf('NORMAL') === -1) {
        // not system normal
        history.push('/notFound');
      }
    }
  }, [auth.isAuthenticated, history, user.role]);

  return (
    <Switch>
      {/* For redirection */}
      <Route exact path="/my-class" component={MyClass} />
      <Route path="/my-class/:courseId/:classId" component={MyClass} />
      <Route exact path="/problem-set" component={ProblemSet} />
      <Route path="/problem-set/:courseId/:classId" component={ProblemSet} />
      <Route exact path="/" component={GeneralLoading} />
      <Route exact path="/about" component={Team} />
      <Route exact path="/about/team" component={Team} />
      <Route component={NoMatch} />
    </Switch>
  );
}
