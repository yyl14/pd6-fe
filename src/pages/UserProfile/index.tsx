import { Typography } from '@material-ui/core';

import AlignedText from '@/components/AlignedText';
import PageTitle from '@/components/PageTitle';
import SimpleBar from '@/components/SimpleBar';
import useAccount from '@/lib/account/useAccount';

export default function UserProfile({ accountId }: { accountId: number }) {
  const { account: user } = useAccount(accountId);
  return (
    <>
      <PageTitle text={`${user?.username} / Profile`} />
      <SimpleBar title="Basic Information">
        <>
          <AlignedText text="Username" childrenType="text">
            <Typography variant="body1">{user?.username}</Typography>
          </AlignedText>
          <AlignedText text="Real name" childrenType="text">
            <Typography variant="body1">{user?.real_name}</Typography>
          </AlignedText>
          <AlignedText text="Nickname" childrenType="text">
            <Typography variant="body1">{user?.nickname}</Typography>
          </AlignedText>
        </>
      </SimpleBar>
    </>
  );
}
