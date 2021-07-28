import React from 'react';
import { useSelector } from 'react-redux';
import { Typography, Button, makeStyles } from '@material-ui/core';
import { useParams } from 'react-router-dom';
import SimpleBar from '../../ui/SimpleBar';

const useStyles = makeStyles((theme) => ({}));

export default function ClassList() {
  const { courseId } = useParams();
  const courses = useSelector((state) => state.admin.course.courses.byId);

  return (
    <>
      <Typography variant="h3" style={{ marginBottom: '50px' }}>
        {`${courses[courseId].name}`}
      </Typography>
    </>
  );
}
