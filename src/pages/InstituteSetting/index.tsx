import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControlLabel,
  Snackbar,
  Switch,
  TextField,
  Typography,
  makeStyles,
} from '@material-ui/core';
import { useState } from 'react';

import AlignedText from '@/components/AlignedText';
import GeneralLoading from '@/components/GeneralLoading';
import PageTitle from '@/components/PageTitle';
import SimpleBar from '@/components/SimpleBar';
import NoMatch from '@/components/noMatch';
import useInstitute from '@/lib/institute/useInstitute';

const useStyles = makeStyles(() => ({
  warningText: {
    marginTop: '10px',
  },
}));

export default function InstituteSetting({ instituteId }: { instituteId: string }) {
  const classes = useStyles();

  const { institute, editInstitute, isLoading, error: instituteError } = useInstitute(Number(instituteId));

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

  const [error, setError] = useState(false);
  const [errorText, setErrorText] = useState('');
  const [showSnackbar, setShowSnackbar] = useState(false);

  if (institute === undefined) {
    if (isLoading.read) {
      return <GeneralLoading />;
    }
    return <NoMatch />;
  }

  const handleClosePopUp = () => {
    setSettingStatus({
      changeName: false,
      changeInitialism: false,
      changeEmail: false,
      changeStatus: false,
    });
    setNewSetting({
      ...newSetting,
      newName: '',
      newInitialism: '',
      newEmail: '',
    });
  };

  const handleEditInstitute = async (prop: string) => {
    if (newSetting.newEmail === '' && prop === 'newEmail') {
      setError(true);
      setErrorText("Can't be empty!");
      return;
    }
    try {
      switch (prop) {
        case 'newName':
          await editInstitute({ institute_id: Number(instituteId), full_name: newSetting.newName });
          break;
        case 'newInitialism':
          await editInstitute({ institute_id: Number(instituteId), abbreviated_name: newSetting.newInitialism });
          break;
        case 'newEmail':
          await editInstitute({ institute_id: Number(instituteId), email_domain: newSetting.newEmail });
          break;
        case 'newStatus':
          await editInstitute({ institute_id: Number(instituteId), is_disabled: newSetting.newStatus });
          break;
        default:
          break;
      }
      handleClosePopUp();
    } catch {
      setShowSnackbar(true);
    }
  };

  return (
    <>
      <PageTitle text={`${institute.abbreviated_name} / Setting`} />
      <SimpleBar title="Institute Information">
        <AlignedText text="Full Name" maxWidth="lg" childrenType="text">
          <Typography variant="body1">{institute.full_name}</Typography>
        </AlignedText>
        <AlignedText text="Initialism" maxWidth="lg" childrenType="text">
          <Typography variant="body1">{institute.abbreviated_name}</Typography>
        </AlignedText>
        <AlignedText text="Email" maxWidth="lg" childrenType="text">
          <Typography variant="body1">{institute.email_domain}</Typography>
        </AlignedText>
        <AlignedText text="Status" maxWidth="lg" childrenType="text">
          <Typography variant="body1">{institute.is_disabled === true ? 'Disabled' : 'Enabled'}</Typography>
        </AlignedText>
      </SimpleBar>
      <SimpleBar
        title="Change Institute Full Name"
        childrenButtons={
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
        }
      >
        <Typography variant="body1">
          Once you change the institute’s name, all related members will be affected. Please be certain.
        </Typography>
      </SimpleBar>
      <SimpleBar
        title="Change Institute Initialism"
        childrenButtons={
          <>
            <Button
              color="secondary"
              onClick={() => {
                setSettingStatus((input) => ({ ...input, changeInitialism: true }));
              }}
            >
              Rename
            </Button>
          </>
        }
      >
        <Typography variant="body1">
          Once you change the institute’s initialism, all related members will be affected. Please be certain.
        </Typography>
      </SimpleBar>
      <SimpleBar
        title="Change Institute Email"
        childrenButtons={
          <>
            <Button
              color="secondary"
              onClick={() => {
                setSettingStatus((input) => ({ ...input, changeEmail: true }));
              }}
            >
              Change Email
            </Button>
          </>
        }
      >
        <Typography variant="body1">
          Once you change the institute’s email, future members may not be able to register with certain email. Please
          be certain.
        </Typography>
      </SimpleBar>
      <SimpleBar
        title="Change Institute Status"
        childrenButtons={
          <>
            <Button
              color="secondary"
              onClick={() => {
                setSettingStatus((input) => ({ ...input, changeStatus: true }));
                setNewSetting((input) => ({ ...input, newStatus: institute.is_disabled }));
              }}
            >
              Change Status
            </Button>
          </>
        }
      >
        <Typography variant="body1">
          Once you change the institute’s status, future members from this institute may not be able to register. Please
          be certain.
        </Typography>
      </SimpleBar>

      <Dialog open={settingStatus.changeName} keepMounted onClose={() => handleClosePopUp()} fullWidth maxWidth="sm">
        <DialogTitle id="dialog-slide-title">
          <Typography variant="h4">Rename institute</Typography>
        </DialogTitle>
        <DialogContent>
          <AlignedText text="Full Name" childrenType="text" textColor="secondary">
            <Typography variant="body1">{institute.full_name}</Typography>
          </AlignedText>
          <AlignedText text="New Name" childrenType="field">
            <TextField
              id="newName"
              name="newName"
              value={newSetting.newName}
              onChange={(e) => {
                setNewSetting((input) => ({ ...input, newName: e.target.value }));
              }}
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
          <Button
            onClick={() => {
              handleEditInstitute('newName');
            }}
            color="secondary"
            disabled={newSetting.newName === ''}
          >
            Rename
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog
        open={settingStatus.changeInitialism}
        keepMounted
        onClose={() => handleClosePopUp()}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle id="dialog-slide-title">
          <Typography variant="h4">Change institute Initialism</Typography>
        </DialogTitle>
        <DialogContent>
          <AlignedText text="Current Initialism" childrenType="text" textColor="secondary">
            <Typography variant="body1">{institute.abbreviated_name}</Typography>
          </AlignedText>
          <AlignedText text="New Initialism" childrenType="field">
            <TextField
              id="newInitialism"
              name="newInitialism"
              value={newSetting.newInitialism}
              onChange={(e) => {
                setNewSetting((input) => ({ ...input, newInitialism: e.target.value }));
              }}
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
          <Button
            onClick={() => {
              handleEditInstitute('newInitialism');
            }}
            color="secondary"
            disabled={newSetting.newInitialism === ''}
          >
            Rename
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog open={settingStatus.changeEmail} keepMounted onClose={() => handleClosePopUp()} fullWidth maxWidth="sm">
        <DialogTitle id="dialog-slide-title">
          <Typography variant="h4">Change institute email</Typography>
        </DialogTitle>
        <DialogContent>
          <AlignedText text="Current Email" childrenType="text" textColor="secondary">
            <Typography variant="body1">{institute.email_domain}</Typography>
          </AlignedText>
          <AlignedText text="New Email" childrenType="field">
            <TextField
              id="newEmail"
              name="newEmail"
              value={newSetting.newEmail}
              onChange={(e) => {
                if (error === true) {
                  setError(false);
                  setErrorText('');
                } else {
                  setNewSetting((input) => ({ ...input, newEmail: e.target.value }));
                }
              }}
              error={error}
              helperText={errorText}
            />
          </AlignedText>
          <Typography variant="body1" className={classes.warningText}>
            Once you change the institute’s email, future members may not be able to register with certain email. Please
            be certain.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => handleClosePopUp()} color="default">
            Cancel
          </Button>
          <Button
            onClick={() => {
              handleEditInstitute('newEmail');
            }}
            color="secondary"
            disabled={newSetting.newEmail === ''}
          >
            Modify
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog open={settingStatus.changeStatus} keepMounted onClose={() => handleClosePopUp()} fullWidth maxWidth="sm">
        <DialogTitle id="dialog-slide-title">
          <Typography variant="h4">Rename institute</Typography>
        </DialogTitle>
        <DialogContent>
          <FormControlLabel
            control={
              <Switch
                checked={!newSetting.newStatus}
                onChange={(e) => {
                  setNewSetting((input) => ({ ...input, [e.target.name]: !e.target.checked }));
                }}
                name="newStatus"
                color="primary"
              />
            }
            label={newSetting.newStatus ? 'Disable' : 'Enable'}
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
          <Button
            disabled={institute.is_disabled === newSetting.newStatus}
            onClick={() => handleEditInstitute('newStatus')}
            color="secondary"
          >
            Modify
          </Button>
        </DialogActions>
      </Dialog>
      <Snackbar
        open={showSnackbar}
        autoHideDuration={3000}
        onClose={() => {
          setShowSnackbar(false);
        }}
        message={`Error: ${instituteError.edit?.message}`}
      />
    </>
  );
}
