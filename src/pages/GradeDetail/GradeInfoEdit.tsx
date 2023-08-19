import { Button, Snackbar, TextField, Typography, makeStyles } from '@material-ui/core';
import moment from 'moment-timezone';
import { useState } from 'react';
import { Link } from 'react-router-dom';

import AlignedText from '@/components/ui/AlignedText';
import SimpleBar from '@/components/ui/SimpleBar';
import useGrade from '@/lib/grade/useGrade';

import { User } from './types';

const useStyles = makeStyles((theme) => ({
  textFieldComment: {
    width: '44vw',
  },
  textLink: {
    textDecoration: 'none',
    color: theme.palette.primary.main,
  },
  buttons: {
    marginTop: '12px',
    marginLeft: '-5px',
  },
}));

interface GradeInfoEditProps {
  grade: {
    id: number;
    score: string;
    comment: string;
    update_time: string;
    title: string;
  };
  receiver: User;
  handleBack: () => void;
}

export default function BasicInfoEdit({ grade, receiver, handleBack }: GradeInfoEditProps) {
  const classNames = useStyles();
  const { editGrade, error } = useGrade(grade.id);

  const [score, setScore] = useState<string>(grade.score);
  const [comment, setComment] = useState<string>(grade.comment);
  const [showSnackBar, setShowSnackBar] = useState(false);

  const handleSave = async () => {
    if (score !== '' && (score !== grade.score || comment !== grade.comment)) {
      try {
        await editGrade({
          grade_id: grade.id,
          score,
          comment,
        });
        handleBack();
      } catch {
        setShowSnackBar(true);
      }
    }
  };

  return (
    <div>
      <SimpleBar title="Grade Information">
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
          <AlignedText text="Score" maxWidth="lg" childrenType="field">
            <TextField value={score} onChange={(e) => setScore(e.target.value)} />
          </AlignedText>
          <AlignedText text="Comment" maxWidth="lg" childrenType="field">
            <TextField
              className={classNames.textFieldComment}
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              multiline
            />
          </AlignedText>
          <AlignedText text="Submitted Time" maxWidth="lg" childrenType="text">
            <Typography variant="body1">{moment(grade.update_time).format('YYYY-MM-DD, HH:mm:ss')}</Typography>
          </AlignedText>
          <div className={classNames.buttons}>
            <Button onClick={() => handleBack()}>Cancel</Button>
            <Button color="primary" type="submit" onClick={handleSave}>
              Save
            </Button>
          </div>
        </>
      </SimpleBar>
      <Snackbar open={showSnackBar} onClose={() => setShowSnackBar(false)} message={`Error: ${error.edit?.message}`} />
    </div>
  );
}
