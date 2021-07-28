import React from 'react';
import {
  Button, Card, CardContent, Divider, Grid, Typography,
} from '@material-ui/core';
import StarIcon from '@material-ui/icons/Star';
import { yellow } from '@material-ui/core/colors';

export default function StudentInfoCard(props) {
  const disabled = props.isDefault;

  const handleClick = () => {
    props.setSecondStatus(props.defaultId, props.defaultMail, props.defaultSchool);
    props.setDefaultStatus(props.id, props.email, props.school);
  };

  return (
    <div>
      <Grid className="userinfo-page-studentinfo-block">
        <Grid container className="studentinfo-default-school-header" alignItems="center" direction="row">
          {props.isDefault ? <StarIcon style={{ color: 'ffe81e' }} className="studentinfo-default-star" /> : <></>}
          <Typography variant="body1">
            {props.school}
          </Typography>
        </Grid>
        <Card variant="outlined">
          <CardContent>
            <Grid container spacing={2} className="studentinfo-card" direction="column">
              <Grid container item spacing={10} direction="row" className="studentinfo-card-words">
                <Grid container item xs={5} direction="column" spacing={2}>
                  <Grid item><Typography variant="body1">Student ID</Typography></Grid>
                  <Grid item><Typography variant="body1">Email</Typography></Grid>
                </Grid>
                <Grid container item xs direction="column" spacing={2}>
                  <Grid item><Typography variant="body1">{props.id}</Typography></Grid>
                  <Grid item><Typography variant="body1">{props.email}</Typography></Grid>
                </Grid>
              </Grid>
              {props.editMode ? (
                <Grid item className="studentinfo-card-defaultbutton">
                  <Button disabled={disabled} onClick={() => handleClick()}>Set as Default</Button>
                </Grid>
              ) : <></>}
            </Grid>
          </CardContent>
        </Card>
      </Grid>
    </div>
  );
}
