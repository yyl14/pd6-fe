import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import {
  Button, TextField, Typography, makeStyles,
} from '@material-ui/core';
import Divider from '@material-ui/core/Divider';
import DateRangePicker from '../../ui/DateRangePicker';
import SimpleBar from '../../ui/SimpleBar';
import AlignedText from '../../ui/AlignedText';

const useStyles = makeStyles((theme) => ({
  pageHeader: {
    marginBottom: '50px',
  },
}));

/* This is a level 4 component (page component) */
const AnnouncementAdd = () => {
  const history = useHistory();
  const handleClickSave = () => {
    history.push('/admin/system/announcement/:announcementId/setting');
  };
  const classes = useStyles();
  const [state, setState] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: 'selection',
    },
  ]);
  return (
    <>
      <Typography variant="h3" className={classes.pageHeader}>
        (Draft) / Setting
      </Typography>
      <SimpleBar
        title="Announcement"
      >
        <AlignedText text="Title" childrenType="field">
          <TextField />
        </AlignedText>
        <AlignedText text="Duration" childrenType="field">
          <DateRangePicker value={state} setValue={setState} />
        </AlignedText>
        <AlignedText text="Content" childrenType="field">
          <TextField />
        </AlignedText>
      </SimpleBar>
      {/* TODO: re-write with ui components SimpleBar and DatePicker  */}
      <Button>Cancel</Button>
      <Button color="primary" onClick={handleClickSave}>Save</Button>
    </>
  );
};

export default AnnouncementAdd;
