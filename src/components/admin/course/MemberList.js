import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Typography, makeStyles } from '@material-ui/core';
import { useParams } from 'react-router-dom';
import { fetchCourses, fetchClasses } from '../../../actions/admin/course';
import { fetchClassMembers } from '../../../actions/common/common';
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
            filterConfig={[
              {
                reduxStateId: 'username',
                label: 'Username',
                type: 'TEXT',
                operation: 'LIKE',
              },
              {
                reduxStateId: 'student_id',
                label: 'Student ID',
                type: 'TEXT',
                operation: 'LIKE',
              },
              {
                reduxStateId: 'real_name',
                label: 'Real Name',
                type: 'TEXT',
                operation: 'LIKE',
              },
              {
                reduxStateId: 'institute_abbreviated_name',
                label: 'Institute',
                type: 'ENUM',
                options: [
                  { value: 'NTU', label: 'NTU' },
                  { value: 'NTNU', label: 'NTNU' },
                  { value: 'NTUST', label: 'NTUST' },
                ],
              },
              {
                reduxStateId: 'role',
                label: 'Role',
                type: 'ENUM',
                options: [
                  { value: 'Guest', label: 'Guest' },
                  { value: 'Normal', label: 'Normal' },
                  { value: 'Manager', label: 'Manager' },
                ],
              },
            ]}
            refetch={(browseParams, ident) => {
              dispatch(fetchClassMembers(authToken, browseParams, ident, classId));
            }}
            refetchErrors={[error]}
            columns={[
              {
                name: 'Username',
                align: 'center',
                type: 'link',
              },
              {
                name: 'Student ID',
                align: 'center',
                type: 'string',
              },
              {
                name: 'Real Name',
                align: 'center',
                type: 'string',
              },
              {
                name: 'Institute',
                align: 'center',
                type: 'string',
              },
              {
                name: 'Role',
                align: 'center',
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
