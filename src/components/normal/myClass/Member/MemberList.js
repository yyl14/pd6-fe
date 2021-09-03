import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Typography, Button, makeStyles } from '@material-ui/core';
import { useParams } from 'react-router-dom';
import {
  fetchCourse,
  fetchClass,
  fetchClassMembers,
  fetchClassMemberWithAccountReferral,
} from '../../../../actions/common/common';
import CustomTable from '../../../ui/CustomTable';
import MemberEdit from './MemberEdit';
import NoMatch from '../../../noMatch';
import systemRoleTransformation from '../../../../function/systemRoleTransformation';
import GeneralLoading from '../../../GeneralLoading';

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
  const loading = useSelector((state) => state.loading.common.common);
  const userClasses = useSelector((state) => state.user.classes);

  useEffect(() => {
    dispatch(fetchCourse(authToken, courseId));
  }, [authToken, courseId, dispatch]);

  useEffect(() => {
    dispatch(fetchClass(authToken, classId));
  }, [authToken, classId, dispatch]);

  useEffect(() => {
    if (!loading.replaceClassMembers) {
      dispatch(fetchClassMembers(authToken, classId));
      dispatch(fetchClassMemberWithAccountReferral(authToken, classId));
    }
  }, [authToken, classId, dispatch, loading.replaceClassMembers]);

  const [edit, setEdit] = useState(false);
  const [tableData, setTableData] = useState([]);
  const [transformedData, setTransformedData] = useState([]);
  const [isManager, setIsManager] = useState(false);

  useEffect(() => {
    if (classes.byId[classId]) {
      const newData = classes.byId[classId].memberIds.map((id) => ({
        ...members.byId[id],
        // path: `/admin/account/account/${id}/setting`,
        role: systemRoleTransformation(members.byId[id].role),
      }));
      setTableData(newData);
      setTransformedData(newData);
    } else {
      setTableData([]);
      setTransformedData([]);
    }
  }, [classes.byId, classId, members.byId]);

  useEffect(() => {
    userClasses.map((item) => {
      if (`${item.class_id}` === classId) {
        if (item.role === 'MANAGER') {
          setIsManager(true);
        }
      }
      return <></>;
    });
  }, [classId, userClasses]);

  if (courses.byId[courseId] === undefined || classes.byId[classId] === undefined) {
    if (
      loading.fetchCourse
      || loading.fetchClass
      || loading.fetchClassMembers
      || loading.fetchClassMemberWithAccountReferral
    ) {
      // still loading
      return <GeneralLoading />;
    }
    return <NoMatch />;
  }

  return (
    <>
      <Typography variant="h3" className={classNames.pageHeader}>
        {`${courses.byId[courseId].name} ${classes.byId[classId].name} / Member`}
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
          <CustomTable
            hasSearch
            buttons={
              isManager ? (
                <>
                  <Button onClick={() => setEdit(true)}>Edit</Button>
                </>
              ) : (
                <></>
              )
            }
            data={tableData}
            columns={[
              {
                id: 'username',
                label: 'Username',
                minWidth: 150,
                width: 200,
                align: 'center',
                type: 'link',
                link_id: 'path',
              },
              {
                id: 'student_id',
                label: 'Student ID',
                minWidth: 105,
                width: 155,
                align: 'center',
                type: 'string',
              },
              {
                id: 'real_name',
                label: 'Real Name',
                minWidth: 96,
                width: 144,
                align: 'center',
                type: 'string',
              },
              {
                id: 'institute_abbreviated_name',
                label: 'Institute',
                minWidth: 109,
                width: 165,
                align: 'center',
                type: 'string',
              },
              {
                id: 'role',
                label: 'Role',
                minWidth: 71,
                width: 127,
                align: 'center',
                type: 'string',
              },
            ]}
          />
        </>
      )}
    </>
  );
}
