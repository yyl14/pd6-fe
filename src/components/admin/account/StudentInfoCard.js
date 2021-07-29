import React from 'react';
import {
  Button, Card, CardContent, Divider, Grid, Typography, makeStyles,
} from '@material-ui/core';
import StarIcon from '@material-ui/icons/Star';
import { yellow } from '@material-ui/core/colors';

const useStyles = makeStyles((theme) => ({
  root: {
    marginBottom: '20px',
    width: '600px',
  },
  defaultHeader: {
    marginBottom: '10px',
  },
  defaultStar: {
    marginRight: '10px',
  },
  cardWords: {
    paddingTop: '10px',
    paddingLeft: '18px',
  },
  button: {
    alignSelf: 'flex-end',
  },
}));

export default function StudentInfoCard(props) {
  const classes = useStyles();
  const disabled = props.isDefault;

  const handleClick = () => {
    props.setSecondStatus(props.defaultId, props.defaultMail, props.defaultSchool);
    props.setDefaultStatus(props.id, props.email, props.school);
  };

  return (
    <div className={classes.root}>
      <Grid>
        <Grid container className={classes.defaultHeader} alignItems="center" direction="row">
          {props.isDefault ? <StarIcon style={{ color: 'ffe81e' }} className={classes.defaultStar} /> : <></>}
          <Typography variant="body1">
            {props.school}
          </Typography>
        </Grid>
        <Card variant="outlined">
          <CardContent>
            <Grid container spacing={2} direction="column" className={classes.cardWords}>
              <Grid container item spacing={10} direction="row">
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
                <Grid item className={classes.button}>
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
