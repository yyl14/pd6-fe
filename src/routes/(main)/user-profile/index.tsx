import { Suspense, lazy } from 'react';
import { useParams } from 'react-router-dom';
import GeneralLoading from '../../../components/GeneralLoading';
import withConditionalRender from '../../../components/hoc/withConditionalRender';
import useAccount from '../../../lib/account/useAccount';

const UserProfile = lazy(() => import(/* webpackChunkName: "UserProfile" */ '../../../pages/UserProfile'));

export default function UserProfileRoute() {
  const { accountId } = useParams<{ accountId: string }>();
  const { isLoading } = useAccount(Number(accountId));

  return (
    <Suspense fallback={<GeneralLoading />}>
      {withConditionalRender(UserProfile)({ accountId: Number(accountId), isLoading: isLoading.account })}
    </Suspense>
  );
}
