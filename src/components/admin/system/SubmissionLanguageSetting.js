import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
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

const useStyle = makeStyles((theme) => ({
  pageHeader: {
    marginBottom: '50px',
  },
}));

/* This is a level 4 component (page component) */
export default function LangSetting() {
  const classes = useStyle();
  const { languageId } = useParams();
  const submitLang = useSelector((state) => state.admin.system.submitLang.byId);

  const [popUp, setPopUp] = useState(false);
  const [popUpDelete, setPopUpDelete] = useState(false);

  const handleClick = () => {
    setPopUp(true);
  };
  const handleClosePopUp = () => {
    setPopUp(false);
  };
  const handleSubmit = (e) => {};

  return (
    <>
      {/* TODO: use redux state to determine language name */}
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
            <Typography variant="body1">{submitLang[languageId].is_disabled}</Typography>
          </AlignedText>
        </Typography>
      </SimpleBar>

      <SimpleBar
        title="Change Institute Status"
        buttons={(
          <>
            <Button onClick={handleClick} color="secondary">
              Change Status
            </Button>
          </>
        )}
      >
        <Typography variant="body1">
          Once you change the status, future submission will be affected. Please be certain.
        </Typography>
      </SimpleBar>

      <Dialog open={popUp} keepMounted onClose={handleClosePopUp}>
        <DialogTitle>
          <Typography variant="h4">Change Submission Language</Typography>
        </DialogTitle>
        <DialogContent>
          <Grid container className="change-language-form" direction="row">
            <FormControlLabel control={<Switch color="primary" />} />
            <Typography variant="body1">Enable</Typography>
          </Grid>
        </DialogContent>
        <DialogContent>
          <Typography variant="body2">
            Once you change the status, future submission will be affected. Please be certain.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClosePopUp}>Cancel</Button>
          <Button onClick={(e) => handleSubmit()} color="secondary">
            Modify
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
