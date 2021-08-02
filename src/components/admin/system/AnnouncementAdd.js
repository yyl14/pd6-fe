import React, { useState } from 'react';
import {
  Button, TextField, Typography, makeStyles,
} from '@material-ui/core';
import Divider from '@material-ui/core/Divider';
import DateRangePicker from '../../ui/DateRangePicker';
import SimpleBar from '../../ui/SimpleBar';

const useStyles = makeStyles((theme) => ({
  pageHeader: {
    marginBottom: '50px',
  },
}));

/* This is a level 4 component (page component) */
const AnnouncementAdd = () => {
  const classes = useStyles();
  return (
    <>
      <Typography variant="h3" className={classes.pageHeader}>
        Announcement: (Draft) / Setting
      </Typography>
      <h1>Announcement</h1>
      {/* TODO: re-write with ui components SimpleBar and DatePicker  */}
      <Button>Cancel</Button>
      <Button color="primary">Save</Button>

    </>
  );
};

export default AnnouncementAdd;
