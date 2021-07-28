import React, { useState } from 'react';
import {
  Typography, Button, Grid,
  Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField,
  FormControlLabel, Switch,
} from '@material-ui/core';
import Divider from '@material-ui/core/Divider';
import { makeStyles } from '@material-ui/core/styles';

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
  button: {
    position: 'absolute',
    top: '198px',
    right: '170px',
  },
}));

const LangSetting = () => {
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
      <Grid container className={classes.root}>
        <Grid container item className={classes.header}>
          <Typography className="language-setting-title" variant="h3">Python 3.8.1 / Submission Language Setting</Typography>
        </Grid>

        <Grid container item xs={6} direction="row" alignItems="center">
          <Typography className={classes.title} variant="h4">Change Institute Status</Typography>
          <Button className={classes.button} onClick={handleClick} color="secondary">Change Status</Button>
          <Divider variant="fullWidth" style={{ width: '1280px' }} />
          <Typography className={classes.body} variant="body1">Once you change the status, future submission will be affected. Please be certain.</Typography>
        </Grid>
      </Grid>

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
};

export default LangSetting;
