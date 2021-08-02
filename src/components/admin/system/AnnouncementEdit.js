import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import {
  Typography,
  Button,
  Grid,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
  makeStyles,
} from '@material-ui/core';
import Divider from '@material-ui/core/Divider';
import SimpleBar from '../../ui/SimpleBar';
import DateRangePicker from '../../ui/DateRangePicker';
import AlignedText from '../../ui/AlignedText';

const useStyles = makeStyles((theme) => ({
  pageHeader: {
    marginBottom: '50px',
  },
}));

const AnnouncementEdit = () => {
  const classes = useStyles();
  const history = useHistory();
  const handleClickSave = () => {
    history.push('/admin/system/announcement/:announcementId/setting');
  };
  const [state, setState] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: 'selection',
    },
  ]);
  /* This is a level 4 component (page component) */
  return (
    <>
      {/* TODO: Announcement name depends on route */}
      {/* TODO: re-write with ui components SimpleBar and DatePicker  */}
      <Typography variant="h3" className={classes.pageHeader}>
        Announcement: 管院停電 / Setting
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
      <Button>Cancel</Button>
      <Button color="primary" onClick={handleClickSave}>Save</Button>
    </>
  );
};

export default AnnouncementEdit;
