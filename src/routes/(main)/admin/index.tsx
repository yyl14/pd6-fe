import { Route, Switch } from 'react-router-dom';

import NoMatch from '@/components/noMatch';
import useAdminMiddleware from '@/middleware/useAdminMiddleware';

import AccountRoutes from './account';
import CourseAndClassRoutes from './course';
import SystemRoutes from './system';

export default function AdminRoutes() {
  useAdminMiddleware();

  return (
    <Switch>
      <Route path="/admin/course" component={CourseAndClassRoutes} />
      <Route path="/admin/account" component={AccountRoutes} />
      <Route path="/admin/system" component={SystemRoutes} />
      <Route component={NoMatch} />
    </Switch>
  );
}
