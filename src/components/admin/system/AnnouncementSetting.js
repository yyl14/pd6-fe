import React, { useState } from 'react';
import {
  Typography, Button, Grid,
  Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField,
} from '@material-ui/core';
import { connect } from 'react-redux';
import {
  withRouter, Switch, Route, useHistory,
} from 'react-router-dom';

const AnnouncementSetting = () => {
  const [popUpDelete, setPopUpDelete] = useState(false);

  const handleClickDelete = () => {
    setPopUpDelete(true);
  };
  const handleClosePopUpDelete = () => {
    setPopUpDelete(false);
  };
  const handleSubmitDelete = (e) => {

  };

  const history = useHistory();
  const handleClickEdit = () => {
    history.push('/admin/system/announcement/setting/edit');
  };

  return (
    <div>
      <h1>管院停電 / Announcement Setting</h1>
      <Typography className="announcement-title" variant="h6">Announcement</Typography>
      <Button onClick={handleClickEdit}>Edit</Button>
      <Typography className="delete-announcement-title" variant="h6">Delete Announcement</Typography>
      <Typography className="delete-announcement-body" variant="body1">Once you delete this announcement, there is no going back. Please be certain.</Typography>
      <Button color="secondary" onClick={handleClickDelete}>Delete</Button>

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

export default AnnouncementSetting;
