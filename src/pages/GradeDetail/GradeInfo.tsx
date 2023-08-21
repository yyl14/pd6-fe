import { Button, Typography, makeStyles } from '@material-ui/core';
import moment from 'moment-timezone';
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

interface GradeInfoProps {
  grade: {
    id: number;
    score: string;
    comment: string;
    update_time: string;
    title: string;
  };
  receiver: GradeAccountInfo;
  isManager: boolean;
  handleEdit: () => void;
}

export default function GradeInfo({ grade, receiver, isManager, handleEdit }: GradeInfoProps) {
  const classNames = useStyles();

  return (
    <div>
      <SimpleBar
        title="Grade Information"
        buttons={
          isManager ? (
            <>
              <Button onClick={() => handleEdit()}>Edit</Button>
            </>
          ) : null
        }
      >
        <>
          <AlignedText text="Username" maxWidth="lg" childrenType="text">
            <Typography variant="body1">
              <Link to={`/user-profile/${receiver.id}`} className={classNames.textLink}>
                {receiver.username}
              </Link>
            </Typography>
          </AlignedText>
          <AlignedText text="Student ID" maxWidth="lg" childrenType="text">
            <Typography variant="body1">{receiver.student_id}</Typography>
          </AlignedText>
          <AlignedText text="Real Name" maxWidth="lg" childrenType="text">
            <Typography variant="body1">{receiver.real_name}</Typography>
          </AlignedText>
          <AlignedText text="Title" maxWidth="lg" childrenType="text">
            <Typography variant="body1">{grade.title}</Typography>
          </AlignedText>
          <AlignedText text="Score" maxWidth="lg" childrenType="text">
            <Typography variant="body1">{grade.score}</Typography>
          </AlignedText>
          <AlignedText text="Comment" maxWidth="lg" childrenType="text">
            <Typography variant="body1">{grade.comment}</Typography>
          </AlignedText>
          <AlignedText text="Submitted Time" maxWidth="lg" childrenType="text">
            <Typography variant="body1">{moment(grade.update_time).format('YYYY-MM-DD, HH:mm:ss')}</Typography>
          </AlignedText>
        </>
      </SimpleBar>
    </div>
  );
}
