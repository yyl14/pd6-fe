import { Route, Switch } from 'react-router-dom';

import AccountRoutes from './account';
import InstituteRoutes from './institute';

export default function AccountAndInstituteRoutes() {
  return (
    <Switch>
      <Route path="/6a/admin/account/institute/" component={InstituteRoutes} />
      <Route path="/6a/admin/account/account/" component={AccountRoutes} />
    </Switch>
  );
}
