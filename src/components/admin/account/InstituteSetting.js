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
} from '@material-ui/core';
import { useParams } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import SimpleBar from '../../ui/SimpleBar';
import AlignedText from '../../ui/AlignedText';

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
  textWrapper1: {
    width: '200px',
    color: 'red',
  },
  textWrapper2: {
    width: '400px',
    color: 'red',
  },
  textWrapper3: {
    width: '200px',
  },
  textWrapper4: {
    width: '400px',
  },
}));

export default function InstituteSetting() {
  const classes = useStyles();

  const { instituteId } = useParams();
  const institutes = useSelector((state) => state.admin.account.institutes.byId);

  const [settingStatus, setSettingStatus] = useState({
    changeName: false,
    changeInitialism: false,
    changeEmail: false,
    changeStatus: false,
  });

  const [newSetting, setNewSetting] = useState({
    newStatus: false,
    newName: '',
    newInitialism: '',
    newEmail: '',
  });

  const handleClosePopUp = () => {
    setSettingStatus({
      changeName: false,
      changeInitialism: false,
      changeEmail: false,
      changeStatus: false,
    });
  };

  const handleChange = (prop) => (event) => {
    setNewSetting((input) => ({ ...input, [prop]: event.target.value }));
    console.log(instituteId);
  };

  const handleChangeStatus = (event) => {
    setNewSetting((input) => ({ ...input, [event.target.name]: event.target.checked }));
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
              {institutes[instituteId].is_disabled ? 'Disabled' : 'Enabled'}
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
          <div className={classes.wrapper}>
            <div className={classes.textWrapper1}>
              <Typography variant="body1" className={classes.alignedText}>
                Full Name
              </Typography>
            </div>
            <div className={classes.textWrapper2}>
              <Typography variant="body1" className={classes.alignedText}>
                {institutes[instituteId].full_name}
              </Typography>
            </div>
          </div>
          <div className={classes.wrapper}>
            <div className={classes.textWrapper3}>
              <Typography variant="body1" className={classes.alignedText}>
                New Name
              </Typography>
            </div>
            <div className={classes.textWrapper4}>
              <OutlinedInput
                id="outlined-adornment"
                value={newSetting.newName}
                onChange={handleChange('newName')}
                aria-describedby="outlined-weight-helper-text"
                inputProps={{
                  'aria-label': 'newName',
                }}
                labelWidth={0}
                style={{ width: 360 }}
              />
            </div>
          </div>
          <Typography variant="body1">
            Once you change the institute’s name, all related members will be affected. Please be certain.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => handleClosePopUp()} color="default">
            Cancel
          </Button>
          <Button onClick={() => handleClosePopUp()} color="secondary">
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
          <Grid container spacing={3}>
            <Grid item xs={5}>
              <Typography variant="body1" style={{ color: 'red' }}>
                Current Initialism
              </Typography>
            </Grid>
            <Grid item xs={7}>
              <Typography variant="body1" style={{ color: 'red' }}>
                {institutes[instituteId].abbreviated_name}
              </Typography>
            </Grid>
            <Grid item xs={5}>
              <Typography variant="body1">New Initialism</Typography>
            </Grid>
            <Grid item xs={7}>
              <OutlinedInput
                id="outlined-adornment"
                value={newSetting.newInitialism}
                onChange={handleChange('newInitialism')}
                aria-describedby="outlined-weight-helper-text"
                inputProps={{
                  'aria-label': 'newInitialism',
                }}
                labelWidth={0}
              />
            </Grid>
          </Grid>
          <Typography variant="body1">
            Once you change the institute’s initialism, all related members will be affected. Please be certain.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => handleClosePopUp()} color="default">
            Cancel
          </Button>
          <Button onClick={() => handleClosePopUp()} color="secondary">
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
          <Typography variant="body1">
            Once you change the institute’s status, future members from this institute may not be able to register.
            Please be certain.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => handleClosePopUp()} color="default">
            Cancel
          </Button>
          <Button onClick={() => handleClosePopUp()} color="secondary">
            Modify
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
