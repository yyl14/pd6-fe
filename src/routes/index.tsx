import { Suspense, lazy } from 'react';
import { useClearCacheCtx } from 'react-clear-cache';
import { Route, Switch } from 'react-router-dom';

import FullPageLoading from '@/components/FullPageLoading';

import AuthRoutes from './(auth)';
import DemoRoutes from './(demo)';
import MainRoutes from './(main)';

const ClearCache = lazy(() => import('@/pages/ClearCache'));

export default function RootRoute() {
  const { isLatestVersion } = useClearCacheCtx();

  if (!isLatestVersion) {
    return (
      <Suspense fallback={<FullPageLoading />}>
        <ClearCache />
      </Suspense>
    );
  }

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
