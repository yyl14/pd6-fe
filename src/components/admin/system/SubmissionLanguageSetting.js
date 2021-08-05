import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import {
  Typography,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
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
  const submitLangId = useSelector((state) => state.admin.system.submitLang.allIds);
  const loading = useSelector((state) => state.admin.system.loading.fetchAnnouncement);

  const [popUp, setPopUp] = useState(false);
  const [languageStatus, setLanguageStatus] = useState(false);
  const [changeLanguageStatus, setChangeLanguageStatus] = useState(false);
  const [submit, setSubmit] = useState(false);

  useEffect(() => {
    if (submitLangId.length === 0 || submit) {
      dispatch(fetchSubmitLanguage(authToken));
      console.log('call fetchSubmitLanguage');
      setSubmit(false);
      setPopUp(false);
    } else {
      setLanguageStatus(submitLang[languageId].is_disabled);
    }
  }, [authToken, dispatch, languageId, submitLang, submitLangId, submit]);

  if (submitLang[languageId] === undefined) {
    if (loading.fetchSubmitLanguage) {
      return <div>loading...</div>;
    }
    return <NoMatch />;
  }

  const handleEditSubmitLanguage = () => {
    dispatch(editSubmitLanguage(authToken, languageId, submitLang[languageId].name, submitLang[languageId].version, languageStatus));
    setChangeLanguageStatus(false);
    setSubmit(true);
  };

  return (
    <>
      <Typography variant="h3" className={classes.pageHeader}>
        {`${submitLang[languageId].name} ${submitLang[languageId].version} / Submission Language Setting`}
      </Typography>

      <SimpleBar
        title="Submission Language Information"
      >
        <AlignedText text="Language" childrenType="text">
          <Typography variant="body1">{submitLang[languageId].name}</Typography>
        </AlignedText>
        <AlignedText text="Version" childrenType="text">
          <Typography variant="body1">{submitLang[languageId].version}</Typography>
        </AlignedText>
        <AlignedText text="Status" childrenType="text">
          <Typography variant="body1">{(submitLang[languageId].is_disabled) ? 'Disabled' : 'Enabled'}</Typography>
        </AlignedText>
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
