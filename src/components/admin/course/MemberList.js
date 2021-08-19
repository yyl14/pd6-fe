import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  Typography,
  Button,
  makeStyles,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from '@material-ui/core';
import { BiFilterAlt } from 'react-icons/bi';
import { useParams, useHistory } from 'react-router-dom';
import { fetchCourses, fetchClasses } from '../../../actions/admin/course';
import { fetchClassMembers } from '../../../actions/common/common';
import CustomTable from '../../ui/CustomTable';
import TableFilterCard from '../../ui/TableFilterCard';
import MemberEdit from './MemberEdit';
import NoMatch from '../../noMatch';
import filterData from '../../../function/filter';
import sortData from '../../../function/sort';
import systemRoleTransformation from '../../../function/systemRoleTransformation';

const useStyles = makeStyles((theme) => ({
  pageHeader: {
    marginBottom: '50px',
  },

  filterButton: {
    justifyContent: 'space-between',
  },
  clearButton: {
    marginLeft: '24px',
  },
}));

/* This is a level 4 component (page component) */
export default function MemberList() {
  const { courseId, classId } = useParams();
  const history = useHistory();
  const classNames = useStyles();

  const dispatch = useDispatch();

  const authToken = useSelector((state) => state.auth.token);
  const courses = useSelector((state) => state.courses);
  const classes = useSelector((state) => state.classes);
  const members = useSelector((state) => state.classMembers);
  const loading = useSelector((state) => state.loading.admin.course);

  useEffect(() => {
    dispatch(fetchCourses(authToken));
  }, [authToken, dispatch]);

  useEffect(() => {
    dispatch(fetchClasses(authToken, courseId));
  }, [authToken, courseId, dispatch]);

  useEffect(() => {
    if (!loading.editMembers) {
      dispatch(fetchClassMembers(authToken, classId));
    }
  }, [authToken, classId, dispatch, loading.editMembers]);

  const [edit, setEdit] = useState(false);
  const [tableData, setTableData] = useState([]);
  const [transformedData, setTransformedData] = useState([]);
  const [showInstituteFilterDialog, setShowInstituteFilterDialog] = useState(false);
  const [showRoleFilterDialog, setShowRoleFilterDialog] = useState(false);
  const [instituteFilterInput, setInstituteFilterInput] = useState({
    filter: ['Select all'],
    sort: '(None)',
  });
  const [roleFilterInput, setRoleFilterInput] = useState({
    filter: ['Select all'],
    sort: '(None)',
  });

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

  const instituteFilterStatus = (input) => {
    const tempData = filterData(transformedData, 'institute_abbreviated_name', input.filter);
    const tempData2 = sortData(tempData, 'institute_abbreviated_name', input.sort);

    setTableData(tempData2);
  };

  const roleFilterStatus = (input) => {
    const tempData = filterData(transformedData, 'role', input.filter);
    const tempData2 = sortData(tempData, 'role', input.sort);

    setTableData(tempData2);
  };

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
          members={classes.byId[classId].memberIds.map((id) => members.byId[id])}
          backToMemberList={() => setEdit(false)}
          loading={loading}
        />
      ) : (
        <>
          <CustomTable
            hasSearch
            searchPlaceholder="Username / Student ID / Real Name"
            searchWidthOption={2}
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
            columnComponent={[
              null,
              null,
              null,
              <TableFilterCard
                key="showInstituteFilterDialog"
                popUp={showInstituteFilterDialog}
                setPopUp={setShowInstituteFilterDialog}
                filterInput={instituteFilterInput}
                filterOptions={['NTU', 'NTNU', 'NTUST']}
                setFilterInput={setInstituteFilterInput}
                doFilter={instituteFilterStatus}
              />,
              <TableFilterCard
                key="showRoleFilterDialog"
                popUp={showRoleFilterDialog}
                setPopUp={setShowRoleFilterDialog}
                filterInput={roleFilterInput}
                filterOptions={['Manager', 'Normal', 'Guest']}
                setFilterInput={setRoleFilterInput}
                doFilter={roleFilterStatus}
              />,
            ]}
          />
        </>
      )}
    </>
  );
}
