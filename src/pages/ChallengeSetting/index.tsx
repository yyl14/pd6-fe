import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Snackbar,
  Typography,
  makeStyles,
} from '@material-ui/core';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import moment from 'moment';
import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

import GeneralLoading from '@/components/GeneralLoading';
import NoMatch from '@/components/noMatch';
import AlignedText from '@/components/ui/AlignedText';
import PageTitle from '@/components/ui/PageTitle';
import SimpleBar from '@/components/ui/SimpleBar';
import useChallenge from '@/lib/challenge/useChallenge';
import useCourses from '@/lib/course/useCourses';
import useUserClasses from '@/lib/user/useUserClasses';

import ChallengeSettingEdit from './ChallengeSettingEdit';

const useStyles = makeStyles(() => ({
  duration: {
    transform: 'translateY(-3px)',
  },
}));

export default function ChallengeSetting({
  courseId,
  classId,
  challengeId,
}: {
  courseId: string;
  classId: string;
  challengeId: string;
}) {
  const className = useStyles();
  const history = useHistory();

  const { accountClasses } = useUserClasses();
  const { courses } = useCourses();
  const { challenge, isLoading: challengeLoading, deleteChallenge, error } = useChallenge(Number(challengeId));
  const [showSnackbar, setShowSnackbar] = useState<boolean>(false);

  const [classTitle, setClassTitle] = useState('');

  useEffect(() => {
    if (
      accountClasses &&
      courses &&
      accountClasses[Number(classId)] !== undefined &&
      courses[Number(courseId)] !== undefined
    ) {
      setClassTitle(`${courses[Number(courseId)].name} ${accountClasses[Number(classId)].class_name}`);
    }
  }, [accountClasses, classId, courses, courseId]);

  const [edit, setEdit] = useState(false);
  const [warningPopUp, setWarningPopUp] = useState(false);

  const handleDelete = async () => {
    try {
      await deleteChallenge();
      history.push(`/my-class/${courseId}/${classId}/challenge`);
    } catch {
      setShowSnackbar(true);
    }
  };

  if (challenge === undefined) {
    if (challengeLoading) {
      return <GeneralLoading />;
    }
    return <NoMatch />;
  }

  return (
    <>
      <PageTitle text={`${challenge.title} / Setting`} />
      {edit ? (
        <ChallengeSettingEdit challengeId={challengeId} setEdit={setEdit} />
      ) : (
        <>
          <Button onClick={() => setEdit(true)}>Edit</Button>

          <SimpleBar title="Information">
            <AlignedText text="Title" maxWidth="lg" childrenType="text">
              <Typography variant="body1">{challenge.title}</Typography>
            </AlignedText>
            <AlignedText text="Duration" maxWidth="lg" childrenType="text">
              <Typography variant="body1" className={className.duration}>
                {moment(challenge.start_time).format('YYYY/MM/DD HH:mm')}
                <ArrowRightIcon style={{ transform: 'translate(0, 5px)' }} />
                {moment(challenge.end_time).format('YYYY/MM/DD HH:mm')}
              </Typography>
            </AlignedText>
            <AlignedText text="Scored by" maxWidth="lg" childrenType="text">
              <Typography variant="body1">
                {challenge.selection_type === 'LAST' ? 'Last Score' : 'Best Score'}
              </Typography>
            </AlignedText>
            <AlignedText text="Shown in Problem Set" maxWidth="lg" childrenType="text">
              <Typography variant="body1">
                {challenge.publicize_type === 'START_TIME' ? 'On Start Time' : 'On End Time'}
              </Typography>
            </AlignedText>
          </SimpleBar>

          <SimpleBar
            title="Delete Challenge"
            childrenButtons={
              <>
                <Button color="secondary" onClick={() => setWarningPopUp(true)}>
                  Delete
                </Button>
              </>
            }
          >
            <Typography variant="body1">
              Once you delete a challenge, there is no going back. Please be certain.
            </Typography>
          </SimpleBar>
        </>
      )}
      <Dialog open={warningPopUp} onClose={() => setWarningPopUp(false)} fullWidth>
        <DialogTitle id="dialog-slide-title">
          <Typography variant="h4">Delete Challenge</Typography>
        </DialogTitle>
        <DialogContent>
          <AlignedText text="Class" maxWidth="lg" childrenType="text" textColor="secondary">
            <Typography variant="body1">{classTitle}</Typography>
          </AlignedText>
          <AlignedText text="Title" maxWidth="lg" childrenType="text" textColor="secondary">
            <Typography variant="body1">{challenge.title}</Typography>
          </AlignedText>
          <Typography variant="body2">
            Once you delete a challenge, there is no going back. Please be certain.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button color="default" onClick={() => setWarningPopUp(false)}>
            Cancel
          </Button>
          <Button color="secondary" onClick={handleDelete}>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
      <Snackbar
        open={showSnackbar}
        autoHideDuration={3000}
        onClose={() => {
          setShowSnackbar(false);
        }}
        message={`Error: ${error.read?.message}`}
      />
    </>
  );
}
