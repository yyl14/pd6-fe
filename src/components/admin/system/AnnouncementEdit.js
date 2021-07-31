import React, { useState } from 'react';
import {
  Typography, Button, Grid,
  Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField,
} from '@material-ui/core';
import Divider from '@material-ui/core/Divider';

const AnnouncementEdit = () => {
  const [popUp, setPopUp] = useState(false);
  const [popUpDelete, setPopUpDelete] = useState(false);
  const handleClick = () => {
    setPopUp(true);
  };
  const handleClosePopUp = () => {
    setPopUp(false);
  };
  const handleSubmit = (e) => {

  };

  const handleClickDelete = () => {
    setPopUpDelete(true);
  };
  const handleClosePopUpDelete = () => {
    setPopUpDelete(false);
  };
  const handleSubmitDelete = (e) => {

  };

  return (
    <div>
      <h1>管院停電 / Announcement Setting</h1>
      <Typography className="announcement-title" variant="h6">Announcement</Typography>
      <Button>Cancel</Button>
      <Button color="primary">Save</Button>
      <form>
        <p>Data should be fetched from database and displayed automatically.</p>
        <p>Title</p>
        <TextField />
        <p>Duration</p>
        <p>place for DateRangePicker</p>
        <p>Content</p>
        <TextField />
      </form>

      <Typography className="delete-announcement-title" variant="h6">Delete Announcement</Typography>
      <Button color="secondary" onClick={handleClickDelete}>Delete</Button>
      <Typography className="delete-announcement-body" variant="body1">Once you delete this announcement, there is no going back. Please be certain.</Typography>

      {/* Delete dialog */}
      <Dialog
        open={popUpDelete}
        keepMounted
        onClose={handleClosePopUpDelete}
      >
        <DialogTitle>
          <Typography variant="h4">Delete Announcement</Typography>
        </DialogTitle>
        <DialogContent>
          <Grid container className="delete-announcement-detail" direction="row" justifyContent="center" alignContent="center">
            <Grid container item className="delete-Announcement-detail-title" xs={6}>
              <Typography variant="body1" color="secondary">Title</Typography>
            </Grid>
            <Grid container item className="delete-class-detail-content" xs={6}>
              <Typography variant="body1" color="secondary">管院停電</Typography>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogContent>
          <Typography variant="body2">Once you delete an announcement, there is no going back. Please be certain.</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClosePopUpDelete}>Cancel</Button>
          <Button onClick={(e) => handleSubmitDelete()} color="secondary">Delete</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default AnnouncementEdit;
