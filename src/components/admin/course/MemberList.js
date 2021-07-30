import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Typography, Button } from '@material-ui/core';
import { useParams } from 'react-router-dom';
import SimpleBar from '../../ui/SimpleBar';

import MemberEdit from './MemberEdit';

export default function MemberList() {
  const { courseId, classId } = useParams();
  const courses = useSelector((state) => state.admin.course.courses.byId);
  const classes = useSelector((state) => state.admin.course.classes.byId);

  const [edit, setEdit] = useState(false);

  return (
    <>
      <Typography variant="h3" style={{ marginBottom: '50px' }}>
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
