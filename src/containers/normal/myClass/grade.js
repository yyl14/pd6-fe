import { Route, Switch } from 'react-router-dom';

import NoMatch from '@/components/noMatch';
import GradeDetail from '@/components/normal/myClass/Grade/GradeDetail';
import GradeList from '@/components/normal/myClass/Grade/GradeList';

/* This is a level 3 container (main page container) */
export default function Grade() {
  return (
    <>
      <Switch>
        <Route exact path="/my-class/:courseId/:classId/grade" component={GradeList} />
        <Route path="/my-class/:courseId/:classId/grade/:gradeId" component={GradeDetail} />
        <Route component={NoMatch} />
      </Switch>
    </>
  );
}
