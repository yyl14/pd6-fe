import { Suspense, lazy } from 'react';

import GeneralLoading from '@/components/GeneralLoading';
import withConditionalRender from '@/components/hoc/withConditionalRender';
import useAccount from '@/lib/account/useAccount';
import useUserId from '@/lib/user/useUserId';

const AccountSetting = lazy(() => import(/* webpackChunkName: "AccountSetting" */ '@/pages/AccountSetting'));

export default function MyProfileRoute() {
  const userId = useUserId();

  const { isLoading, error } = useAccount(userId);

  return (
    <Suspense fallback={<GeneralLoading />}>
      {withConditionalRender(AccountSetting)({
        accountId: userId,
        isAdmin: false,
        isLoading: isLoading.account,
        noMatch: !userId || error.account,
      })}
    </Suspense>
  );
}
