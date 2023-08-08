import { Route, Switch } from 'react-router-dom';
import IconRoute from './icon';
import UIComponentRoute from './ui-component';

export default function DemoRoutes() {
  return (
    <Switch>
      <Route path="/6a/icon" component={IconRoute} />
      <Route path="/6a/ui-component" component={UIComponentRoute} />
    </Switch>
  );
}
