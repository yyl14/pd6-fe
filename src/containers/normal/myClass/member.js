import { Route, Switch } from 'react-router-dom';
import NoMatch from '../../../components/noMatch';
import MemberList from '../../../components/normal/myClass/Member/MemberList';

/* This is a level 3 container (main page container) */
export default function Member() {
  return (
    <>
      <Switch>
        <Route path="/my-class/:courseId/:classId/member" component={MemberList} />
        <Route component={NoMatch} />
      </Switch>
    </>
  );
}
