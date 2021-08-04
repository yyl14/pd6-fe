import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
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
import * as courseActions from '../../../actions/admin/course';
import SimpleBar from '../../ui/SimpleBar';
import AlignedText from '../../ui/AlignedText';
import NoMatch from '../../noMatch';

const useStyles = makeStyles((theme) => ({
  // informationRow: {
  //   display: 'flex',
  //   flexDirection: 'row',
  // },
  // informationItem: {
  //   width: '250px',
  // },
  dialogInformationRow: {
    display: 'flex',
    flexDirection: 'row',
  },
  dialogInformationItem: {
    width: '190px',
    marginTop: '0px',
    marginBottom: '16px',
  },

  pageHeader: {
    marginBottom: '50px',
  },
}));

/* This is a level 4 component (page component) */
const ClassSetting = () => {
  const classNames = useStyles();
  const { courseId, classId } = useParams();

  const dispatch = useDispatch();
  const authToken = useSelector((state) => state.auth.user.token);
  const courses = useSelector((state) => state.admin.course.courses);
  const classes = useSelector((state) => state.admin.course.classes);
  const loading = useSelector((state) => state.admin.course.loading);

  const [showRenameDialog, setShowRenameDialog] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [newClassName, setNewClassName] = useState('');

  useEffect(() => {
    dispatch(courseActions.fetchCourses(authToken));
    dispatch(courseActions.fetchClasses(authToken, courseId));
    dispatch(courseActions.fetchMembers(authToken, classId));
  }, [authToken, classId, courseId, dispatch]);

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

  // TODO: data & button loading
  const onRename = () => {
    setShowRenameDialog(false);
    //
  };
  const onDelete = () => {
    setShowDeleteDialog(false);
    //
  };

  if (courses.byId[courseId] === undefined || classes.byId[courseId] === undefined) {
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
        <AlignedText text="Type" childrenType="text">
          <Typography variant="body1">{getCourseType(courses.byId[courseId].type)}</Typography>
        </AlignedText>
        <AlignedText text="Course Name" childrenType="text">
          <Typography variant="body1">{courses.byId[courseId].name}</Typography>
        </AlignedText>
        <AlignedText text="Class Name" childrenType="text">
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
        buttons={(
          <>
            <Button onClick={() => setShowDeleteDialog(true)} color="secondary">
              Delete
            </Button>
          </>
        )}
      >
        <Typography variant="body1">Once you delete a class, there is no going back. Please be certain.</Typography>
      </SimpleBar>

      <Dialog open={showRenameDialog} maxWidth="md">
        <DialogTitle>
          <Typography variant="h4">Rename class</Typography>
        </DialogTitle>
        <DialogContent>
          <AlignedText text="Type" childrenType="text">
            <Typography variant="body1">{courses.byId[courseId].type}</Typography>
          </AlignedText>
          <AlignedText text="Course" childrenType="text">
            <Typography variant="body1">{courses.byId[courseId].name}</Typography>
          </AlignedText>
          <div className={classNames.dialogInformationRow}>
            <div className={classNames.dialogInformationItem}>
              <Typography variant="body1" color="secondary">
                Current Name
              </Typography>
            </div>
            <div className={classNames.dialogInformationItem}>
              <Typography variant="body1" color="secondary">
                {classes.byId[classId].name}
              </Typography>
            </div>
          </div>
          <AlignedText text="New Name" childrenType="field">
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
          <Button onClick={onRename} color="secondary">
            Rename
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={showDeleteDialog} maxWidth="md">
        <DialogTitle>
          <Typography variant="h4">Delete class</Typography>
        </DialogTitle>
        <DialogContent>
          <AlignedText text="Type" childrenType="text">
            <Typography variant="body1">{courses.byId[courseId].type}</Typography>
          </AlignedText>
          <AlignedText text="Course" childrenType="text">
            <Typography variant="body1">{courses.byId[courseId].name}</Typography>
          </AlignedText>
          <div className={classNames.dialogInformationRow}>
            <div className={classNames.dialogInformationItem}>
              <Typography variant="body1" color="secondary">
                Class
              </Typography>
            </div>
            <div className={classNames.dialogInformationItem}>
              <Typography variant="body1" color="secondary">
                {classes.byId[classId].name}
              </Typography>
            </div>
          </div>
        </DialogContent>
        <DialogContent>
          <Typography variant="body2">Once you delete a class, there is no going back. Please be certain.</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowDeleteDialog(false)}>Cancel</Button>
          <Button onClick={onDelete} color="secondary">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default ClassSetting;
