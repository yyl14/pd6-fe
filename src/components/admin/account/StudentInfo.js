import React from 'react';
import {
  Button, Card, CardContent, Divider, Grid, Typography, makeStyles,
} from '@material-ui/core';
import StarIcon from '@material-ui/icons/Star';
import StudentInfoCard from './StudentInfoCard';

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
    display: 'flex',
    width: '600px',
  },
}));

export default function StudentInfo(props) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid className={classes.header}>
        <Typography variant="h5">Student Information</Typography>
        <Button onClick={() => props.handleEdit()}>Edit</Button>
      </Grid>
      <Divider />
      <Grid direction="column" className={classes.content}>
        <StudentInfoCard isDefault={1} id={props.defaultId} email={props.defaultMail} school={props.defaultSchool} />
        <StudentInfoCard isDefault={0} id={props.id2} email={props.mail2} school={props.school2} />
      </Grid>
    </div>
  );
}
