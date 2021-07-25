import React, { useState } from 'react';
import {
  Typography, Button, Grid,
  Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField,
} from '@material-ui/core';
import Divider from '@material-ui/core/Divider';

const ClassSetting = () => {
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
    <div className="class-setting">
      <Grid container className="class-setting-container" direction="column" justifyContent="center" alignItems="center">
        <Grid container item className="class-setting-col-top" xs={6} justifyContent="center">
          <Typography className="class-setting-title" variant="h3">PBC / 111-1 / Class Setting</Typography>
          <svg width="18" height="14" viewBox="0 0 18 14" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M3.75 7.885V10.885L9 13.75L14.25 10.885V7.885L9 10.75L3.75 7.885ZM9 0.25L0.75 4.75L9 9.25L15.75 5.5675V10.75H17.25V4.75L9 0.25Z" fill="#656565" />
          </svg>
          <Typography variant="h4">National Taiwan University</Typography>
        </Grid>
        <Grid container item className="class-setting-col-mid" xs={6} justifyContent="center">
          <Typography className="change-class-name-title" variant="h6">Change Class Name</Typography>
          <Button onClick={handleClick} color="secondary">Rename</Button>
          <Divider variant="fullWidth" style={{ width: '100%' }} />
          <Typography className="change-class-name-body" variant="body1">Once you change the class name, all related classes will be change their names. Please be certain.</Typography>
        </Grid>
        <Grid container item className="class-setting-col-bottom" xs={6} justifyContent="center">
          <Typography className="delete-class-title" variant="h6">Delete Class</Typography>
          <Button onClick={handleClickDelete} color="secondary">Delete</Button>
          <Divider variant="fullWidth" style={{ width: '100%' }} />
          <Typography className="delete-class-body" variant="body1">Once you delete a class, there is no going back. Please be certain.</Typography>
        </Grid>
      </Grid>

      {/* Rename class form dialog */}
      <Dialog
        open={popUp}
        keepMounted
        onClose={handleClosePopUp}
      >
        <DialogTitle>
          <Typography variant="h4">Rename class</Typography>
        </DialogTitle>
        <DialogContent>
          <Grid container className="rename-class-form" direction="row" justifyContent="center" alignContent="center">
            <Grid container item className="rename-class-form-left" xs={6}>
              <Typography variant="body1">Type</Typography>
              <Typography variant="body1">Course</Typography>
              <Typography variant="body1" color="secondary">Current Name</Typography>
              <Typography variant="body1">New Name</Typography>
            </Grid>
            <Grid container item className="rename-class-form-right" xs={6}>
              <Typography variant="body1">Type</Typography>
              <Typography variant="body1">Course</Typography>
              <Typography variant="body1" color="secondary">Current Name</Typography>
              <TextField
                autoFocus
                id="new-class-name"
                fullWidth
                variant="outlined"
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogContent>
          <Typography variant="body2">Once you change class name, all related information will be affected. Please be certain.</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClosePopUp}>Cancel</Button>
          <Button onClick={(e) => handleSubmit()} color="secondary">Rename</Button>
        </DialogActions>
      </Dialog>

      {/* Delete dialog */}
      <Dialog
        open={popUpDelete}
        keepMounted
        onClose={handleClosePopUpDelete}
      >
        <DialogTitle>
          <Typography variant="h4">Delete class</Typography>
        </DialogTitle>
        <DialogContent>
          <Grid container className="delete-class-detail" direction="row" justifyContent="center" alignContent="center">
            <Grid container item className="delete-class-detail-left" xs={6}>
              <Typography variant="body1">Type</Typography>
              <Typography variant="body1">Course</Typography>
              <Typography variant="body1" color="secondary">Class</Typography>
            </Grid>
            <Grid container item className="delete-class-detail-right" xs={6}>
              <Typography variant="body1">Type</Typography>
              <Typography variant="body1">Course</Typography>
              <Typography variant="body1" color="secondary">Current Name</Typography>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogContent>
          <Typography variant="body2">Once you delete a class, there is no going back. Please be certain.</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClosePopUpDelete}>Cancel</Button>
          <Button onClick={(e) => handleSubmitDelete()} color="secondary">Delete</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default ClassSetting;
