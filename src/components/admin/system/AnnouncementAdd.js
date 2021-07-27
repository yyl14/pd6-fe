import React, { useState } from 'react';
import { Button, TextField } from '@material-ui/core';
import Divider from '@material-ui/core/Divider';

const AnnouncementAdd = () => (
  <div>
    <h1>Create an Announcement</h1>
    <h3>Announcement</h3>
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
