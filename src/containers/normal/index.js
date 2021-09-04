import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';

import { Switch, Route, useHistory } from 'react-router-dom';

import MyClass from './myClass';
import AllClass from './allClass';
import ProblemSet from './problemSet';

import GeneralLoading from '../../components/GeneralLoading';
import NoMatch from '../../components/noMatch';
import Header from '../../components/ui/Header';
import Sidebar from '../../components/ui/Sidebar';

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
    <div>
      <Header role={user.role} hasClass={user.classes.length !== 0} />
      <Sidebar />
      <div className="layout-content-container">
        <div className="layout-content">
          <Switch>
            <Route path="/my-class/:courseId/:classId" component={MyClass} />
            <Route path="/all-class" component={AllClass} />
            <Route path="/problem-set" component={ProblemSet} />
            <Route exact path="/" component={GeneralLoading} />
            <Route component={NoMatch} />
          </Switch>
        </div>
      </div>
    </div>
  );
}
