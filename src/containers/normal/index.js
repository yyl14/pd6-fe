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
import system from './system';
import About from './about';
import AccessLog from './accessLog';

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
            {/* For redirection */}
            <Route exact path="/my-class" component={MyClass} />
            <Route path="/my-class/:courseId/:classId" component={MyClass} />
            <Route path="/all-class" component={AllClass} />
            <Route exact path="/problem-set" component={ProblemSet} />
            <Route path="/problem-set/:courseId/:classId" component={ProblemSet} />
            <Route exact path="/" component={GeneralLoading} />
            <Route exact path="/system" component={system} />
            <Route exact path="/system/about" component={About} />
            <Route exact path="/system/accesslog" component={AccessLog} />
            <Route component={NoMatch} />
          </Switch>
        </div>
      </div>
    </div>
  );
}
