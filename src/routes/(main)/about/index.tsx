import { Route, Switch } from 'react-router-dom';

import NoMatch from '@/components/noMatch';

import TeamRoute from './team';

export default function AboutRoutes() {
  return (
    <Switch>
      <Route path="/6a/about/team" component={TeamRoute} />
      <Route path="/6a/about" component={NoMatch} />
    </Switch>
  );
}
