import { Suspense, lazy } from 'react';
import { Route, Switch, useParams } from 'react-router-dom';

import GeneralLoading from '@/components/GeneralLoading';
import withConditionalRender from '@/components/hoc/withConditionalRender';
import useAccount from '@/lib/account/useAccount';

const AccountList = lazy(() => import('@/pages/AccountList'));
const AccountSetting = lazy(() => import('@/pages/AccountSetting'));

function AccountListRoute() {
  return (
    <Suspense fallback={<GeneralLoading />}>
      <AccountList />
    </Suspense>
  );
}

function AccountSettingRoute() {
  const { accountId } = useParams<{
    accountId: string;
  }>();

  const { isLoading, error } = useAccount(Number(accountId));

  return (
    <Suspense fallback={<GeneralLoading />}>
      {withConditionalRender(AccountSetting)({
        accountId: Number(accountId),
        isAdmin: true,
        isLoading: isLoading.account,
        noMatch: !accountId || error.account,
      })}
    </Suspense>
  );
}

export default function AccountRoutes() {
  return (
    <Switch>
      <Route exact path="/admin/account/account/:accountId/setting" component={AccountSettingRoute} />
      <Route exact path="/admin/account/account" component={AccountListRoute} />
    </Switch>
  );
}
