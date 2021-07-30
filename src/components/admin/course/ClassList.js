import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Typography, Button, makeStyles } from '@material-ui/core';
import { useParams } from 'react-router-dom';
import SimpleBar from '../../ui/SimpleBar';
import DateRangePicker from '../../ui/DateRangePicker';

const useStyles = makeStyles((theme) => ({}));

export default function ClassList() {
  const { courseId } = useParams();
  const courses = useSelector((state) => state.admin.course.courses.byId);

  const [state, setState] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: 'selection',
    },
  ]);

  return (
    <>
      <Typography variant="h3" style={{ marginBottom: '50px' }}>
        {`${courses[courseId].name}`}
      </Typography>
      <Typography variant="h4">This is Class List</Typography>
    </>
  );
}
