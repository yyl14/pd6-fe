import { Button, Snackbar, TextField, makeStyles } from '@material-ui/core';
import moment from 'moment';
import { useState } from 'react';

import AlignedText from '@/components/ui/AlignedText';
import DateRangePicker from '@/components/ui/DateRangePicker';
import RadioGroupForm from '@/components/ui/RadioGroupForm';
import SimpleBar from '@/components/ui/SimpleBar';
import useChallenge from '@/lib/challenge/useChallenge';

const useStyles = makeStyles(() => ({
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

export default function ChallengeSettingEdit({
  challengeId,
  setEdit,
}: {
  challengeId: string;
  setEdit: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const className = useStyles();

  const { challenge, editChallenge, error } = useChallenge(Number(challengeId));
  const [showSnackbar, setShowSnackbar] = useState<boolean>(false);

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

  const handleClickSave = async () => {
    try {
      await editChallenge({
        challenge_id: Number(challengeId),
        title: editTitle,
        start_time: duration[0].startDate.toISOString(),
        end_time: duration[0].endDate.toISOString(),
        publicize_type: publicizeType,
        selection_type: selectionType,
      });

      setEdit(false);
    } catch {
      setShowSnackbar(true);
    }
  };

  return (
    <>
      <SimpleBar title="Information">
        <AlignedText text="Title" childrenType="field" maxWidth="lg">
          <TextField defaultValue={editTitle} onChange={(e) => setEditTitle(e.target.value)} />
        </AlignedText>
        <AlignedText text="Duration" childrenType="field" maxWidth="lg">
          <DateRangePicker
            className={className.dateRangePicker}
            value={duration}
            setValue={setDuration}
            vertical={false}
          />
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
