import React from 'react';
import { Switch, Route } from 'react-router-dom';
import MySubmission from '../../components/account/mySubmission/MySubmission';
import SubmissionDetail from '../../components/normal/allClass/Challenge/SubmissionDetail';
import NoMatch from '../../components/noMatch';

import Sidebar from '../../components/ui/Sidebar';
import Header from '../../components/ui/Header';

export default function Submission() {
  return (
    <>
      <Header />
      <Switch>
        <Route exact path="/my-submission">
          <div className="layout-content-container layout-content-container-no-sidebar">
            <div className="layout-content">
              <MySubmission />
            </div>
          </div>
        </Route>
        <Route exact path="/my-submission/:submissionId">
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
