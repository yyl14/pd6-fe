import { Route, Switch } from 'react-router-dom';

import SubmissionDetail from '@/components/account/mySubmission/SubmissionDetail';
import SubmissionList from '@/components/account/mySubmission/SubmissionList';
import NoMatch from '@/components/noMatch';

export default function MySubmission() {
  return (
    <>
      <Switch>
        <Route exact path="/my-submission" component={SubmissionList} />
        <Route
          path="/my-submission/:courseId/:classId/:challengeId/:problemId/:submissionId"
          component={SubmissionDetail}
        />
        <Route component={NoMatch} />
      </Switch>
    </>
  );
}
