import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  Typography,
  Button,
  makeStyles,
  Dialog,
  DialogTitle,
  DialogActions,
  DialogContent,
  TextField,
} from '@material-ui/core';
import { useHistory, useParams } from 'react-router-dom';
import { MdAdd } from 'react-icons/md';
import * as courseActions from '../../../actions/admin/course';
import SimpleBar from '../../ui/SimpleBar';
import DateRangePicker from '../../ui/DateRangePicker';
import CustomTable from '../../ui/CustomTable';
import AlignedText from '../../ui/AlignedText';
import NoMatch from '../../noMatch';

const useStyles = makeStyles((theme) => ({
  pageHeader: {
    marginBottom: '50px',
  },
  dialog: {},
}));

/* This is a level 4 component (page component) */
export default function ClassList() {
  const { courseId, addType } = useParams();
  const history = useHistory();
  const classNames = useStyles();

  const dispatch = useDispatch();

  const authToken = useSelector((state) => state.auth.user.token);
  const courses = useSelector((state) => state.admin.course.courses);
  const classes = useSelector((state) => state.admin.course.classes);
  const loading = useSelector((state) => state.admin.course.loading);

  const [addClassName, setAddClassName] = useState('');

  const [showAddClassDialog, setShowAddClassDialog] = useState(false);

  useEffect(() => {
    // dispatch(courseActions.fetchCourses(authToken));
    dispatch(courseActions.fetchClasses(authToken, courseId));
  }, [authToken, courseId, dispatch]);

  const onClickAddClass = () => {
    setShowAddClassDialog(true);
  };
  const onClickSetting = () => {
    history.push(`/admin/course/course/${courseId}/setting`);
  };
  const onAddClass = (name) => {
    setAddClassName('');
    setShowAddClassDialog(false);
    dispatch(courseActions.addClass(authToken, courseId, name, false));
  };
  console.log(courses.byId, classes.byId);

  return courses.byId[courseId] !== undefined ? (
    <>
      <Typography className={classNames.pageHeader} variant="h3">
        {`${courses.byId[courseId].name}`}
      </Typography>
      <CustomTable
        searchPlaceholder="Class"
        buttons={(
          <>
            <Button onClick={onClickSetting}>Setting</Button>
            <Button color="primary" onClick={onClickAddClass}>
              <MdAdd />
            </Button>
          </>
        )}
        data={courses.byId[courseId].classIds.map((classId) => ({
          name: classes.byId[classId].name,
          memberCount: classes.byId[classId].memberIds.length,
        }))}
        columns={[
          {
            id: 'name',
            label: 'Class',
            minWidth: 100,
            align: 'center',
          },
          {
            id: 'memberCount',
            label: 'Member Count',
            minWidth: 180,
            align: 'center',
          },
        ]}
        hasFilter={[false, false]}
        dataColumnName={['name', 'memberCount']}
        hasLink
        path={courses.byId[courseId].classIds.map((classId) => `/admin/course/class/${courseId}/${classId}/member`)}
      />
      <Dialog open={addType} maxWidth="md">
        <DialogTitle>
          <Typography variant="h4">Create a new course</Typography>
        </DialogTitle>
        <DialogContent>
          <AlignedText text="Type" childrenType="text">
            <Typography variant="body1">Lesson</Typography>
          </AlignedText>
          <AlignedText text="Course Name" childrenType="field">
            <TextField />
          </AlignedText>
        </DialogContent>
        <DialogActions>
          <Button>Cancel</Button>
          <Button color="primary">Create</Button>
        </DialogActions>
      </Dialog>
      <Dialog open={showAddClassDialog || loading.addClass} maxWidth="md">
        <DialogTitle>
          <Typography variant="h4">Create a new class</Typography>
        </DialogTitle>
        <DialogContent>
          <AlignedText text="Type" childrenType="text">
            <Typography variant="body1">Lesson</Typography>
          </AlignedText>
          <AlignedText text="Course" childrenType="text">
            <Typography variant="body1">{courses.byId[courseId].name}</Typography>
          </AlignedText>
          <AlignedText text="Course Name" childrenType="field">
            <TextField value={addClassName} onChange={(e) => setAddClassName(e.target.value)} />
          </AlignedText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowAddClassDialog(false)}>Cancel</Button>
          <Button color="primary" onClick={() => onAddClass(addClassName)} disabled={loading.addClass}>
            Create
          </Button>
        </DialogActions>
      </Dialog>
    </>
  ) : (
    <NoMatch />
  );
}
