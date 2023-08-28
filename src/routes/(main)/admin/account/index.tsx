import { Route, Switch } from 'react-router-dom';



import InstituteRoutes from './institute';

export default function AccountRoutes() {
  return (
    <Switch>
      <Route path="/6a/admin/account/institute/" component={InstituteRoutes} />
    </Switch>
  );
}