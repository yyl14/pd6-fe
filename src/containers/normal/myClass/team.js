import { Route, Switch } from 'react-router-dom';
import NoMatch from '../../../components/noMatch';
import TeamDetail from '../../../components/normal/myClass/Team/TeamDetail';
import TeamList from '../../../components/normal/myClass/Team/TeamList';

/* This is a level 3 container (main page container) */
export default function Team() {
  return (
    <>
      <Switch>
        <Route exact path="/my-class/:courseId/:classId/team" component={TeamList} />
        <Route path="/my-class/:courseId/:classId/team/:teamId" component={TeamDetail} />
        <Route component={NoMatch} />
      </Switch>
    </>
  );
}
