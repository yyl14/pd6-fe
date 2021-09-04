import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Typography, Button, makeStyles } from '@material-ui/core';
import { useParams } from 'react-router-dom';
import { fetchCourses, fetchClasses } from '../../../actions/admin/course';
import { fetchClassMembers, fetchClassMemberWithAccountReferral } from '../../../actions/common/common';
import AutoTable from '../../ui/AutoTable';
import MemberEdit from './MemberEdit';
import NoMatch from '../../noMatch';
import systemRoleTransformation from '../../../function/systemRoleTransformation';

const useStyles = makeStyles(() => ({
  pageHeader: {
    marginBottom: '50px',
  },
}));

/* This is a level 4 component (page component) */
export default function MemberList() {
  const { courseId, classId } = useParams();
  const classNames = useStyles();

  const dispatch = useDispatch();

  const authToken = useSelector((state) => state.auth.token);
  const courses = useSelector((state) => state.courses);
  const classes = useSelector((state) => state.classes);
  const members = useSelector((state) => state.classMembers);
  const loading = useSelector((state) => state.loading.admin.course);
  const error = useSelector((state) => state.error.common.common.fetchClassMembers);

  useEffect(() => {
    dispatch(fetchCourses(authToken));
  }, [authToken, dispatch]);

  useEffect(() => {
    dispatch(fetchClasses(authToken, courseId));
  }, [authToken, courseId, dispatch]);

  const [edit, setEdit] = useState(false);

  if (courses.byId[courseId] === undefined || classes.byId[classId] === undefined) {
    if (loading.fetchCourses || loading.fetchClasses) {
      // still loading
      return <div>loading</div>;
    }
    return <NoMatch />;
  }

  return (
    <>
      <Typography variant="h3" className={classNames.pageHeader}>
        {`${courses.byId[courseId].name} / ${classes.byId[classId].name} / Member`}
      </Typography>
      {edit ? (
        <MemberEdit
          dispatch={dispatch}
          authToken={authToken}
          classId={classId}
          members={classes.byId[classId].memberIds.map((id) => members.byId[id])}
          backToMemberList={() => setEdit(false)}
          loading={loading}
        />
      ) : (
        <>
          <AutoTable
            ident="Class Member Table"
            hasFilter
            buttons={<Button onClick={() => setEdit(true)}>Edit</Button>}
            filterConfig={[
              // {
              //   reduxStateId: 'username',
              //   label: 'Username',
              //   type: 'TEXT',
              //   operation: 'LIKE',
              // },
              // {
              //   reduxStateId: 'student_id',
              //   label: 'Student ID',
              //   type: 'TEXT',
              //   operation: 'LIKE',
              // },
              // {
              //   reduxStateId: 'real_name',
              //   label: 'Real Name',
              //   type: 'TEXT',
              //   operation: 'LIKE',
              // },
              // {
              //   reduxStateId: 'institute_abbreviated_name',
              //   label: 'Institute',
              //   type: 'ENUM',
              //   operation: 'IN',
              //   options: [
              //     { value: 'NTU', label: 'NTU' },
              //     { value: 'NTNU', label: 'NTNU' },
              //     { value: 'NTUST', label: 'NTUST' },
              //   ],
              // },
              {
                reduxStateId: 'role',
                label: 'Role',
                type: 'ENUM',
                operation: 'IN',
                options: [
                  { value: 'GUEST', label: 'Guest' },
                  { value: 'NORMAL', label: 'Normal' },
                  { value: 'MANAGER', label: 'Manager' },
                ],
              },
            ]}
            refetch={(browseParams, ident) => {
              dispatch(fetchClassMembers(authToken, classId, browseParams, ident));
              dispatch(fetchClassMemberWithAccountReferral(authToken, classId));
            }}
            refetchErrors={[error]}
            columns={[
              {
                name: 'Username',
                align: 'center',
                width: 200,
                type: 'link',
              },
              {
                name: 'Student ID',
                align: 'center',
                width: 155,
                type: 'string',
              },
              {
                name: 'Real Name',
                align: 'center',
                width: 144,
                type: 'string',
              },
              {
                name: 'Institute',
                align: 'center',
                width: 165,
                type: 'string',
              },
              {
                name: 'Role',
                align: 'center',
                width: 127,
                type: 'string',
              },
            ]}
            reduxData={members}
            reduxDataToRows={(item) => ({
              id: item.member_id,
              Username: {
                text: item.username,
                path: `my-class/${courseId}/${classId}/member`,
              },
              'Student ID': item.student_id,
              'Real Name': item.real_name,
              Institute: item.institute_abbreviated_name,
              Role: systemRoleTransformation(item.role),
            })}
          />
        </>
      )}
    </>
  );
}
