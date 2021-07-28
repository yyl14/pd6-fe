import React from 'react';
import {
  Button, Card, CardContent, Divider, Grid, Typography,
} from '@material-ui/core';
import StarIcon from '@material-ui/icons/Star';
import StudentInfoCard from './StudentInfoCard';

export default function StudentInfo(props) {
  return (
    <div>
      <Grid className="userinfo-page-info-header">
        <Typography variant="h5">Student Information</Typography>
        <Button onClick={() => props.handleEdit()}>Edit</Button>
      </Grid>
      <Divider />
      <Grid direction="column" className="userinfo-page-studentinfo-content">
        <StudentInfoCard isDefault={1} id={props.defaultId} email={props.defaultMail} school={props.defaultSchool} />
        <StudentInfoCard isDefault={0} id={props.id2} email={props.mail2} school={props.school2} />
      </Grid>
    </div>
  );
}
