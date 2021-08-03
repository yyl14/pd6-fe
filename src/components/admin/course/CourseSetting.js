import React from 'react';
import { useSelector } from 'react-redux';
import { Typography, Button, makeStyles } from '@material-ui/core';
import { useParams } from 'react-router-dom';
import SimpleBar from '../../ui/SimpleBar';
import AlignedText from '../../ui/AlignedText';

const useStyles = makeStyles((theme) => ({
  informationRow: {
    display: 'flex',
    flexDirection: 'row',
  },
  informationItem: {
    width: '250px',
  },

  pageHeader: {
    marginBottom: '50px',
  },
}));

/* This is a level 4 component (page component) */
export default function CourseSetting() {
  const classes = useStyles();

  const { courseId } = useParams();
  const courses = useSelector((state) => state.admin.course.courses.byId);

  return (
    <>
      <Typography variant="h3" className={classes.pageHeader}>
        {`${courses[courseId].name} / Setting`}
      </Typography>
      <SimpleBar title="Course Information">
        <AlignedText text="Type" childrenType="text">
          <Typography variant="body1">{courses[courseId].type}</Typography>
        </AlignedText>
        <AlignedText text="Course Name" childrenType="text">
          <Typography variant="body1">{courses[courseId].name}</Typography>
        </AlignedText>
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
