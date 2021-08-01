import React, { useState } from 'react';
import {
  Button, Divider, Grid, Typography, Card, CardContent, makeStyles,
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
  addButton: {
    alignSelf: 'center',
  },
}));

export default function EditStudentInfo(props) {
  const classes = useStyles();

  const editMode = true;
  const [defaultId, setDefaultId] = useState(props.defaultId);
  const [defaultMail, setDefaultMail] = useState(props.defaultMail);
  const [defaultSchool, setDefaultSchool] = useState(props.defaultSchool);
  const [id2, setId2] = useState(props.id2);
  const [mail2, setMail2] = useState(props.mail2);
  const [school2, setSchool2] = useState(props.school2);

  const setDefaultStatus = (id, mail, school) => {
    setDefaultId(id);
    setDefaultMail(mail);
    setDefaultSchool(school);
  };

  const setSecondStatus = (id, mail, school) => {
    setId2(id);
    setMail2(mail);
    setSchool2(school);
  };
  return (
    <div className={classes.root}>
      <Grid className={classes.header}>
        <Typography variant="h5">Student Information</Typography>
        <div>
          <Button onClick={() => {
            props.handleBack();
          }}
          >
            Cancel
          </Button>
          <Button
            color="primary"
            type="submit"
            onClick={() => {
              props.setDefaultStatus(defaultId, defaultMail, defaultSchool);
              props.setSecondStatus(id2, mail2, school2);
              props.handleBack();
            }}
          >
            Done
          </Button>
        </div>
      </Grid>
      <Divider />
      <Grid spacing={3} direction="column" className={classes.content}>
        <StudentInfoCard
          editMode
          isDefault={1}
          id={defaultId}
          email={defaultMail}
          school={defaultSchool}
        />
        <StudentInfoCard
          editMode
          isDefault={false}
          id={id2}
          email={mail2}
          school={school2}
          defaultId={defaultId}
          defaultMail={defaultMail}
          defaultSchool={defaultSchool}
          setDefaultStatus={setDefaultStatus}
          setSecondStatus={setSecondStatus}
        />
        <div className={classes.addButton}>
          <Button>+</Button>
        </div>
      </Grid>

    </div>
  );
}
