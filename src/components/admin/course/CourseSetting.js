import React, { useState } from 'react';
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
import { useParams } from 'react-router-dom';

import * as courseActions from '../../../actions/admin/course';
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
  const authToken = useSelector((state) => state.auth.user.token);
  const courses = useSelector((state) => state.admin.course.courses.byId);
  const dispatch = useDispatch();

  const [showRenameDialog, setShowRenameDialog] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [newCourseName, setNewCourseName] = useState('');

  const onClickRename = () => {
    setShowRenameDialog(true);
  };
  const onClickDelete = () => {
    setShowDeleteDialog(true);
  };

  const onRename = () => {
    setShowRenameDialog(false);
    dispatch(courseActions.renameClass(authToken, courseId, newCourseName, false));
  };
  const onDelete = () => {
    setShowDeleteDialog(false);
  };

  return (
    <>
      <Typography variant="h3" className={classNames.pageHeader}>
        {`${courses[courseId].name} / Setting`}
      </Typography>
      <SimpleBar title="Course Information">
        <AlignedText text="Type" childrenType="text">
          <Typography variant="body1">{courses[courseId].type}</Typography>
        </AlignedText>
        <AlignedText text="Course Name" childrenType="text">
          <Typography variant="body1">{courses[courseId].name}</Typography>
        </AlignedText>
      </SimpleBar>

      <SimpleBar
        title="Change Course Name"
        buttons={(
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
        buttons={(
          <>
            <Button color="secondary" onClick={onClickDelete}>
              Delete
            </Button>
          </>
        )}
      >
        <Typography variant="body1">Once you delete a course, there is no going back. Please be certain.</Typography>
      </SimpleBar>
      <Dialog open={showRenameDialog} maxWidth="md">
        <DialogTitle>
          <Typography variant="h4">Rename class</Typography>
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

      <Dialog open={showDeleteDialog} maxWidth="md">
        <DialogTitle>
          <Typography variant="h4">Delete class</Typography>
        </DialogTitle>
        <DialogContent>
          <AlignedText text="Type" childrenType="text">
            <Typography variant="body1">{courses[courseId].type}</Typography>
          </AlignedText>
          <AlignedText text="Course" childrenType="text">
            <Typography variant="body1">{courses[courseId].name}</Typography>
          </AlignedText>
          <div className={classNames.dialogInformationRow}>
            <div className={classNames.dialogInformationItem}>
              <Typography variant="body1" color="secondary">
                Class
              </Typography>
            </div>
            <div className={classNames.dialogInformationItem}>
              <Typography variant="body1" color="secondary">
                {courses[courseId].name}
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
    </>
  );
}
