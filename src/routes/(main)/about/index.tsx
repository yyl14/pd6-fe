import { Route, Switch } from 'react-router-dom';

import GeneralLoading from '@/components/GeneralLoading';
import useAboutMiddleware from '@/middleware/useAboutMiddleware';

import SystemRoute from './system';
import TeamRoute from './team';

export default function AboutRoutes() {
  useAboutMiddleware();

  return (
    <Switch>
      <Route path="/about/team" component={TeamRoute} />
      <Route path="/about/system" component={SystemRoute} />
      <Route path="/about" component={GeneralLoading} />
    </Switch>
  );
}
