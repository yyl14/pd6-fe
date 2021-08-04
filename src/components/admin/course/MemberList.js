import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Typography, Button, makeStyles } from '@material-ui/core';
import { useParams, useHistory } from 'react-router-dom';
import { BiFilterAlt } from 'react-icons/bi';
import { fetchCourses, fetchClasses, fetchMembers } from '../../../actions/admin/course';
import SimpleBar from '../../ui/SimpleBar';
import CustomTable from '../../ui/CustomTable';
import MemberEdit from './MemberEdit';
import NoMatch from '../../noMatch';

const useStyles = makeStyles((theme) => ({
  pageHeader: {
    marginBottom: '50px',
  },
}));

/* This is a level 4 component (page component) */
export default function MemberList() {
  const { courseId, classId } = useParams();
  const history = useHistory();
  const classNames = useStyles();

  const dispatch = useDispatch();

  const authToken = useSelector((state) => state.auth.user.token);
  const courses = useSelector((state) => state.admin.course.courses);
  const classes = useSelector((state) => state.admin.course.classes);
  const members = useSelector((state) => state.admin.course.members);
  const loading = useSelector((state) => state.admin.course.loading);

  useEffect(() => {
    dispatch(fetchCourses(authToken));
    dispatch(fetchClasses(authToken, courseId));
    dispatch(fetchMembers(authToken, classId));
  }, [authToken, classId, courseId, dispatch]);

  // console.log(
  //   classes.byId[classId].memberIds.map((id) => ({
  //     ...members.byId[id],
  //     studentId: members.byId[id].memberId,
  //   })),
  //   members,
  // );

  const [edit, setEdit] = useState(false);
  // TODO: list of path, member data, table filter, link, search bar placeholder
  // const path = [
  //   //
  // ];
  // const memberData = [
  //   //
  // ];

  if (courses.byId[courseId] === undefined || classes.byId[courseId] === undefined) {
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
          members={classes.byId[classId].memberIds.map((id) => members.byId[id])}
          backToMemberList={() => setEdit(false)}
        />
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
            data={classes.byId[classId].memberIds.map((id) => ({
              ...members.byId[id],
              studentId: members.byId[id].student_id,
            }))}
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
            // hasLink
            // path={classes.byId[classId].memberIds.map((member) => `/admin/course/class/${courseId}/${classId}/member`)}
          />
        </>
      )}
    </>
  );
}
