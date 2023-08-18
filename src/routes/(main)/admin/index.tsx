import { Route, Switch } from 'react-router-dom';

import useAdminMiddleware from '@/middleware/useAdminMiddleware';

import SystemRoutes from './system';

export default function AdminRoutes() {
  useAdminMiddleware();

  return (
    <Switch>
      <Route path="/6a/admin/system" component={SystemRoutes} />
    </Switch>
  );
}
