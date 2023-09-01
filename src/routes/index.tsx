import { Route, Switch } from 'react-router-dom';

import AuthRoutes from './(auth)';
import DemoRoutes from './(demo)';
import MainRoutes from './(main)';

export default function RootRoute() {
  return (
    <Switch>
      <Route
        path={['/login', '/email-verification', '/forget-username', '/forget-password', '/reset-password', '/register']}
        component={AuthRoutes}
      />
      <Route path={['/icon', '/ui-component']} component={DemoRoutes} />
      <Route path="/" component={MainRoutes} />
    </Switch>
  );
}
