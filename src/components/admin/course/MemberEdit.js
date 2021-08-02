import React, { useState } from 'react';
import {
  Typography,
  Button,
  Grid,
  Card,
  CardContent,
  TextField,
  InputBase,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  makeStyles,
} from '@material-ui/core';
import SchoolIcon from '@material-ui/icons/School';

// TODO: use makestyles() to do layout
const useStyles = makeStyles((theme) => ({}));

/* This is a level 4 component (page component) */
const MemberEdit = (props) => {
  // TODO: initialize field content with redux state
  const classes = useStyles();
  const [TA, setTA] = useState(props.TAList);
  const [student, setStudent] = useState(props.studentList);
  const [guest, setGuest] = useState(props.guestList);

  const [popUpUnsave, setPopUpUnsave] = useState(false);
  const [popUpSave, setPopUpSave] = useState(false);
  const handleChangeTA = (e) => {
    /* if(){

    } */
    setTA(e.target.value);
  };

  const handleChangeStudent = (e) => {
    /* if(){

    } */
    setStudent(e.target.value);
  };
  const handleChangeGuest = (e) => {
    /* if(){

    } */
    setGuest(e.target.value);
  };
  const handleClickCancel = () => {
    /* if(){
      setPopUpUnsave(true);
    }
    else{
      setPopUpSave(true);
    } */
    setPopUpSave(true);
  };

  const handleClosePopUpUnsave = () => {
    setPopUpUnsave(false);
  };
  const handleSubmitUnsave = () => {
    setPopUpUnsave(false);
    props.backToClassInfo();
  };

  const handleClosePopUpSave = () => {
    setPopUpSave(false);
  };
  const handleSubmitSave = () => {
    setPopUpSave(false);
    props.backToClassInfo();
    // and sth.....
  };

  return (
    <div>
      <Typography variant="h4">Member edit</Typography>
      {/* TODO: rewrite the editor with <div />'s, use redux state, actions, and remove title */}
      {/* <Grid container item className="member-edit-container" direction="column" justifyContent="center" alignItems="center" xs={12}>
        <Grid container item className="member-edit-col-top" direction="column" justifyContent="center" alignItems="flex-start">
          <Typography variant="h3">PBC / 111-1 / Member</Typography>
          <Grid container item direction="row" justifyContent="flex-start" alignItems="center" spacing={1}>
            <Grid item><SchoolIcon color="action" /></Grid>
            <Grid item><Typography variant="h4">National Taiwan University</Typography></Grid>
          </Grid>
        </Grid>
        <Card className="member-edit-form" variant="outlined" style={{ width: '1280px', height: '716px' }}>
          <Grid container item direction="row" alignItems="center" justifyContent="center" spacing={6} style={{ width: '100%', height: '110%' }}>
            <Grid container item direction="column" alignItem="center" justifyContent="center" style={{ width: '350px' }} spacing={2}>
              <Grid item><Typography variant="body1">TA</Typography></Grid>
              <Grid item><Typography variant="caption">List of student ID</Typography></Grid>
              <Grid item>
                <TextField
                  defaultValue={TA}
                  onChange={(e) => handleChangeTA(e)}
                />
              </Grid>
            </Grid>
            <Grid container item direction="column" alignItem="center" justifyContent="center" style={{ width: '350px' }} spacing={2}>
              <Grid item><Typography variant="body1">Student</Typography></Grid>
              <Grid item><Typography variant="caption">List of student ID</Typography></Grid>
              <Grid item>
                <TextField
                  defaultValue={student}
                  onChange={(e) => handleChangeStudent(e)}
                />
              </Grid>
            </Grid>
            <Grid container item direction="column" alignItem="center" justifyContent="center" style={{ width: '350px' }} spacing={2}>
              <Grid item><Typography variant="body1">Guest</Typography></Grid>
              <Grid item><Typography variant="caption">List of student ID</Typography></Grid>
              <Grid item>
                <TextField
                  defaultValue={guest}
                  onChange={(e) => handleChangeGuest(e)}
                />
              </Grid>

            </Grid>
          </Grid>
        </Card>
        <Grid container item className="member-edit-col-bottom" direction="row" justifyContent="flex-end" alignItems="center" style={{ width: '1280px' }} spacing={2}>
          <Grid item><Button onClick={handleClickCancel}>Cancel</Button></Grid>

          <Grid item><Button onClick={handleSubmitSave} color="primary">Save</Button></Grid>
        </Grid>
      </Grid> */}

      {/* unsave member list dialog */}
      <Dialog open={popUpUnsave} keepMounted onClose={handleClosePopUpUnsave}>
        <DialogTitle>
          <Typography variant="h4">Unsaved changes to member list</Typography>
        </DialogTitle>
        <DialogContent>
          <Typography variant="body1">
            Changes are unsaved, nothing will change by clicking Don’t Save. Click Cancel to go back to editing panel.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClosePopUpUnsave}>Cancel</Button>
          <Button onClick={handleSubmitUnsave} color="secondary">
            Don’t Save
          </Button>
        </DialogActions>
      </Dialog>

      {/* save member list dialog */}
      <Dialog open={popUpSave} keepMounted onClose={handleClosePopUpSave}>
        <DialogTitle>
          <Typography variant="h4">Save changes to member list</Typography>
        </DialogTitle>
        <DialogContent>
          <Typography variant="body1">
            Click save changes to modify member list. Click Cancel to go back to editing panel.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClosePopUpSave}>Cancel</Button>
          <Button onClick={handleSubmitSave} color="primary">
            Save Changes
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default MemberEdit;
