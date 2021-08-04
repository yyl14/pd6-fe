import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  Typography,
  TextField,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  makeStyles,
} from '@material-ui/core';
import { useHistory, useParams } from 'react-router-dom';

import { fetchCourses, renameCourse, deleteCourse } from '../../../actions/admin/course';
import SimpleBar from '../../ui/SimpleBar';
import AlignedText from '../../ui/AlignedText';

const useStyles = makeStyles((theme) => ({
  informationRow: {
    display: 'flex',
    flexDirection: 'row',
  },
  informationItem: {
    width: '250px',
  },

  pageHeader: {
    marginBottom: '50px',
  },
}));

/* This is a level 4 component (page component) */
export default function CourseSetting() {
  const classNames = useStyles();

  const { courseId } = useParams();
  const history = useHistory();
  const authToken = useSelector((state) => state.auth.user.token);
  const courses = useSelector((state) => state.admin.course.courses.byId);
  const loading = useSelector((state) => state.admin.course.loading);
  const dispatch = useDispatch();

  const [showRenameDialog, setShowRenameDialog] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [newCourseName, setNewCourseName] = useState('');

  useEffect(() => {
    dispatch(fetchCourses(authToken));
    // dispatch(fetchClasses(authToken, courseId));
  }, [authToken, courseId, dispatch]);

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

  const onClickRename = () => {
    setShowRenameDialog(true);
  };
  const onClickDelete = () => {
    setShowDeleteDialog(true);
  };

  const onRename = () => {
    setShowRenameDialog(false);
    dispatch(renameCourse(authToken, courseId, newCourseName, false));
  };
  const onDelete = () => {
    setShowDeleteDialog(false);
    dispatch(deleteCourse(authToken, courseId));
    history.push('/admin/course/course/');
  };

  return (
    <>
      <Typography variant="h3" className={classNames.pageHeader}>
        {`${courses[courseId].name} / Setting`}
      </Typography>
      <SimpleBar title="Course Information">
        <AlignedText text="Type" childrenType="text">
          <Typography variant="body1">{getCourseType(courses[courseId].type)}</Typography>
        </AlignedText>
        <AlignedText text="Course Name" childrenType="text">
          <Typography variant="body1">{courses[courseId].name}</Typography>
        </AlignedText>
      </SimpleBar>

      <SimpleBar
        title="Change Course Name"
        childrenButtons={(
          <>
            <Button color="secondary" onClick={onClickRename}>
              Rename
            </Button>
          </>
        )}
      >
        <Typography variant="body1">
          Once you change the course name, all related classes will be change their names. Please be certain.
        </Typography>
      </SimpleBar>
      <SimpleBar
        title="Delete Course"
        childrenButtons={(
          <>
            <Button color="secondary" onClick={onClickDelete}>
              Delete
            </Button>
          </>
        )}
      >
        <Typography variant="body1">Once you delete a course, there is no going back. Please be certain.</Typography>
      </SimpleBar>
      <Dialog open={showRenameDialog || loading.renameCourse} maxWidth="md">
        <DialogTitle>
          <Typography variant="h4">Rename course</Typography>
        </DialogTitle>
        <DialogContent>
          <AlignedText text="Type" childrenType="text">
            <Typography variant="body1">{courses[courseId].type}</Typography>
          </AlignedText>

          <AlignedText text="Current Name" textColor="secondary" childrenType="text">
            <Typography variant="body1">{courses[courseId].name}</Typography>
          </AlignedText>

          <AlignedText text="New Name" childrenType="field">
            <TextField
              style={{ width: '350px' }}
              variant="outlined"
              onChange={(e) => setNewCourseName(e.target.value)}
            />
          </AlignedText>
        </DialogContent>
        <DialogContent>
          <Typography variant="body2">
            Once you change course name, all related information will be affected. Please be certain.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowRenameDialog(false)}>Cancel</Button>
          <Button onClick={onRename} color="secondary">
            Rename
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={showDeleteDialog || loading.deleteCourse} maxWidth="md">
        <DialogTitle>
          <Typography variant="h4">Delete course</Typography>
        </DialogTitle>
        <DialogContent>
          <AlignedText text="Type" childrenType="text">
            <Typography variant="body1">{courses[courseId].type}</Typography>
          </AlignedText>
          <AlignedText text="Course" childrenType="text">
            <Typography variant="body1">{courses[courseId].name}</Typography>
          </AlignedText>
        </DialogContent>
        <DialogContent>
          <Typography variant="body2">Once you delete a course, there is no going back. Please be certain.</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowDeleteDialog(false)}>Cancel</Button>
          <Button onClick={onDelete} color="secondary">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
