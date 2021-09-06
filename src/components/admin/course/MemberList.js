import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button } from '@material-ui/core';
import { useParams } from 'react-router-dom';
import { fetchCourses, fetchClasses } from '../../../actions/admin/course';
import { fetchClassMembers, fetchClassMemberWithAccountReferral } from '../../../actions/common/common';
import CustomTable from '../../ui/CustomTable';
import PageTitle from '../../ui/PageTitle';
import MemberEdit from './MemberEdit';
import NoMatch from '../../noMatch';
import systemRoleTransformation from '../../../function/systemRoleTransformation';

/* This is a level 4 component (page component) */
export default function MemberList() {
  const { courseId, classId } = useParams();

  const dispatch = useDispatch();

  const authToken = useSelector((state) => state.auth.token);
  const courses = useSelector((state) => state.courses);
  const classes = useSelector((state) => state.classes);
  const members = useSelector((state) => state.classMembers);
  const loading = useSelector((state) => state.loading.common.common);

  useEffect(() => {
    dispatch(fetchCourses(authToken));
  }, [authToken, dispatch]);

  useEffect(() => {
    dispatch(fetchClasses(authToken, courseId));
  }, [authToken, courseId, dispatch]);

  useEffect(() => {
    if (!loading.replaceClassMembers) {
      dispatch(fetchClassMembers(authToken, classId));
      dispatch(fetchClassMemberWithAccountReferral(authToken, classId));
    }
  }, [authToken, classId, dispatch, loading.replaceClassMembers]);

  const [edit, setEdit] = useState(false);
  const [tableData, setTableData] = useState([]);
  const [transformedData, setTransformedData] = useState([]);

  useEffect(() => {
    if (classes.byId[classId]) {
      const newData = classes.byId[classId].memberIds.map((id) => ({
        ...members.byId[id],
        path: `/admin/account/account/${id}/setting`,
        role: systemRoleTransformation(members.byId[id].role),
      }));
      setTableData(newData);
      setTransformedData(newData);
    } else {
      setTableData([]);
      setTransformedData([]);
    }
  }, [classes.byId, classId, members.byId]);

  if (courses.byId[courseId] === undefined || classes.byId[classId] === undefined) {
    if (loading.fetchCourses || loading.fetchClasses) {
      // still loading
      return <div>loading</div>;
    }
    return <NoMatch />;
  }

  return (
    <>
      <PageTitle text={`${courses.byId[courseId].name} / ${classes.byId[classId].name} / Member`} />
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
            buttons={(
              <>
                <Button onClick={() => setEdit(true)}>Edit</Button>
              </>
            )}
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
