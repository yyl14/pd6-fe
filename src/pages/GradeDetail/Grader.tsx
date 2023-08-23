import { Typography, makeStyles } from '@material-ui/core';
import { Link } from 'react-router-dom';

import AlignedText from '@/components/ui/AlignedText';
import SimpleBar from '@/components/ui/SimpleBar';

import { GradeAccountInfo } from './types';

const useStyles = makeStyles((theme) => ({
  textLink: {
    textDecoration: 'none',
    color: theme.palette.primary.main,
  },
}));

export default function Grader({ id, username, student_id, real_name }: GradeAccountInfo) {
  const classNames = useStyles();

  return (
    <>
      <SimpleBar title="Grader">
        <AlignedText text="Username" maxWidth="lg" childrenType="text">
          <Typography variant="body1">
            <Link to={`/user-profile/${id}`} className={classNames.textLink}>
              {username}
            </Link>
          </Typography>
        </AlignedText>
        <AlignedText text="Student ID" maxWidth="lg" childrenType="text">
          <Typography variant="body1">{student_id}</Typography>
        </AlignedText>
        <AlignedText text="Real Name" maxWidth="lg" childrenType="text">
          <Typography variant="body1">{real_name}</Typography>
        </AlignedText>
      </SimpleBar>
    </>
  );
}
