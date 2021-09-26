import React from 'react';
import { Switch, Route } from 'react-router-dom';
import SubmissionList from '../../components/account/mySubmission/SubmissionList';
import SubmissionDetail from '../../components/account/mySubmission/SubmissionDetail';
import NoMatch from '../../components/noMatch';

import Sidebar from '../../components/ui/Sidebar';
import Header from '../../components/ui/Header';

export default function MySubmission() {
  return (
    <>
      <Header />
      <Switch>
        <Route exact path="/my-submission">
          <div className="layout-content-container layout-content-container-no-sidebar">
            <div className="layout-content">
              <SubmissionList />
            </div>
          </div>
        </Route>
        <Route path="/my-submission/:courseId/:classId/:challengeId/:problemId/:submissionId">
          <Sidebar />
          <div className="layout-content-container">
            <div className="layout-content">
              <SubmissionDetail />
            </div>
          </div>
        </Route>
        <Route component={NoMatch} />
      </Switch>
    </>
  );
}
