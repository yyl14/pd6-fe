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
import {
  fetchCourses, fetchClasses, addCourse, addClass,
} from '../../../actions/admin/course';
import { fetchClassMembers } from '../../../actions/common/common';
import CustomTable from '../../ui/CustomTable';
import AlignedText from '../../ui/AlignedText';
import NoMatch from '../../noMatch';
import GeneralLoading from '../../GeneralLoading';

const useStyles = makeStyles(() => ({
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
  const authToken = useSelector((state) => state.auth.token);
  const courses = useSelector((state) => state.courses);
  const classes = useSelector((state) => state.classes);
  const loading = useSelector((state) => state.loading.admin.course);

  const [addCourseName, setAddCourseName] = useState('');
  const [addClassName, setAddClassName] = useState('');

  const [showAddClassDialog, setShowAddClassDialog] = useState(false);

  useEffect(() => {
    if (!loading.addCourse && !loading.deleteCourse && !loading.renameCourse) {
      dispatch(fetchCourses(authToken));
    }
  }, [authToken, dispatch, loading.addCourse, loading.deleteCourse, loading.renameCourse]);

  useEffect(() => {
    if (!loading.addClass && !loading.renameClass && !loading.deleteClass) {
      dispatch(fetchClasses(authToken, courseId));
    }
  }, [authToken, courseId, dispatch, loading.addClass, loading.deleteClass, loading.renameClass]);

  // fetch members under all classes to get member count
  useEffect(() => {
    if (courses.byId[courseId] && !loading.renameClass && !loading.deleteClass && !loading.addClass) {
      courses.byId[courseId].classIds.map((id) => dispatch(fetchClassMembers(authToken, id)));
    }
  }, [authToken, courseId, courses.byId, dispatch, loading.addClass, loading.deleteClass, loading.renameClass]);

  const getCourseType = (courseType) => {
    switch (courseType) {
      case 'lesson':
        return 'Lesson';
      case 'contest':
        return 'Contest';
      default:
        return 'Unknown';
    }
  };

  const onClickAddClass = () => {
    setShowAddClassDialog(true);
  };
  const onClickSetting = () => {
    history.push(`/admin/course/course/${courseId}/setting`);
  };
  const onAddCourse = (name) => {
    setAddCourseName('');
    history.push(`/admin/course/course/${courseId}/class-list`);
    dispatch(addCourse(authToken, name, getCourseType(addType).toUpperCase(), history));
  };
  const onAddClass = (name) => {
    setAddClassName('');
    setShowAddClassDialog(false);
    dispatch(addClass(authToken, courseId, name, false));
  };

  if (courses.byId[courseId] === undefined || courses.byId[courseId].name === undefined) {
    if (loading.fetchCourses) {
      // still loading
      return <GeneralLoading />;
    }
    return <NoMatch />;
  }

  return (
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
        data={
          courses.byId[courseId] !== undefined
            ? courses.byId[courseId].classIds.map((classId) => ({
              name: classes.byId[classId].name,
              memberCount: classes.byId[classId].memberIds.length,
              path: `/admin/course/class/${courseId}/${classId}/member`,
            }))
            : {}
        }
        columns={[
          {
            id: 'name',
            label: 'Class',
            minWidth: 100,
            width: 120,
            align: 'center',
          },
          {
            id: 'memberCount',
            label: 'Member Count',
            minWidth: 180,
            width: 120,
            align: 'center',
          },
        ]}
        hasLink
        linkName="path"
      />
      {/* add course is controlled by optional route param "addType" */}
      <Dialog open={addType !== undefined} maxWidth="md">
        <DialogTitle>
          <Typography variant="h4">Create a new course</Typography>
        </DialogTitle>
        <DialogContent>
          <AlignedText text="Type" maxWidth="md" childrenType="text">
            <Typography variant="body1">{getCourseType(addType)}</Typography>
          </AlignedText>
          <AlignedText text="Course Name" maxWidth="md" childrenType="field">
            <TextField value={addCourseName} onChange={(e) => setAddCourseName(e.target.value)} />
          </AlignedText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => history.push(`/admin/course/course/${courseId}/class-list`)}>Cancel</Button>
          <Button
            onClick={() => onAddCourse(addCourseName)}
            color="primary"
            disabled={getCourseType(addType) === 'Unknown'}
          >
            Create
          </Button>
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
          <AlignedText text="Class Name" childrenType="field">
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
  );
}
