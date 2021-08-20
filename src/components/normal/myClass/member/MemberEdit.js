import React, { useState, useEffect, useRef } from 'react';
import { useHistory } from 'react-router-dom';
import { useBeforeunload } from 'react-beforeunload';
import {
  Typography,
  Button,
  Card,
  CardContent,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  makeStyles,
} from '@material-ui/core';
import { deleteClassMember } from '../../../../actions/common/common';

const useStyles = makeStyles((theme) => ({
  card: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    width: '100%',
  },
  editorCol: {
    display: 'flex',
    flexDirection: 'column',
    margin: '16px 23px 16px 23px',
    width: '26.4%',
  },
  editorItem: {
    marginBottom: '12px',
  },
  textField: {
    width: '100%',
    marginTop: '0px',
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
  dialogContent: {
    padding: '0px 24px 6px 24px',
  },
  dialogButtons: {
    justifyContent: 'space-between',
  },
  backToEditButton: {
    marginLeft: '24px',
  },
}));

/* This is a level 4 component (page component) */
const MemberEdit = ({
  dispatch, authToken, classId, backToMemberList, members, onEditMembers, loading,
}) => {
  const classes = useStyles();

  const [TA, setTA] = useState([]);
  const [student, setStudent] = useState([]);
  const [guest, setGuest] = useState([]);
  const [TAChanged, setTAChanged] = useState(false);
  const [studentChanged, setStudentChanged] = useState(false);
  const [guestChanged, setGuestChanged] = useState(false);

  const [TAAddList, setTAAddList] = useState([]);
  const [studentAddList, setStudentAddList] = useState([]);
  const [guestAddList, setGuestAddList] = useState([]);
  const [TADeleteList, setTADeleteList] = useState([]);
  const [studentDeleteList, setStudentDeleteList] = useState([]);
  const [guestDeleteList, setGuestDeleteList] = useState([]);

  const [showUnsaveDialog, setShowUnsaveDialog] = useState(false);
  const unblockHandle = useRef();
  const targetLocation = useRef();
  const history = useHistory();

  useEffect(() => {
    setTA(
      members
        .filter((item) => item.role === 'MANAGER')
        .map((member) => member.student_id)
        .join('\n'),
    );
    setStudent(
      members
        .filter((item) => item.role === 'NORMAL')
        .map((member) => member.student_id)
        .join('\n'),
    );
    setGuest(
      members
        .filter((item) => item.role === 'GUEST')
        .map((member) => member.student_id)
        .join('\n'),
    );
  }, [members]);

  useEffect(() => {
    unblockHandle.current = history.block((tl) => {
      if (TAChanged || studentChanged || guestChanged) {
        setShowUnsaveDialog(true);
        targetLocation.current = tl;
        return false;
      }
      return true;
    });
  });

  useBeforeunload((e) => {
    if (TAChanged || studentChanged || guestChanged) {
      e.preventDefault();
      setShowUnsaveDialog(true);
    }
  });

  const handleChangeTA = (e) => {
    setTA(e.target.value);
    setTAChanged(
      e.target.value
        !== members
          .filter((item) => item.role === 'MANAGER')
          .map((member) => member.student_id)
          .join('\n'),
    );
    setTAAddList(e.target.value
      .split('\n')
      .filter((id) => members
        .filter((item) => item.role === 'MANAGER')
        .map((member) => member.student_id)
        .indexOf(id)
      === -1));
    setTADeleteList(members
      .filter((item) => item.role === 'MANAGER')
      .map((member) => member.student_id)
      .filter((id) => e.target.value
        .split('\n')
        .indexOf(id) === -1));
  };
  const handleChangeStudent = (e) => {
    setStudent(e.target.value);
    setStudentChanged(
      e.target.value
        !== members
          .filter((item) => item.role === 'NORMAL')
          .map((member) => member.student_id)
          .join('\n'),
    );
    setStudentAddList(e.target.value
      .split('\n')
      .filter((id) => members
        .filter((item) => item.role === 'NORMAL')
        .map((member) => member.student_id)
        .indexOf(id)
      === -1));
    setStudentDeleteList(members
      .filter((item) => item.role === 'NORMAL')
      .map((member) => member.student_id)
      .filter((id) => e.target.value
        .split('\n')
        .indexOf(id) === -1));
  };
  const handleChangeGuest = (e) => {
    setGuest(e.target.value);
    setGuestChanged(
      e.target.value
        !== members
          .filter((item) => item.role === 'GUEST')
          .map((member) => member.student_id)
          .join('\n'),
    );
    setGuestAddList(e.target.value
      .split('\n')
      .filter((id) => members
        .filter((item) => item.role === 'GUEST')
        .map((member) => member.student_id)
        .indexOf(id)
      === -1));
    setGuestDeleteList(members
      .filter((item) => item.role === 'GUEST')
      .map((member) => member.student_id)
      .filter((id) => e.target.value
        .split('\n')
        .indexOf(id) === -1));
  };

  const handleClickCancel = () => {
    if (TAChanged || studentChanged || guestChanged) {
      setShowUnsaveDialog(true);
    } else {
      backToMemberList();
    }
  };
  const handleSubmitUnsave = () => {
    setShowUnsaveDialog(false);
    backToMemberList();
    if (unblockHandle) {
      unblockHandle.current();
      history.push(targetLocation.current);
    }
  };

  const handleSubmitSave = () => {
    setShowUnsaveDialog(false);
    if (TAAddList.length >= 1 && TAAddList[0].length !== 0) {
      // TAAddList.map((id) => dispatch(addClassMember(authToken, classId, id)));
      console.log(TAAddList);
    }
    if (studentAddList.length >= 1 && studentAddList[0].length !== 0) {
      // studentAddList.map((id) => dispatch(addClassMember(authToken, classId, id)));
      console.log(studentAddList);
    }
    if (guestAddList.length >= 1 && guestAddList[0].length !== 0) {
      // guestAddList.map((id) => dispatch(addClassMember(authToken, classId, id)));
      console.log(guestAddList);
    }
    if (TADeleteList.length >= 1 && TADeleteList[0].length !== 0) {
      // TADeleteList.map((id) => dispatch(deleteClassMember(authToken, classId, id)));
      console.log(TADeleteList);
    }
    if (studentDeleteList.length >= 1 && studentDeleteList[0].length !== 0) {
      // studentDeleteList.map((id) => dispatch(deleteClassMember(authToken, classId, id)));
      console.log(studentDeleteList);
    }
    if (guestDeleteList.length >= 1 && guestDeleteList[0].length !== 0) {
      // guestDeleteList.map((id) => dispatch(deleteClassMember(authToken, classId, id)));
      console.log(guestDeleteList);
    }

    backToMemberList();
    if (unblockHandle) {
      unblockHandle.current();
      history.push(targetLocation.current);
    }
  };

  return (
    <div>
      <Card className={classes.card} variant="outlined">
        <div className={classes.editorCol}>
          <div className={classes.editorItem}>
            <Typography variant="body1">TA</Typography>
          </div>
          <div className={classes.editorItem}>
            <Typography variant="caption">List of student ID</Typography>
          </div>
          <TextField
            className={classes.textField}
            value={TA}
            onChange={(e) => handleChangeTA(e)}
            multiline
            rows={20}
          />
        </div>
        <div className={classes.editorCol}>
          <div className={classes.editorItem}>
            <Typography variant="body1">Student</Typography>
          </div>
          <div className={classes.editorItem}>
            <Typography variant="caption">List of student ID</Typography>
          </div>
          <TextField
            className={classes.textField}
            value={student}
            onChange={(e) => handleChangeStudent(e)}
            multiline
            rows={20}
          />
        </div>
        <div className={classes.editorCol}>
          <div className={classes.editorItem}>
            <Typography variant="body1">Guest</Typography>
          </div>
          <div className={classes.editorItem}>
            <Typography variant="caption">List of student ID</Typography>
          </div>
          <TextField
            className={classes.textField}
            value={guest}
            onChange={(e) => handleChangeGuest(e)}
            multiline
            rows={20}
          />
        </div>
      </Card>
      <div className={classes.buttonsBar}>
        <Button onClick={handleClickCancel} className={classes.leftButton}>
          Cancel
        </Button>
        <Button onClick={handleSubmitSave} color="primary">
          Save
        </Button>
      </div>

      <Dialog open={showUnsaveDialog} maxWidth="md">
        <DialogTitle>
          <Typography variant="h4">Unsaved Changes</Typography>
        </DialogTitle>
        <DialogContent className={classes.dialogContent}>
          <Typography variant="body1">
            You have unsaved changes, do you want to save your changes or back to edit?
          </Typography>
        </DialogContent>
        <DialogActions className={classes.dialogButtons}>
          <div>
            <Button variant="outlined" onClick={() => setShowUnsaveDialog(false)} className={classes.backToEditButton}>
              Back to Edit
            </Button>
          </div>
          <div>
            <Button onClick={handleSubmitUnsave}>
              Don’t Save
            </Button>
            <Button onClick={handleSubmitSave} color="primary">
              Save
            </Button>
          </div>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default MemberEdit;
