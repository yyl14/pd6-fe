import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import {
  Typography,
  Button,
  Grid,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
  FormControlLabel,
  Switch,
  makeStyles,
} from '@material-ui/core';
import SimpleBar from '../../ui/SimpleBar';
import AlignedText from '../../ui/AlignedText';
import NoMatch from '../../noMatch';
import { editSubmitLanguage, fetchSubmitLanguage } from '../../../actions/admin/system';

const useStyle = makeStyles((theme) => ({
  pageHeader: {
    marginBottom: '50px',
  },
}));

/* This is a level 4 component (page component) */
export default function LangSetting() {
  const classes = useStyle();

  const dispatch = useDispatch();
  const { languageId } = useParams();
  const authToken = useSelector((state) => state.auth.user.token);
  const submitLang = useSelector((state) => state.admin.system.submitLang.byId);
  const loading = useSelector((state) => state.admin.system.submitLang.loading);

  const [popUp, setPopUp] = useState(false);
  const [languageStatus, setLanguageStatus] = useState(submitLang[languageId].is_disabled);
  const [changeLanguageStatus, setChangeLanguageStatus] = useState(false);

  useEffect(() => {
    dispatch(fetchSubmitLanguage(authToken));
  }, [authToken, dispatch, languageStatus]);

  if (submitLang[languageId] === undefined) {
    if (loading.fetchSubmitLanguage) {
      return <div>loading...</div>;
    }
    return <NoMatch />;
  }

  const handleEditSubmitLanguage = () => {
    dispatch(editSubmitLanguage(authToken, languageId, submitLang[languageId].name, submitLang[languageId].version, languageStatus));
    setChangeLanguageStatus(false);
    setPopUp(false);
  };

  return (
    <>
      <Typography variant="h3" className={classes.pageHeader}>
        {`${submitLang[languageId].name} ${submitLang.[languageId].version} / Submission Language Setting`}
      </Typography>

      <SimpleBar
        title="Submission Language Information"
      >
        <Typography variant="body1">
          <AlignedText text="Language" childrenType="text">
            <Typography variant="body1">{submitLang[languageId].name}</Typography>
          </AlignedText>
          <AlignedText text="Version" childrenType="text">
            <Typography variant="body1">{submitLang[languageId].version}</Typography>
          </AlignedText>
          <AlignedText text="Status" childrenType="text">
            <Typography variant="body1">{(submitLang[languageId].is_disabled) ? 'Disabled' : 'Enabled'}</Typography>
          </AlignedText>
        </Typography>
      </SimpleBar>

      <SimpleBar
        title="Change Institute Status"
        childrenButtons={(
          <>
            <Button onClick={() => setPopUp(true)} color="secondary">
              Change Status
            </Button>
          </>
        )}
      >
        <Typography variant="body1">
          Once you change the status, future submission will be affected. Please be certain.
        </Typography>
      </SimpleBar>

      <Dialog open={popUp}>
        <DialogTitle>
          <Typography variant="h4">Change Submission Language</Typography>
        </DialogTitle>
        <DialogContent>
          <Grid container className="change-language-form" direction="row">
            <FormControlLabel
              control={(
                <Switch
                  checked={!languageStatus} // true = Disable
                  onChange={() => { setLanguageStatus(!languageStatus); setChangeLanguageStatus(languageStatus === submitLang[languageId].is_disabled); }}
                  color="primary"
                />
              )}
              label={languageStatus ? 'Disabled' : 'Enabled'}
            />
          </Grid>
        </DialogContent>
        <DialogContent>
          <Typography variant="body2">
            Once you change the status, future submission will be affected. Please be certain.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setPopUp(false)} color="default">Cancel</Button>
          <Button onClick={(e) => handleEditSubmitLanguage()} color="secondary" disabled={changeLanguageStatus === false}>
            Modify
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
