import { Typography, makeStyles } from '@material-ui/core';
import moment from 'moment';
import { Link } from 'react-router-dom';

import AlignedText from '@/components/ui/AlignedText';
import SimpleBar from '@/components/ui/SimpleBar';
import useAccount from '@/lib/account/useAccount';

const useStyles = makeStyles((theme) => ({
  textLink: {
    textDecoration: 'none',
    color: theme.palette.primary.main,
  },
}));

export default function GraderInfo({ accountId, reviewedTime }: { accountId: number; reviewedTime: string }) {
  const classNames = useStyles();
  const { account } = useAccount(accountId);

  if (!account) {
    return <></>;
  }

  return (
    <SimpleBar title="Grader">
      <>
        <AlignedText text="Username" childrenType="text">
          <Typography variant="body1">
            <Link to={`/user-profile/${accountId}`} className={classNames.textLink}>
              {account.username}
            </Link>
          </Typography>
        </AlignedText>
        <AlignedText text="Student ID" childrenType="text">
          <Typography variant="body1">{account.student_id}</Typography>
        </AlignedText>
        <AlignedText text="Real Name" childrenType="text">
          <Typography variant="body1">{account.real_name}</Typography>
        </AlignedText>
        <AlignedText text="Reviewed Time" childrenType="text">
          <Typography variant="body1">{reviewedTime && moment(reviewedTime).format('YYYY-MM-DD, HH:mm:ss')}</Typography>
        </AlignedText>
      </>
    </SimpleBar>
  );
}
