import { Suspense, lazy } from 'react';
import { Route, Switch } from 'react-router-dom';

import GeneralLoading from '@/components/GeneralLoading';
import NoMatch from '@/components/noMatch';

import SubmitLangSettingRoute from './setting';

const SubmitLang = lazy(() => import('@/pages/SubmitLang'));

function SubmitLangRoute() {
  return (
    <Suspense fallback={<GeneralLoading />}>
      <SubmitLang />
    </Suspense>
  );
}

export default function SubmitLangRoutes() {
  return (
    <Switch>
      <Route exact path="/admin/system/submitlang/:submitlangId/setting" component={SubmitLangSettingRoute} />
      <Route exact path="/admin/system/submitlang" component={SubmitLangRoute} />
      <Route component={NoMatch} />
    </Switch>
  );
}
