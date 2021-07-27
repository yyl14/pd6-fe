import React, { useState } from 'react';
import { Button, TextField, Typography } from '@material-ui/core';
import Divider from '@material-ui/core/Divider';

const AnnouncementAdd = () => (
  <div>
    <h1>Create an Announcement</h1>
    <Typography className="announcement-title" variant="h6">Announcement</Typography>
    <Button>Cancel</Button>
    <Button color="primary">Save</Button>
    <form>
      <p>Title</p>
      <TextField />
      <p>Duration</p>
      <p>place for DateRangePicker</p>
      <p>Content</p>
      <TextField />
    </form>
  </div>
);

export default AnnouncementAdd;
