import {
  Button, Dialog, DialogTitle, DialogContent, Divider, Grid, Typography, DialogContentText, DialogActions, makeStyles,
} from '@material-ui/core';
import React, { useState } from 'react';

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: '2vh',
    marginLeft: '170px',
  },
  header: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  content: {
    marginTop: '3vh',
    marginLeft: '55px',
  },
}));

export default function DeleteAccount(props) {
  const classes = useStyles();
  const [popUp, setPopUp] = useState(false);

  return (
    <div className={classes.root}>
      <Grid className={classes.header}>
        <Typography variant="h5">Delete Account</Typography>
        <Button color="secondary" onClick={() => { setPopUp(true); }}>Delete</Button>
      </Grid>
      <Divider />
      <Typography className={classes.content}>
        Once you delete this account, there is no going back. Please be certain.
      </Typography>
      <Dialog
        open={popUp}
        keepMounted
        onClose={() => setPopUp(false)}
      >
        <DialogTitle>
          <Typography variant="h4">Delete account</Typography>
        </DialogTitle>
        <DialogContent>
          <DialogContentText variant="body1" color="secondary">
            <Grid container direction="column" spacing={2}>
              <Grid item container>
                <Grid container item xs={3} direction="column" spacing={2}>
                  <Grid item>
                    <Typography>Student ID</Typography>
                  </Grid>
                  <Grid item>
                    <Typography>Real Name</Typography>
                  </Grid>
                </Grid>
                <Grid container item xs direction="column" spacing={2}>
                  <Grid item>
                    <Typography>{props.id}</Typography>
                  </Grid>
                  <Grid item>
                    <Typography>{props.name}</Typography>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item>
                <Typography variant="body2" color="textPrimary">
                  Once you delete this account, there is no going back. Please be certain.
                </Typography>
              </Grid>
            </Grid>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setPopUp(false)}>Cancel</Button>
          <Button color="secondary" onClick={() => setPopUp(false)}>Delete</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
