import {
  Button, Divider, Grid, Typography, makeStyles,
} from '@material-ui/core';
import React from 'react';

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: '58px',
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

export default function BasicInfo(props) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid className={classes.header} xs={12}>
        <Typography variant="h5">Basic Information</Typography>
        <Button onClick={() => props.handleEdit()}>Edit</Button>
      </Grid>
      <Divider />
      <Grid container direction="row" className={classes.content}>
        <Grid container xs={3} spacing={2} direction="column" item>
          <Grid item>
            <Typography variant="body1">Real name</Typography>
          </Grid>
          <Grid item>
            <Typography variant="body1">Username</Typography>
          </Grid>
          <Grid item>
            <Typography variant="body1">Nickname</Typography>
          </Grid>
          <Grid item>
            <Typography variant="body1">Alternative Email</Typography>
          </Grid>
        </Grid>
        <Grid container xs={1} spacing={2} direction="column" item>
          <Grid item>
            <Typography variant="body1">{props.realName}</Typography>
          </Grid>
          <Grid item>
            <Typography variant="body1">{props.userName}</Typography>
          </Grid>
          <Grid item>
            <Typography variant="body1">{props.nickName}</Typography>
          </Grid>
          <Grid item>
            <Typography variant="body1">{props.altMail}</Typography>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}
