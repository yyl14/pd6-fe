import React, { useState } from 'react';
import {
  Typography, Button, Grid,
  Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField,
  FormControlLabel, Switch,
} from '@material-ui/core';
import Divider from '@material-ui/core/Divider';
import { makeStyles } from '@material-ui/core/styles';

import SimpleBar from '../../ui/SimpleBar';

const useStyle = makeStyles((theme) => ({
  root: {
    marginLeft: '170px',
  },
  header: {
    marginTop: '95px',
  },
  title: {
    marginTop: '58px',
    marginBottom: '9px',

  },
  body: {
    marginTop: '30px',
    marginLeft: '50px',
  },
}));

export default function LangSetting() {
  const classes = useStyle();
  const [popUp, setPopUp] = useState(false);
  const [popUpDelete, setPopUpDelete] = useState(false);
  const handleClick = () => {
    setPopUp(true);
  };
  const handleClosePopUp = () => {
    setPopUp(false);
  };
  const handleSubmit = (e) => {

  };

  return (
    <div className="language-setting">
      <Typography className="language-setting-title" variant="h3">Python 3.8.1 / Submission Language Setting</Typography>
      <SimpleBar
        title="Change Institute Status"
        buttons={(
          <>
            <Button onClick={handleClick} color="secondary">Change Status</Button>
          </>
          )}
      >
        <Typography className={classes.body} variant="body1">Once you change the status, future submission will be affected. Please be certain.</Typography>
      </SimpleBar>

      <Dialog open={popUp} keepMounted onClose={handleClosePopUp}>
        <DialogTitle>
          <Typography variant="h4">Change Submission Language</Typography>
        </DialogTitle>
        <DialogContent>
          <Grid container className="change-language-form" direction="row">
            <FormControlLabel
              control={(
                <Switch color="primary" />)}
            />
            <Typography variant="body1">Enable</Typography>
          </Grid>
        </DialogContent>
        <DialogContent>
          <Typography variant="body2">Once you change the status, future submission will be affected. Please be certain.</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClosePopUp}>Cancel</Button>
          <Button onClick={(e) => handleSubmit()} color="secondary">Modify</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
