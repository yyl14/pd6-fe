import { Typography } from '@material-ui/core';

import GeneralLoading from '@/components/GeneralLoading';
import NoMatch from '@/components/noMatch';
import AlignedText from '@/components/ui/AlignedText';
import PageTitle from '@/components/ui/PageTitle';
import SimpleBar from '@/components/ui/SimpleBar';
import useReduxStateShape from '@/hooks/useReduxStateShape';
import useAccount from '@/lib/account/useAccount';

import { AccountInfo } from './types';

/* This is a level 3 component (page component) */

export default function Profile({ accountId }: { accountId: string }) {
  const { account, isLoading: accountIsLoading } = useAccount(Number(accountId));
  const [accountById] = useReduxStateShape<AccountInfo>(account);
  // const accounts = useSelector((state) => state.accounts.byId);
  // const loading = useSelector((state) => state.loading.user.user);

  if (accountById[accountId] === undefined) {
    if (accountIsLoading.account) {
      return <GeneralLoading />;
    }
    return <NoMatch />;
  }

  return (
    <>
      <PageTitle text={`${accountById[accountId].username} / Profile`} />
      <SimpleBar title="Basic Information">
        <>
          <AlignedText text="Username" childrenType="text">
            <Typography variant="body1">{accountById[accountId].username}</Typography>
          </AlignedText>
          <AlignedText text="Real name" childrenType="text">
            <Typography variant="body1">{accountById[accountId].real_name}</Typography>
          </AlignedText>
          <AlignedText text="Nickname" childrenType="text">
            <Typography variant="body1">{accountById[accountId].nickname}</Typography>
          </AlignedText>
        </>
      </SimpleBar>
    </>
  );
}
