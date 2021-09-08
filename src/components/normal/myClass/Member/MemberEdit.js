import React, { useState, useEffect, useRef } from 'react';
import { useHistory } from 'react-router-dom';
import { useBeforeunload } from 'react-beforeunload';
import {
  Typography,
  Button,
  Card,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  makeStyles,
} from '@material-ui/core';
import { useSelector } from 'react-redux';
import { replaceClassMembers } from '../../../../actions/common/common';

const useStyles = makeStyles(() => ({
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
  duplicateList: {
    marginTop: '16px',
  },
  dialogButtons: {
    justifyContent: 'space-between',
  },
  backToEditButton: {
    marginLeft: '24px',
  },
  buttonFlexEnd: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
}));

/* This is a level 4 component (page component) */
const MemberEdit = ({
  dispatch, authToken, classId, backToMemberList, members,
}) => {
  const classes = useStyles();

  const error = useSelector((state) => state.error.common.common);
  const loading = useSelector((state) => state.loading.common.common);

  const [TA, setTA] = useState([]);
  const [student, setStudent] = useState([]);
  const [guest, setGuest] = useState([]);
  const [TAChanged, setTAChanged] = useState(false);
  const [studentChanged, setStudentChanged] = useState(false);
  const [guestChanged, setGuestChanged] = useState(false);
  const [duplicateList, setDuplicateList] = useState([]);
  const [submitError, setSubmitError] = useState('');
  const [dispatchStart, setDispatchStart] = useState(false);
  const [showUnsavedChangesDialog, setShowUnsavedChangesDialog] = useState(false);
  const [showDuplicateIdentityDialog, setShowDuplicateIdentityDialog] = useState(false);
  const [showErrorDetectedDialog, setShowErrorDetectedDialog] = useState(false);
  const unblockHandle = useRef();
  const targetLocation = useRef();
  const history = useHistory();

  // unblock user leaving current page through header and sidebar links
  // and push to original target location
  const unblockAndReturn = () => {
    if (unblockHandle) {
      setShowDuplicateIdentityDialog(false);
      setShowErrorDetectedDialog(false);
      unblockHandle.current();
      history.push(targetLocation.current);
    }
    backToMemberList();
  };
  // remove empty elements in an array
  const handleBlankList = (list) => list.filter((element) => element !== '' && element.account_referral !== '');

  useEffect(() => {
    if (members !== undefined) {
      setTA(
        members
          .filter((item) => item.role === 'MANAGER')
          .map((member) => member.member_referral)
          .join('\n'),
      );
      setStudent(
        members
          .filter((item) => item.role === 'NORMAL')
          .map((member) => member.member_referral)
          .join('\n'),
      );
      setGuest(
        members
          .filter((item) => item.role === 'GUEST')
          .map((member) => member.member_referral)
          .join('\n'),
      );
    }
  }, [members]);

  // block user leaving current page through header and sidebar links (if contents have been changed)
  useEffect(() => {
    unblockHandle.current = history.block((tl) => {
      if (TAChanged || studentChanged || guestChanged) {
        setShowUnsavedChangesDialog(true);
        targetLocation.current = tl;
        return false;
      }
      return true;
    });
  });

  useEffect(() => {
    if (dispatchStart) {
      if (!loading.replaceClassMembers) {
        if (error.replaceClassMembers) {
          setSubmitError(error.replaceClassMembers);
          setShowErrorDetectedDialog(true);
        } else {
          if (unblockHandle) {
            unblockHandle.current();
            history.push(targetLocation.current);
          }
          backToMemberList();
        }
      }
    }
  }, [backToMemberList, dispatchStart, error.replaceClassMembers, history, loading.replaceClassMembers]);

  // block user leaving current page through browser close button and refresh button
  // (if any dialog is shown, or contents have been changed)
  useBeforeunload((e) => {
    if (showErrorDetectedDialog || showDuplicateIdentityDialog) {
      e.preventDefault();
    } else if (TAChanged || studentChanged || guestChanged) {
      e.preventDefault();
      setShowUnsavedChangesDialog(true);
    }
  });

  const handleChangeTA = (e) => {
    setTA(e.target.value);
    setTAChanged(
      e.target.value
        !== members
          .filter((item) => item.role === 'MANAGER')
          .map((member) => member.member_referral)
          .join('\n'),
    );
  };
  const handleChangeStudent = (e) => {
    setStudent(e.target.value);
    setStudentChanged(
      e.target.value
        !== members
          .filter((item) => item.role === 'NORMAL')
          .map((member) => member.member_referral)
          .join('\n'),
    );
  };
  const handleChangeGuest = (e) => {
    setGuest(e.target.value);
    setGuestChanged(
      e.target.value
        !== members
          .filter((item) => item.role === 'GUEST')
          .map((member) => member.member_referral)
          .join('\n'),
    );
  };

  const handleClickCancel = () => {
    if (TAChanged || studentChanged || guestChanged) {
      setShowUnsavedChangesDialog(true);
    } else {
      unblockAndReturn();
    }
  };
  const handleUnsave = () => {
    setShowUnsavedChangesDialog(false);
    unblockAndReturn();
  };
  const handleSave = () => {
    setShowUnsavedChangesDialog(false);

    if (TAChanged || studentChanged || guestChanged) {
      const TAStudentDuplicateList = TA.split('\n').filter(
        (id) => student
          .split('\n')
          .map((accountReferral) => accountReferral)
          .indexOf(id) !== -1,
      );
      const guestStudentDuplicateList = guest.split('\n').filter(
        (id) => student
          .split('\n')
          .map((accountReferral) => accountReferral)
          .indexOf(id) !== -1,
      );
      const guestTADuplicateList = guest.split('\n').filter(
        (id) => TA.split('\n')
          .map((accountReferral) => accountReferral)
          .indexOf(id) !== -1,
      );

      const combinedDuplicateList = handleBlankList(
        TAStudentDuplicateList.concat(guestStudentDuplicateList, guestTADuplicateList),
      );
      setDuplicateList(combinedDuplicateList);

      if (combinedDuplicateList.length !== 0) {
        setShowDuplicateIdentityDialog(true);
      } else {
        const TATransformedList = TA.split('\n').map((accountReferral) => ({
          account_referral: accountReferral,
          role: 'MANAGER',
        }));
        const studentTransformedList = student.split('\n').map((accountReferral) => ({
          account_referral: accountReferral,
          role: 'NORMAL',
        }));
        const guestTransformedList = guest.split('\n').map((accountReferral) => ({
          account_referral: accountReferral,
          role: 'GUEST',
        }));

        const replacingList = handleBlankList(TATransformedList.concat(studentTransformedList, guestTransformedList));

        dispatch(replaceClassMembers(authToken, classId, replacingList));
        setDispatchStart(true);
      }
    } else {
      unblockAndReturn();
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
          <TextField className={classes.textField} value={TA} onChange={(e) => handleChangeTA(e)} multiline rows={20} />
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
        <Button onClick={handleSave} color="primary">
          Save
        </Button>
      </div>

      <Dialog open={showUnsavedChangesDialog} maxWidth="md">
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
            <Button
              variant="outlined"
              onClick={() => setShowUnsavedChangesDialog(false)}
              className={classes.backToEditButton}
            >
              Back to Edit
            </Button>
          </div>
          <div>
            <Button onClick={handleUnsave}>Don’t Save</Button>
            <Button onClick={handleSave} color="primary">
              Save
            </Button>
          </div>
        </DialogActions>
      </Dialog>

      <Dialog open={showDuplicateIdentityDialog} maxWidth="md">
        <DialogTitle>
          <Typography variant="h4">Duplicate Identity</Typography>
        </DialogTitle>
        <DialogContent className={classes.dialogContent}>
          <Typography variant="body1">
            The following accounts appear in more than one column. Please remove duplicate identities.
          </Typography>
          <div className={classes.duplicateList}>
            {duplicateList.map((accountReferral) => (
              <Typography variant="body1" key={accountReferral}>
                {accountReferral}
              </Typography>
            ))}
          </div>
        </DialogContent>
        <DialogActions>
          <Button
            color="primary"
            onClick={() => setShowDuplicateIdentityDialog(false)}
            className={classes.buttonFlexEnd}
          >
            Back to Edit
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={showErrorDetectedDialog} maxWidth="md">
        <DialogTitle>
          <Typography variant="h4">Error Detected</Typography>
        </DialogTitle>
        <DialogContent className={classes.dialogContent}>
          <Typography variant="body1">Save member failed due to the following reasons:</Typography>
          <Typography variant="body1" className={classes.duplicateList}>
            {submitError === 'IllegalInput' ? 'Illegal Input' : submitError}
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button color="primary" onClick={() => setShowErrorDetectedDialog(false)} className={classes.buttonFlexEnd}>
            Back to Edit
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default MemberEdit;
