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
      <Route path="/6a/admin/course" component={CourseAndClassRoutes} />
      <Route path="/6a/admin/account" component={AccountRoutes} />
      <Route path="/6a/admin/system" component={SystemRoutes} />
      <Route component={NoMatch} />
    </Switch>
  );
}
