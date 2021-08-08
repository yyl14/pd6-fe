import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import {
  Typography,
  Button,
  Grid,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
  makeStyles,
} from '@material-ui/core';
import {
  fetchCourses, fetchClasses, fetchMembers, renameClass, deleteClass,
} from '../../../actions/admin/course';
import SimpleBar from '../../ui/SimpleBar';
import AlignedText from '../../ui/AlignedText';
import NoMatch from '../../noMatch';

const useStyles = makeStyles((theme) => ({
  pageHeader: {
    marginBottom: '50px',
  },
}));

/* This is a level 4 component (page component) */
const ClassSetting = () => {
  const classNames = useStyles();
  const { courseId, classId } = useParams();
  const history = useHistory();

  const dispatch = useDispatch();
  const thisState = useSelector((state) => state);
  const authToken = useSelector((state) => state.auth.user.token);
  const courses = useSelector((state) => state.admin.course.courses);
  const classes = useSelector((state) => state.admin.course.classes);
  const loading = useSelector((state) => state.admin.course.loading);

  const [showRenameDialog, setShowRenameDialog] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [newClassName, setNewClassName] = useState('');

  useEffect(() => {
    dispatch(fetchCourses(authToken));
    dispatch(fetchClasses(authToken, courseId));
    // dispatch(fetchMembers(authToken, classId));
  }, [authToken, classId, courseId, dispatch]);

  useEffect(() => {
    if (!loading.renameClass) {
      dispatch(fetchClasses(authToken, courseId));
    }
  });

  const getCourseType = (courseType) => {
    switch (courseType) {
      case 'LESSON':
        return 'Lesson';
      case 'CONTEST':
        return 'Contest';
      default:
        return 'Unknown';
    }
  };

  const onRename = () => {
    setShowRenameDialog(false);
    dispatch(renameClass(authToken, classId, newClassName, false));
  };
  const onDelete = () => {
    setShowDeleteDialog(false);
    dispatch(deleteClass(authToken, courseId, classId));
    history.push(`/admin/course/course/${courseId}/class-list/`);
  };

  if (courses.byId[courseId] === undefined || classes.byId[classId] === undefined) {
    if (loading.fetchCourses || loading.fetchClasses) {
      // still loading
      return <div>loading</div>;
    }
    return <NoMatch />;
  }

  return (
    <div className="class-setting">
      <Typography variant="h3" className={classNames.pageHeader}>
        {`${courses.byId[courseId].name} / ${classes.byId[classId].name} / Setting`}
      </Typography>

      <SimpleBar title="Course Information">
        <AlignedText text="Type" maxWidth="lg" childrenType="text">
          <Typography variant="body1">{getCourseType(courses.byId[courseId].type)}</Typography>
        </AlignedText>
        <AlignedText text="Course Name" maxWidth="lg" childrenType="text">
          <Typography variant="body1">{courses.byId[courseId].name}</Typography>
        </AlignedText>
        <AlignedText text="Class Name" maxWidth="lg" childrenType="text">
          <Typography variant="body1">{classes.byId[classId].name}</Typography>
        </AlignedText>
      </SimpleBar>

      <SimpleBar
        title="Rename Class"
        childrenButtons={(
          <>
            <Button onClick={() => setShowRenameDialog(true)} color="secondary">
              Rename
            </Button>
          </>
        )}
      >
        <Typography variant="body1">
          Once you change the class name, all related information will be affected. Please be certain.
        </Typography>
      </SimpleBar>

      <SimpleBar
        title="Delete Class"
        childrenButtons={(
          <>
            <Button onClick={() => setShowDeleteDialog(true)} color="secondary">
              Delete
            </Button>
          </>
        )}
      >
        <Typography variant="body1">Once you delete a class, there is no going back. Please be certain.</Typography>
      </SimpleBar>

      <Dialog open={showRenameDialog || loading.renameClass} maxWidth="md">
        <DialogTitle>
          <Typography variant="h4">Rename class</Typography>
        </DialogTitle>
        <DialogContent>
          <AlignedText text="Type" maxWidth="md" childrenType="text">
            <Typography variant="body1">{courses.byId[courseId].type}</Typography>
          </AlignedText>
          <AlignedText text="Course" maxWidth="md" childrenType="text">
            <Typography variant="body1">{courses.byId[courseId].name}</Typography>
          </AlignedText>
          <AlignedText text="Current Name" maxWidth="md" textColor="secondary" childrenType="text">
            <Typography variant="body1">{classes.byId[classId].name}</Typography>
          </AlignedText>
          <AlignedText text="New Name" maxWidth="md" childrenType="field">
            <TextField
              style={{ width: '350px' }}
              variant="outlined"
              onChange={(e) => setNewClassName(e.target.value)}
            />
          </AlignedText>
        </DialogContent>
        <DialogContent>
          <Typography variant="body2">
            Once you change class name, all related information will be affected. Please be certain.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowRenameDialog(false)}>Cancel</Button>
          <Button onClick={onRename} color="secondary" disabled={loading.renameClass}>
            Rename
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={showDeleteDialog || loading.deleteClass} maxWidth="md">
        <DialogTitle>
          <Typography variant="h4">Delete class</Typography>
        </DialogTitle>
        <DialogContent>
          <AlignedText text="Type" maxWidth="md" childrenType="text">
            <Typography variant="body1">{courses.byId[courseId].type}</Typography>
          </AlignedText>
          <AlignedText text="Course" maxWidth="md" childrenType="text">
            <Typography variant="body1">{courses.byId[courseId].name}</Typography>
          </AlignedText>
          <AlignedText text="Class" maxWidth="md" textColor="secondary" childrenType="text">
            <Typography variant="body1">{classes.byId[classId].name}</Typography>
          </AlignedText>
        </DialogContent>
        <DialogContent>
          <Typography variant="body2">Once you delete a class, there is no going back. Please be certain.</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowDeleteDialog(false)}>Cancel</Button>
          <Button onClick={onDelete} color="secondary" disabled={loading.deleteClass}>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default ClassSetting;
