import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button, TextField, makeStyles } from '@material-ui/core';
import moment from 'moment-timezone';

import { editChallenge } from '../../../../actions/myClass/challenge';
import RadioGroupForm from '../../../ui/RadioGroupForm';
import DateRangePicker from '../../../ui/DateRangePicker';
import AlignedText from '../../../ui/AlignedText';
import SimpleBar from '../../../ui/SimpleBar';

const useStyles = makeStyles((theme) => ({
  pageHeader: {
    marginBottom: '50px',
  },
  contentField: {
    width: '720px',
  },
  dateRangePicker: {
    marginTop: '15px',
    marginBottom: '16px',
  },
  buttons: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
}));

export default function SettingEdit({ challengeId, challenge, setEdit }) {
  const classes = useStyles();

  const dispatch = useDispatch();
  const authToken = useSelector((state) => state.auth.token);

  const [editTitle, setEditTitle] = useState(challenge.title);
  const [duration, setDuration] = useState([
    {
      startDate: moment(challenge.start_time).toDate(),
      endDate: moment(challenge.end_time).toDate(),
      key: 'selection',
    },
  ]);
  const [selectionType, setSelectionType] = useState(challenge.selection_type);
  const [publicizeType, setPublicizeType] = useState(challenge.publicize_type);

  const handleClickSave = () => {
    const body = {
      title: editTitle,
      start_time: duration[0].startDate.toISOString(),
      end_time: duration[0].endDate.toISOString(),
      publicize_type: publicizeType,
      selection_type: selectionType,
      description: challenge.description,
    };
    // console.log('call edit challenge api', challengeId, body);
    dispatch(editChallenge(authToken, challengeId, body));
    setEdit(false);
  };

  return (
    <>
      <SimpleBar title="Announcement">
        <AlignedText text="Title" childrenType="field">
          <TextField defaultValue={editTitle} onChange={(e) => setEditTitle(e.target.value)} />
        </AlignedText>
        <AlignedText text="Duration" childrenType="field">
          <DateRangePicker className={classes.dateRangePicker} value={duration} setValue={setDuration} />
        </AlignedText>
        <AlignedText text="Scored by" childrenType="radio">
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
        <AlignedText text="Shown in Problem Set" childrenType="radio">
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
      <div className={classes.buttons}>
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
