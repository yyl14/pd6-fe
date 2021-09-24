import React from 'react';
import { Switch, Route } from 'react-router-dom';
import MySubmissionList from '../../components/account/mySubmission/SubmissionList';
import SubmissionDetail from '../../components/normal/myClass/Challenge/SubmissionDetail';
import NoMatch from '../../components/noMatch';

import Header from '../../components/ui/Header';
import Sidebar from '../../components/ui/Sidebar';

export default function Submission() {
  return (
    <>
      <Header />
      <Switch>
        <Route exact path="/my-submission">
          <div className="layout-content-container-no-sidebar">
            <div className="layout-content">
              <MySubmissionList />
            </div>
          </div>
        </Route>
        <Route exact path="/my-submission/:courseId/:classId/challenge/:challengeId/:problemId/my-submission/:submissionId">
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
