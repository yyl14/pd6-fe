import React, { useState } from 'react';
import {
  Button, TextField, Typography, makeStyles,
} from '@material-ui/core';
import Divider from '@material-ui/core/Divider';

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
      <Typography variant="h4">This is Announcement Add</Typography>

      {/* TODO: re-write with ui components SimpleBar and DatePicker  */}
      {/* <Button>Cancel</Button>
    <Button color="primary">Save</Button>
    <form>
      <p>Title</p>
      <TextField />
      <p>Duration</p>
      <p>place for DateRangePicker</p>
      <p>Content</p>
      <TextField />
    </form> */}
    </>
  );
};

export default AnnouncementAdd;
