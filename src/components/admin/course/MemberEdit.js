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
  OutlinedInput,
} from '@material-ui/core';
import SchoolIcon from '@material-ui/icons/School';

const useStyles = makeStyles((theme) => ({
  card: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  editorCol: {
    display: 'flex',
    flexDirection: 'column',
    margin: '16px 23px 16px 23px',
  },
  editorItem: {
    marginBottom: '12px',
  },
  textField: {
    width: '260px',
    height: '439px',
    marginTop: '3px',
    padding: '15px 15px 0 15px',
    // h6 - body format
    fontSize: '1rem',
    fontWeight: 500,
    lineHeight: 25 / 18,
    fontFamily: 'Noto Sans',
  },
  buttonsBar: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: '50px',
  },
  leftButton: {
    marginRight: '18px',
  },

}));

/* This is a level 4 component (page component) */
const MemberEdit = (props) => {
  // TODO: initialize field content with redux state
  const classes = useStyles();
  const [TA, setTA] = useState([]);
  const [student, setStudent] = useState([]);
  const [guest, setGuest] = useState([]);

  const [showUnsaveDialog, setShowUnsaveDialog] = useState(false);
  const [showSaveDialog, setShowSaveDialog] = useState(false);
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
      setShowUnsaveDialog(true);
    }
    else{
      setShowSaveDialog(true);
    } */
    setShowSaveDialog(true);
  };

  const handleSubmitUnsave = () => {
    setShowUnsaveDialog(false);
    props.backToMemberList();
  };

  const handleSubmitSave = () => {
    setShowSaveDialog(false);
    // and sth.....
    props.backToMemberList();
  };

  return (
    <div>
      {/* TODO: rewrite the editor with <div />'s, use redux state, actions */}
      <Card className={classes.card} variant="outlined">
        <div className={classes.editorCol}>
          <div className={classes.editorItem}>
            <Typography variant="body1">TA</Typography>
          </div>
          <div className={classes.editorItem}>
            <Typography variant="caption">List of student ID</Typography>
          </div>
          <OutlinedInput
            className={classes.textField}
            defaultValue={TA}
            onChange={(e) => handleChangeTA(e)}
            multiline
            rows={17}
          />
        </div>

        <div className={classes.editorCol}>
          <div className={classes.editorItem}>
            <Typography variant="body1">Student</Typography>
          </div>
          <div className={classes.editorItem}>
            <Typography variant="caption">List of student ID</Typography>
          </div>
          <OutlinedInput
            className={classes.textField}
            defaultValue={student}
            onChange={(e) => handleChangeStudent(e)}
            multiline
            rows={17}
          />
        </div>

        <div className={classes.editorCol}>
          <div className={classes.editorItem}>
            <Typography variant="body1">Guest</Typography>
          </div>
          <div className={classes.editorItem}>
            <Typography variant="caption">List of student ID</Typography>
          </div>
          <OutlinedInput
            className={classes.textField}
            defaultValue={guest}
            onChange={(e) => handleChangeGuest(e)}
            multiline
            rows={17}
          />
        </div>
      </Card>
      <div className={classes.buttonsBar}>
        <Button onClick={handleClickCancel} className={classes.leftButton}>Cancel</Button>
        <Button onClick={handleSubmitSave} color="primary">Save</Button>
        {/* TODO:disabled */}
      </div>

      <Dialog open={showUnsaveDialog} maxWidth="md">
        <DialogTitle>
          <Typography variant="h4">Unsaved changes to member list</Typography>
        </DialogTitle>
        <DialogContent>
          <Typography variant="body1">
            Changes are unsaved, nothing will change by clicking Don’t Save. Click Cancel to go back to editing panel.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowUnsaveDialog(false)}>Cancel</Button>
          <Button onClick={handleSubmitUnsave} color="secondary">
            Don’t Save
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={showSaveDialog} maxWidth="md">
        <DialogTitle>
          <Typography variant="h4">Save changes to member list</Typography>
        </DialogTitle>
        <DialogContent>
          <Typography variant="body1">
            Click save changes to modify member list. Click Cancel to go back to editing panel.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowSaveDialog(false)}>Cancel</Button>
          <Button onClick={handleSubmitSave} color="primary">
            Save Changes
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default MemberEdit;
