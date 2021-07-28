import {
  Button, Divider, Grid, Typography,
} from '@material-ui/core';
import React from 'react';

export default function BasicInfo(props) {
  return (
    <div className="userinfo-page-basicinfo-container">
      <Grid className="userinfo-page-info-header" xs={12}>
        <Typography variant="h5">Basic Information</Typography>
        <Button onClick={() => props.handleEdit()}>Edit</Button>
      </Grid>
      <Divider />
      <Grid container direction="row" className="userinfo-page-basicinfo-content">
        {/* <Grid > */}
        <Grid container xs={3} spacing={2} direction="column" item className="userinfo-page-basicinfo-content-left">
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
        {/* </Grid> */}
        {/* <Grid item className="userinfo-page-basicinfo-content-right"> */}
        <Grid container xs={1} spacing={2} direction="column" item className="userinfo-page-basicinfo-content-right">
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
        {/* </Grid> */}
      </Grid>
    </div>
  );
}
