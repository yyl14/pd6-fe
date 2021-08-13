import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  Typography,
  Button,
  makeStyles,
} from '@material-ui/core';
import { useParams, useHistory } from 'react-router-dom';
import { fetchCourses, fetchClasses, fetchMembers } from '../../../actions/admin/course';
import CustomTable from '../../ui/CustomTable';
import TableFilterCard from '../../ui/TableFilterCard';
import MemberEdit from './MemberEdit';
import NoMatch from '../../noMatch';
import filterData from '../../../function/filter';
import sortData from '../../../function/sort';

const useStyles = makeStyles((theme) => ({
  pageHeader: {
    marginBottom: '50px',
  },

  filterButton: {
    justifyContent: 'space-between',
  },
  // selectField: {
  //   width: '350px',
  // },
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

  const [edit, setEdit] = useState(false);
  const [tableData, setTableData] = useState([]);
  const [transformedData, setTransformedData] = useState([]);
  const [path, setPath] = useState([]);
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

  const roleUpperToLowerCase = (role) => {
    switch (role) {
      case 'MANAGER':
        return 'Manager';
      case 'NORMAL':
        return 'Normal';
      case 'GUEST':
        return 'Guest';
      default:
        return 'Unknown';
    }
  };

  useEffect(() => {
    const newData = [];
    const newPath = [];
    if (classes.byId[classId]) {
      classes.byId[classId].memberIds.forEach((id) => {
        const item = members.byId[id];
        const temp = { ...item };
        temp.path = `/admin/account/account/${temp.member_id}/setting`;
        temp.role = roleUpperToLowerCase(item.role);
        newData.push(temp);
        newPath.push(temp.path);
      });
    }
    setTableData(newData);
    setTransformedData(newData);
    setPath(newPath);
  }, [classes.byId, classId, members.byId]);

  const instituteFilterStatus = () => {
    const tempData = filterData(transformedData, 'institute_abbreviated_name', instituteFilterInput.filter);
    const tempData2 = sortData(tempData, 'institute_abbreviated_name', instituteFilterInput.sort);

    const newPath = [];
    tempData2.forEach((data) => {
      newPath.push(data.path);
    });
    setTableData(tempData2);
    setPath(newPath);
  };

  const roleFilterStatus = () => {
    const tempData = filterData(transformedData, 'role', roleFilterInput.filter);
    const tempData2 = sortData(tempData, 'role', roleFilterInput.sort);

    const newPath = [];
    tempData2.forEach((data) => {
      newPath.push(data.path);
    });
    setTableData(tempData2);
    setPath(newPath);
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
              <BiFilterAlt key="showInstituteFilterDialog" onClick={() => setShowInstituteFilterDialog(true)} />,
              <BiFilterAlt key="showRoleFilterDialog" onClick={() => setShowRoleFilterDialog(true)} />,
            ]}
            // hasLink
            // path={classes.byId[classId].memberIds.map((member) => `/admin/course/class/${courseId}/${classId}/member`)}
          />

          <Dialog open={showInstituteFilterDialog} maxWidth="md">
            <DialogTitle>
              <Typography variant="h4">Filter: Institute</Typography>
            </DialogTitle>
            <DialogContent>
              <AlignedText text="Filter by" maxWidth="md" childrenType="field">
                <FormControl variant="outlined" className={classNames.selectField}>
                  <Select
                    labelId="status"
                    value={instituteFilterInput.filter}
                    onChange={(e) => {
                      setInstituteFilterInput((input) => ({ ...input, filter: e.target.value }));
                    }}
                  >
                    <MenuItem value="(None)">(None)</MenuItem>
                    <MenuItem value="NTU">NTU</MenuItem>
                    <MenuItem value="NTNU">NTNU</MenuItem>
                    <MenuItem value="NTUST">NTUST</MenuItem>
                  </Select>
                </FormControl>
              </AlignedText>
              <AlignedText text="Sort by" maxWidth="md" childrenType="field">
                <FormControl variant="outlined" className={classNames.selectField}>
                  <Select
                    labelId="sort"
                    value={instituteFilterInput.sort}
                    onChange={(e) => {
                      setInstituteFilterInput((input) => ({ ...input, sort: e.target.value }));
                    }}
                  >
                    <MenuItem value="(None)">(None)</MenuItem>
                    <MenuItem value="A to Z">A to Z</MenuItem>
                    <MenuItem value="Z to A">Z to A</MenuItem>
                  </Select>
                </FormControl>
              </AlignedText>
            </DialogContent>
            <DialogActions className={classNames.filterButton}>
              <Button variant="outlined" onClick={instituteFilterClear} className={classNames.clearButton}>
                Clear
              </Button>
              <div>
                <Button onClick={() => setShowInstituteFilterDialog(false)} color="default">
                  Cancel
                </Button>
                <Button onClick={handleClickInstituteFilterSave} color="primary">
                  Save
                </Button>
              </div>
            </DialogActions>
          </Dialog>

          <Dialog open={showRoleFilterDialog} maxWidth="md">
            <DialogTitle>
              <Typography variant="h4">Filter: Role</Typography>
            </DialogTitle>
            <DialogContent>
              <AlignedText text="Filter by" maxWidth="md" childrenType="field">
                <FormControl variant="outlined" className={classNames.selectField}>
                  <Select
                    labelId="status"
                    value={roleFilterInput.filter}
                    onChange={(e) => {
                      setRoleFilterInput((input) => ({ ...input, filter: e.target.value }));
                    }}
                  >
                    <MenuItem value="(None)">(None)</MenuItem>
                    <MenuItem value="Manager">Manager</MenuItem>
                    <MenuItem value="Normal">Normal</MenuItem>
                    <MenuItem value="Guest">Guest</MenuItem>
                  </Select>
                </FormControl>
              </AlignedText>
              <AlignedText text="Sort by" maxWidth="md" childrenType="field">
                <FormControl variant="outlined" className={classNames.selectField}>
                  <Select
                    labelId="sort"
                    value={roleFilterInput.sort}
                    onChange={(e) => {
                      setRoleFilterInput((input) => ({ ...input, sort: e.target.value }));
                    }}
                  >
                    <MenuItem value="(None)">(None)</MenuItem>
                    <MenuItem value="A to Z">A to Z</MenuItem>
                    <MenuItem value="Z to A">Z to A</MenuItem>
                  </Select>
                </FormControl>
              </AlignedText>
            </DialogContent>
            <DialogActions className={classNames.filterButton}>
              <Button variant="outlined" onClick={roleFilterClear} className={classNames.clearButton}>
                Clear
              </Button>
              <div>
                <Button onClick={() => setShowRoleFilterDialog(false)} color="default">
                  Cancel
                </Button>
                <Button onClick={handleClickRoleFilterSave} color="primary">
                  Save
                </Button>
              </div>
            </DialogActions>
          </Dialog>
        </>
      )}
    </>
  );
}
