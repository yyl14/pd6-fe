import { Route, Switch } from 'react-router-dom';
import NoMatch from '../../../components/noMatch';
import SubmissionDetail from '../../../components/normal/myClass/Submission/SubmissionDetail';
import SubmissionList from '../../../components/normal/myClass/Submission/SubmissionList';

/* This is a level 3 container (main page container) */
export default function Submission() {
  return (
    <>
      <Switch>
        <Route exact path="/my-class/:courseId/:classId/submission" component={SubmissionList} />
        <Route path="/my-class/:courseId/:classId/submission/:submissionId" component={SubmissionDetail} />
        <Route component={NoMatch} />
      </Switch>
    </>
  );
}
