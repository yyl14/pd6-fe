import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Typography, Button, makeStyles } from '@material-ui/core';
import { useParams } from 'react-router-dom';
import SimpleBar from '../../ui/SimpleBar';

import MemberEdit from './MemberEdit';

const useStyles = makeStyles((theme) => ({
  pageHeader: {
    marginBottom: '50px',
  },
}));

/* This is a level 4 component (page component) */
export default function MemberList() {
  const { courseId, classId } = useParams();
  const classNames = useStyles();

  const courses = useSelector((state) => state.admin.course.courses.byId);
  const classes = useSelector((state) => state.admin.course.classes.byId);

  const [edit, setEdit] = useState(false);

  return (
    <>
      <Typography variant="h3" className={classNames.pageHeader}>
        {`${courses[courseId].name} / ${classes[classId].name} / Member`}
      </Typography>
      {edit ? (
        <MemberEdit classId={classId} />
      ) : (
        <>
          {/* member list */}
          <Typography variant="h4">This is Member list</Typography>
        </>
      )}
    </>
  );
}
