import { Typography } from '@material-ui/core';

import GeneralLoading from '@/components/GeneralLoading';
import NoMatch from '@/components/noMatch';
import AlignedText from '@/components/ui/AlignedText';
import PageTitle from '@/components/ui/PageTitle';
import SimpleBar from '@/components/ui/SimpleBar';
import useAccount from '@/lib/account/useAccount';

/* This is a level 3 component (page component) */

export default function Profile({ accountId }: { accountId: number }) {
  const { account, isLoading: accountIsLoading } = useAccount(accountId);

  if (account === undefined) {
    if (accountIsLoading.account) {
      return <GeneralLoading />;
    }
    return <NoMatch />;
  }

  return (
    <>
      <PageTitle text={`${account.username} / Profile`} />
      <SimpleBar title="Basic Information">
        <>
          <AlignedText text="Username" childrenType="text">
            <Typography variant="body1">{account.username}</Typography>
          </AlignedText>
          <AlignedText text="Real name" childrenType="text">
            <Typography variant="body1">{account.real_name}</Typography>
          </AlignedText>
          <AlignedText text="Nickname" childrenType="text">
            <Typography variant="body1">{account.nickname}</Typography>
          </AlignedText>
        </>
      </SimpleBar>
    </>
  );
}
