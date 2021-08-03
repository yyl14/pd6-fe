import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Typography, Button, makeStyles } from '@material-ui/core';
import { useParams } from 'react-router-dom';
import { BiFilterAlt } from 'react-icons/bi';
import SimpleBar from '../../ui/SimpleBar';
import CustomTable from '../../ui/CustomTable';
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
  // TODO: list of path, member data, table filter, link, search bar placeholder
  const path = [
    //
  ];
  const memberData = [
    //
  ];

  return (
    <>
      <Typography variant="h3" className={classNames.pageHeader}>
        {`${courses[courseId].name} / ${classes[classId].name} / Member`}
      </Typography>
      {edit ? (
        <MemberEdit classId={classId} backToMemberList={() => setEdit(false)} />
      ) : (
        <>
          <CustomTable
            hasSearch
            searchPlaceholder="Username / Student ID / Real Name"
            buttons={(
              <>
                <Button onClick={() => setEdit(true)}>Edit</Button>
              </>
            )}
            data={memberData}
            columns={[
              {
                id: 'username',
                label: 'Username',
                minWidth: 150,
                width: 200,
                align: 'center',
              },
              {
                id: 'studentId',
                label: 'Student ID',
                minWidth: 105,
                width: 155,
                align: 'center',
              },
              {
                id: 'realName',
                label: 'Real Name',
                minWidth: 90,
                width: 144,
                align: 'center',
              },
              {
                id: 'institute',
                label: 'Institute',
                minWidth: 109,
                width: 165,
                align: 'center',
              },
              {
                id: 'role',
                label: 'Role',
                minWidth: 71,
                width: 127,
                align: 'center',
              },
            ]}
            // columnComponent={[null, null, null, (<BiFilterAlt key="filter" onClick={[]} />), (<BiFilterAlt key="filter" onClick={[]} />)]}
            hasFilter={[false, false, false, true, true]}
            dataColumnName={['username', 'studentId', 'realName', 'institute', 'role']}
            hasLink
            path={path}
          />
        </>
      )}
    </>
  );
}
