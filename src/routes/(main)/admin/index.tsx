import { Route, Switch } from 'react-router-dom';

import useAdminMiddleware from '@/middleware/useAdminMiddleware';

import CourseAndClassRoutes from './course';
import SystemRoutes from './system';

export default function AdminRoutes() {
  useAdminMiddleware();

  return (
    <Switch>
      <Route path="/6a/admin/course" component={CourseAndClassRoutes} />
      <Route path="/6a/admin/system" component={SystemRoutes} />
    </Switch>
  );
}
