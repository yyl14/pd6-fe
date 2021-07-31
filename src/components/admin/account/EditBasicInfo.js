import {
  Button, Divider, Grid, TextField, Typography, Box, makeStyles,
} from '@material-ui/core';
import React, { useState } from 'react';

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
    marginTop: '1vh',
    marginLeft: '55px',
  },
  contentLeft: {
    paddingTop: '23px',
    marginRight: '18px',
  },
  contentRight: {
    display: 'flex',
    width: '350px',
  },
}));

export default function EditBasicInfo(props) {
  const [realName, setRealName] = useState(props.realName);
  const [userName, setUserName] = useState(props.userName);
  const [nickName, setNickName] = useState(props.nickName);
  const [altMail, setAltMail] = useState(props.altMail);
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid className={classes.header}>
        <Typography variant="h5">Basic Information</Typography>
        <div>
          <Button onClick={() => props.handleBack()}>Cancel</Button>
          <Button
            color="primary"
            type="submit"
            onClick={() => {
              props.setBasicInfo(realName, userName, nickName, altMail);
              props.handleBack();
            }}
          >
            Done
          </Button>
        </div>
      </Grid>
      <Divider />

      <Grid container direction="row" className={classes.content}>
        <Grid container item spacing={10} xs={3} direction="column" className={classes.contentLeft}>
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
        <Grid item className={classes.contentRight} direction="column">
          <TextField
            value={realName}
            variant="outlined"
            onChange={(e) => setRealName(e.target.value)}
          />
          <TextField
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
          />
          <TextField
            value={nickName}
            onChange={(e) => setNickName(e.target.value)}
          />
          <TextField
            value={altMail}
            onChange={(e) => setAltMail(e.target.value)}
          />
        </Grid>
      </Grid>
    </div>
  );
}
