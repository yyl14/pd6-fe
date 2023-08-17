import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography, TextField, makeStyles } from '@material-ui/core';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import moment from 'moment';
import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

import GeneralLoading from '@/components/GeneralLoading';
import NoMatch from '@/components/noMatch';
import AlignedText from '@/components/ui/AlignedText';
import PageTitle from '@/components/ui/PageTitle';
import SimpleBar from '@/components/ui/SimpleBar';
import DateRangePicker from '@/components/ui/DateRangePicker';
import RadioGroupForm from '@/components/ui/RadioGroupForm';
import useChallenge from '@/lib/challenge/useChallenge';
import useUserClasses from '@/lib/user/useUserClasses';
import useCourses from '@/lib/course/useCourses';

const useStylesEdit = makeStyles(() => ({
  dateRangePicker: {
    width: '44vw',
    marginTop: '15px',
    marginBottom: '0px',
  },
  buttons: {
    display: 'flex',
    justifyContent: 'flex-end',
    marginTop: '-10px',
    marginRight: '-5px',
  },
}));

function ChallengeSettingEdit({
  challengeId,
  setEdit
}: {
  challengeId: string;
  setEdit: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const className = useStylesEdit();

  const { challenge, editChallenge, isLoading: challengeLoading } = useChallenge(Number(challengeId));

  const [editTitle, setEditTitle] = useState(challenge?.title);
  const [duration, setDuration] = useState([
    {
      startDate: moment(challenge?.start_time).toDate(),
      endDate: moment(challenge?.end_time).toDate(),
      key: 'selection',
    },
  ]);
  const [selectionType, setSelectionType] = useState(challenge?.selection_type);
  const [publicizeType, setPublicizeType] = useState(challenge?.publicize_type);
  const [hasRequest, setHasRequest] = useState(false);

  const handleClickSave = async () => {
    const res = editChallenge({
      challenge_id: Number(challengeId), 
      title: editTitle,
      start_time: duration[0].startDate.toISOString(),
      end_time: duration[0].endDate.toISOString(),
      publicize_type: publicizeType,
      selection_type: selectionType
    });

    if((await res).ok){
      setHasRequest(true);
    }
  };

  useEffect(() => {
    if (hasRequest && !challengeLoading.edit) {
      setHasRequest(false);
      setEdit(false);
    }
  }, [challengeLoading, hasRequest, setEdit]);

  return (
    <>
      <SimpleBar title="Information">
        <AlignedText text="Title" childrenType="field" maxWidth="lg">
          <TextField defaultValue={editTitle} onChange={(e) => setEditTitle(e.target.value)} />
        </AlignedText>
        <AlignedText text="Duration" childrenType="field" maxWidth="lg">
          <DateRangePicker className={className.dateRangePicker} value={duration} setValue={setDuration} vertical={false}/>
        </AlignedText>
        <AlignedText text="Scored by" childrenType="radio" maxWidth="lg">
          <RadioGroupForm
            options={[
              {
                label: 'Last Score',
                value: 'LAST',
              },
              {
                label: 'Best Score',
                value: 'BEST',
              },
            ]}
            selectedValue={selectionType}
            setSelectedValue={setSelectionType}
            flexDirection="row"
          />
        </AlignedText>
        <AlignedText text="Shown in Problem Set" childrenType="radio" maxWidth="lg">
          <RadioGroupForm
            options={[
              {
                label: 'On Start Time',
                value: 'START_TIME',
              },
              {
                label: 'On End Time',
                value: 'END_TIME',
              },
            ]}
            selectedValue={publicizeType}
            setSelectedValue={setPublicizeType}
            flexDirection="row"
          />
        </AlignedText>
      </SimpleBar>
      <div className={className.buttons}>
        <Button
          onClick={() => {
            setEdit(false);
          }}
        >
          Cancel
        </Button>
        <Button color="primary" onClick={handleClickSave}>
          Save
        </Button>
      </div>
    </>
  );
}

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
  const { challenge, isLoading: challengeLoading, deleteChallenge } = useChallenge(Number(challengeId));

  const [classTitle, setClassTitle] = useState('');

  useEffect(() => {
    if (accountClasses && courses && accountClasses[Number(classId)] !== undefined && courses[Number(courseId)] !== undefined) {
      setClassTitle(`${courses[Number(courseId)].name} ${accountClasses[Number(classId)].class_name}`);
    }
  }, [accountClasses, classId, courses, courseId]);

  const [edit, setEdit] = useState(false);
  const [warningPopUp, setWarningPopUp] = useState(false);

  const handleDelete = async () => {
    const res = deleteChallenge();
    if((await res).ok){
      history.push(`/my-class/${courseId}/${classId}/challenge`);
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
    </>
  );
}
