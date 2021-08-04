import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  makeStyles,
  Button,
  Typography,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControlLabel,
  Switch,
  Grid,
  OutlinedInput,
  TextField,
} from '@material-ui/core';
import { useParams } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { Translate } from '@material-ui/icons';
import SimpleBar from '../../ui/SimpleBar';
import AlignedText from '../../ui/AlignedText';
import { editInstitute } from '../../../actions/admin/account';

const useStyles = makeStyles((theme) => ({
  pageHeader: {
    marginBottom: '50px',
  },
  wrapper: {
    display: 'flex',
    flexDirection: 'row',
    verticalAlign: 'center',
  },
  alignedTextWrapper1: {
    width: '190px',
  },
  alignedTextWrapper2: {
    width: '600px',
  },
  alignedText: {
    marginTop: '10px',
    marginBottom: '10px',
  },
  warningText: {
    marginTop: '10px',
  },
  inputField: {
    width: 330,
  },
}));

export default function InstituteSetting() {
  const classes = useStyles();

  const { instituteId } = useParams();
  const institutes = useSelector((state) => state.admin.account.institutes.byId);
  const authToken = useSelector((state) => state.auth.user.token);
  const pageError = useSelector((state) => state.admin.account.error);
  const loading = useSelector((state) => state.admin.account.loading);

  const dispatch = useDispatch();

  const [settingStatus, setSettingStatus] = useState({
    changeName: false,
    changeInitialism: false,
    changeEmail: false,
    changeStatus: false,
  });

  const [newSetting, setNewSetting] = useState({
    newStatus: institutes === {} ? (institutes[instituteId].is_disabled === 'Enabled' || institutes[instituteId].is_disabled === false) : false,
    newName: '',
    newInitialism: '',
    newEmail: '',
  });

  const [error, setError] = useState(false);
  const [errorText, setErrorText] = useState('');

  const handleClosePopUp = () => {
    setSettingStatus({
      changeName: false,
      changeInitialism: false,
      changeEmail: false,
      changeStatus: false,
    });
    setNewSetting({
      newStatus: institutes[instituteId].is_disabled === 'Enabled' || institutes[instituteId].is_disabled === false,
      newName: '',
      newInitialism: '',
      newEmail: '',
    });
  };

  const handleChange = (prop) => (event) => {
    setNewSetting((input) => ({ ...input, [prop]: event.target.value }));
    if (prop === 'newEmail' && error === true) {
      setError(false);
      setErrorText('');
    }
  };

  const handleChangeStatus = (event) => {
    setNewSetting((input) => ({ ...input, [event.target.name]: event.target.checked }));
  };

  const handleEditInstitute = (prop) => {
    if (newSetting.newEmail === '' && prop === 'newEmail') {
      setError(true);
      setErrorText("Can't be empty!");
      return;
    }
    switch (prop) {
      case 'newName':
        dispatch(editInstitute(authToken, instituteId, institutes[instituteId].abbreviated_name, newSetting.newName, institutes[instituteId].email_domain, institutes[instituteId].is_disabled === 'Disabled' || institutes[instituteId].is_disabled === true));
        break;
      case 'newInitialism':
        dispatch(editInstitute(authToken, instituteId, newSetting.newInitialism, institutes[instituteId].full_name, institutes[instituteId].email_domain, institutes[instituteId].is_disabled === 'Disabled' || institutes[instituteId].is_disabled === true));
        break;
      case 'newEmail':
        dispatch(editInstitute(authToken, instituteId, institutes[instituteId].abbreviated_name, institutes[instituteId].full_name, newSetting.newEmail, institutes[instituteId].is_disabled === 'Disabled' || institutes[instituteId].is_disabled === true));
        break;
      case 'newStatus':
        dispatch(editInstitute(authToken, instituteId, institutes[instituteId].abbreviated_name, institutes[instituteId].full_name, institutes[instituteId].email_domain, newSetting.newStatus));
        break;
      default:
        dispatch(editInstitute(authToken, instituteId, institutes[instituteId].abbreviated_name, institutes[instituteId].full_name, institutes[instituteId].email_domain, institutes[instituteId].is_disabled === 'Disabled' || institutes[instituteId].is_disabled === true));
    }
    handleClosePopUp();
  };

  return (
    <>
      <Typography variant="h3" className={classes.pageHeader}>
        {`${institutes[instituteId].abbreviated_name} / Setting`}
      </Typography>
      <SimpleBar
        title="Institute Information"
      >
        <div className={classes.wrapper}>
          <div className={classes.alignedTextWrapper1}>
            <Typography variant="body1" className={classes.alignedText}>
              Full Name
            </Typography>
          </div>
          <div className={classes.alignedTextWrapper2}>
            <Typography variant="body1" className={classes.alignedText}>
              {institutes[instituteId].full_name}
            </Typography>
          </div>
        </div>
        <div className={classes.wrapper}>
          <div className={classes.alignedTextWrapper1}>
            <Typography variant="body1" className={classes.alignedText}>
              Initialism
            </Typography>
          </div>
          <div className={classes.alignedTextWrapper2}>
            <Typography variant="body1" className={classes.alignedText}>
              {institutes[instituteId].abbreviated_name}
            </Typography>
          </div>
        </div>
        <div className={classes.wrapper}>
          <div className={classes.alignedTextWrapper1}>
            <Typography variant="body1" className={classes.alignedText}>
              Email
            </Typography>
          </div>
          <div className={classes.alignedTextWrapper2}>
            <Typography variant="body1" className={classes.alignedText}>
              {institutes[instituteId].email_domain}
            </Typography>
          </div>
        </div>
        <div className={classes.wrapper}>
          <div className={classes.alignedTextWrapper1}>
            <Typography variant="body1" className={classes.alignedText}>
              Status
            </Typography>
          </div>
          <div className={classes.alignedTextWrapper2}>
            <Typography variant="body1" className={classes.alignedText}>
              {(institutes[instituteId].is_disabled === true || institutes[instituteId].is_disabled === 'Disabled') ? 'Disabled' : 'Enabled'}
            </Typography>
          </div>
        </div>
      </SimpleBar>
      <SimpleBar
        title="Change Institute Full Name"
        buttons={(
          <>
            <Button
              color="secondary"
              onClick={() => {
                setSettingStatus((input) => ({ ...input, changeName: true }));
              }}
            >
              Rename
            </Button>
          </>
        )}
      >
        <Typography variant="body1">
          Once you change the institute’s name, all related members will be affected. Please be certain.
        </Typography>
      </SimpleBar>
      <SimpleBar
        title="Change Institute Initialism"
        buttons={(
          <>
            <Button
              color="secondary"
              onClick={(prevState) => {
                setSettingStatus((input) => ({ ...input, changeInitialism: true }));
              }}
            >
              Rename
            </Button>
          </>
        )}
      >
        <Typography variant="body1">
          Once you change the institute’s initialism, all related members will be affected. Please be certain.
        </Typography>
      </SimpleBar>
      <SimpleBar
        title="Change Institute Email"
        buttons={(
          <>
            <Button
              color="secondary"
              onClick={(prevState) => {
                setSettingStatus((input) => ({ ...input, changeEmail: true }));
              }}
            >
              Change Email
            </Button>
          </>
        )}
      >
        <Typography variant="body1">
          Once you change the institute’s email, future members may not be able to register with certain email. Please
          be certain.
        </Typography>
      </SimpleBar>
      <SimpleBar
        title="Change Institute Status"
        buttons={(
          <>
            <Button
              color="secondary"
              onClick={(prevState) => {
                setSettingStatus((input) => ({ ...input, changeStatus: true }));
              }}
            >
              Change Status
            </Button>
          </>
        )}
      >
        <Typography variant="body1">
          Once you change the institute’s status, future members from this institute may not be able to register. Please
          be certain.
        </Typography>
      </SimpleBar>

      <Dialog
        open={settingStatus.changeName}
        keepMounted
        onClose={() => handleClosePopUp()}
        aria-labelledby="dialog-slide-title"
        aria-describedby="dialog-slide-description"
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle id="dialog-slide-title">
          <Typography variant="h4">Rename institute</Typography>
        </DialogTitle>
        <DialogContent>
          <div style={{ color: 'red' }}>
            <AlignedText text="Full Name" childrenType="text">
              <Typography variant="body1">
                {institutes[instituteId].full_name}
              </Typography>
            </AlignedText>
          </div>
          <AlignedText text="New Name" childrenType="field">
            <TextField
              id="newName"
              name="newName"
              value={newSetting.newName}
              onChange={handleChange('newName')}
              className={classes.inputField}
            />
          </AlignedText>
          <Typography variant="body1" className={classes.warningText}>
            Once you change the institute’s name, all related members will be affected. Please be certain.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => handleClosePopUp()} color="default">
            Cancel
          </Button>
          <Button onClick={() => { handleEditInstitute('newName'); }} color="secondary">
            Rename
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog
        open={settingStatus.changeInitialism}
        keepMounted
        onClose={() => handleClosePopUp()}
        aria-labelledby="dialog-slide-title"
        aria-describedby="dialog-slide-description"
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle id="dialog-slide-title">
          <Typography variant="h4">Change institute Initialism</Typography>
        </DialogTitle>
        <DialogContent>
          <div style={{ color: 'red' }}>
            <AlignedText text="Current Initialism" childrenType="text">
              <Typography variant="body1">
                {institutes[instituteId].abbreviated_name}
              </Typography>
            </AlignedText>
          </div>
          <AlignedText text="New Initialism" childrenType="field">
            <TextField
              id="newInitialism"
              name="newInitialism"
              value={newSetting.newInitialism}
              onChange={handleChange('newInitialism')}
              className={classes.inputField}
            />
          </AlignedText>
          <Typography variant="body1" className={classes.warningText}>
            Once you change the institute’s initialism, all related members will be affected. Please be certain.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => handleClosePopUp()} color="default">
            Cancel
          </Button>
          <Button onClick={() => { handleEditInstitute('newInitialism'); }} color="secondary">
            Rename
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog
        open={settingStatus.changeEmail}
        keepMounted
        onClose={() => handleClosePopUp()}
        aria-labelledby="dialog-slide-title"
        aria-describedby="dialog-slide-description"
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle id="dialog-slide-title">
          <Typography variant="h4">Change institute email</Typography>
        </DialogTitle>
        <DialogContent>
          <div style={{ color: 'red' }}>
            <AlignedText text="Current Email" childrenType="text">
              <Typography variant="body1">
                {institutes[instituteId].email_domain}
              </Typography>
            </AlignedText>
          </div>
          <AlignedText text="New Email" childrenType="field">
            <TextField
              id="newEmail"
              name="newEmail"
              value={newSetting.newEmail}
              onChange={handleChange('newEmail')}
              error={error}
              helperText={errorText}
              className={classes.inputField}
            />
          </AlignedText>
          <Typography variant="body1" className={classes.warningText}>
            Once you change the institute’s email, future members may not be able to register with certain email. Please be certain.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => handleClosePopUp()} color="default">
            Cancel
          </Button>
          <Button onClick={() => { handleEditInstitute('newEmail'); }} color="secondary">
            Rename
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog
        open={settingStatus.changeStatus}
        keepMounted
        onClose={() => handleClosePopUp()}
        aria-labelledby="dialog-slide-title"
        aria-describedby="dialog-slide-description"
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle id="dialog-slide-title">
          <Typography variant="h4">Rename institute</Typography>
        </DialogTitle>
        <DialogContent>
          <FormControlLabel
            control={
              <Switch checked={newSetting.newStatus} onChange={handleChangeStatus} name="newStatus" color="primary" />
            }
            label={newSetting.newStatus ? 'Enabled' : 'Disabled'}
          />
          <Typography variant="body1" className={classes.warningText}>
            Once you change the institute’s status, future members from this institute may not be able to register.
            Please be certain.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => handleClosePopUp()} color="default">
            Cancel
          </Button>
          <Button onClick={() => handleEditInstitute('newStatus')} color="secondary">
            Modify
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
