import { Route, Switch } from 'react-router-dom';

import AuthRoutes from './(auth)';
import DemoRoutes from './(demo)';
import MainRoutes from './(main)';

export default function RootRoute() {
  return (
    <Switch>
      <Route
        path={[
          '/6a/login',
          '/6a/email-verification',
          '/6a/forget-username',
          '/6a/forget-password',
          '/6a/reset-password',
          '/6a/register',
        ]}
        component={AuthRoutes}
      />
      <Route path={['/6a/icon', '/6a/ui-component']} component={DemoRoutes} />
      <Route path="/6a" component={MainRoutes} />
    </Switch>
  );
}
