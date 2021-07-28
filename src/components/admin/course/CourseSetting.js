import React from 'react';
import { useSelector } from 'react-redux';
import { Typography, Button, makeStyles } from '@material-ui/core';
import { useParams } from 'react-router-dom';
import SimpleBar from '../../ui/SimpleBar';

const useStyles = makeStyles((theme) => ({
  informationRow: {
    display: 'flex',
    flexDirection: 'row',
  },
  informationItem: {
    width: '250px',
  },
}));

export default function CourseSetting() {
  const classes = useStyles();

  const { courseId } = useParams();
  const courses = useSelector((state) => state.admin.course.courses.byId);

  return (
    <>
      <Typography variant="h3" style={{ marginBottom: '50px' }}>
        {`${courses[courseId].name}/ Setting`}
      </Typography>
      <SimpleBar title="Course Information">
        <p>
          <div className={classes.informationRow}>
            <div className={classes.informationItem}>
              <Typography variant="body1">Type</Typography>
            </div>
            <div className={classes.informationItem}>
              <Typography variant="body1">{courses[courseId].type}</Typography>
            </div>
          </div>
        </p>
        <p>
          <div className={classes.informationRow}>
            <div className={classes.informationItem}>
              <Typography variant="body1">Course Name</Typography>
            </div>
            <div className={classes.informationItem}>
              <Typography variant="body1">{courses[courseId].name}</Typography>
            </div>
          </div>
        </p>
      </SimpleBar>

      <SimpleBar
        title="Change Course Name"
        buttons={(
          <>
            <Button color="secondary">Rename</Button>
          </>
        )}
      >
        <Typography variant="body1">
          Once you change the course name, all related classes will be change their names. Please be certain.
        </Typography>
      </SimpleBar>
      <SimpleBar
        title="Delete Course"
        buttons={(
          <>
            <Button color="secondary">Delete</Button>
          </>
        )}
      >
        <Typography variant="body1">Once you delete a course, there is no going back. Please be certain.</Typography>
      </SimpleBar>
    </>
  );
}
