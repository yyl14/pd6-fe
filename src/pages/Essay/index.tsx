import AlignedText from '@/components/ui/AlignedText';
import PageTitle from '@/components/ui/PageTitle';
import Icon from '@/components/ui/icon/index';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Typography,
  makeStyles,
  withStyles,
} from '@material-ui/core';
import { useState } from 'react';
import { useDispatch } from 'react-redux';

import useEssayEssaySubmissions from '@/lib/essaySubmission/useEssayEssaySubmissions';
import EssayEdit from '../EssayEdit/EssayEdit';
import EssayInfo from './EssayInfo';

import useChallenge from '@/lib/challenge/useChallenge';
import useClass from '@/lib/class/useClass';
import useCourse from '@/lib/course/useCourse';
import useEssay from '@/lib/essay/useEssay';

const useStyles = makeStyles(() => ({
  generalButtons: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
}));

const StyledButton = withStyles({
  outlined: {
    '& path': {
      fill: 'none !important',
    },
  },
})(Button);

export default function Essay({
  courseId,
  classId,
  challengeId,
  essayId,
}: {
  courseId: string;
  classId: string;
  challengeId: string;
  essayId: string;
}) {
  const classNames = useStyles();

  const dispatch = useDispatch();

  const [role, setRole] = useState('Normal');
  const [edit, setEdit] = useState(false);
  const [emailSentPopup, setEmailSentPopup] = useState(false);

  const { course: courseInfo } = useCourse(Number(courseId));
  const { class: classInfo } = useClass(Number(classId));
  const { challenge: challengeInfo } = useChallenge(Number(challengeId));
  const { essay: essayInfo } = useEssay(Number(essayId));

  const { downloadAllSubmissions } = useEssayEssaySubmissions(Number(essayId));

  const handleCloseEdit = () => {
    setEdit(false);
  };

  const [popup, setPopup] = useState(false);

  const handleClickDownload = () => {
    setPopup(true);
  };
  const handleClosePopUp = () => {
    setPopup(false);
  };

  const handleDownload = () => {
    downloadAllSubmissions();
    setEmailSentPopup(true);
  };

  return (
    <>
      <PageTitle text={`${challengeInfo?.title} / ${essayInfo?.challenge_label}`} />
      {!edit && role === 'MANAGER' && (
        <div className={classNames.managerButtons}>
          <Button onClick={() => setEdit(true)}>Edit</Button>
          <StyledButton variant="outlined" component="span" startIcon={<Icon.Download />} onClick={handleClickDownload}>
            Download
          </StyledButton>
        </div>
      )}
      {edit ? (
        <EssayEdit
          courseId={courseId}
          classId={classId}
          challengeId={challengeId}
          essayId={essayId}
          closeEdit={handleCloseEdit}
        />
      ) : (
        <EssayInfo courseId={courseId} classId={classId} challengeId={challengeId} essayId={essayId} role={role} />
      )}
      {/* Upload dialog */}
      <Dialog open={popup} keepMounted onClose={handleClosePopUp} maxWidth="md">
        <DialogTitle>
          <Typography variant="h4">Download All Files</Typography>
        </DialogTitle>
        <DialogContent>
          <AlignedText text="Class" childrenType="text">
            <Typography>{`${courseInfo?.name} ${classInfo?.name}`}</Typography>
          </AlignedText>
          <AlignedText text="Challenge" childrenType="text">
            <Typography>{challengeInfo?.title}</Typography>
          </AlignedText>
          <AlignedText text="Task Label" childrenType="text">
            <Typography>{essayInfo?.challenge_label}</Typography>
          </AlignedText>
          <AlignedText text="Download Options" childrenType="text">
            <Typography>All users&apos; last submissioin</Typography>
          </AlignedText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => handleClosePopUp()}>Cancel</Button>
          <Button onClick={() => handleDownload()} color="primary">
            Download
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog open={emailSentPopup} keepMounted onClose={() => setEmailSentPopup(false)}>
        <DialogTitle id="alert-dialog-slide-title">
          <Typography variant="h4">All Essay Submissions sent</Typography>
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">Please check your mailbox.</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setEmailSentPopup(false)} color="primary">
            Done
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
