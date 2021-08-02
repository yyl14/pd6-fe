import React, { useState } from 'react';
import { useSelector } from 'react-redux';
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
import SchoolIcon from '@material-ui/icons/School';
import Divider from '@material-ui/core/Divider';

const useStyles = makeStyles((theme) => ({
  pageHeader: {
    marginBottom: '50px',
  },
}));

/* This is a level 4 component (page component) */
const ClassSetting = () => {
  const classNames = useStyles();
  const { courseId, classId } = useParams();
  const courses = useSelector((state) => state.admin.course.courses.byId);
  const classes = useSelector((state) => state.admin.course.classes.byId);

  const [popUpRename, setPopUpRename] = useState(false);
  const [popUpDelete, setPopUpDelete] = useState(false);
  const [className, setClassName] = useState([]);
  const handleClickRename = () => {
    setPopUpRename(true);
  };
  const handleClosePopUpRename = () => {
    setPopUpRename(false);
  };
  const handleClassNameChange = (e) => {
    /* if(){

    } */
    setClassName(e.target.value);
  };
  const handleSubmitRename = () => {
    setPopUpRename(false);
    // and sth......
  };

  const handleClickDelete = () => {
    setPopUpDelete(true);
  };
  const handleClosePopUpDelete = () => {
    setPopUpDelete(false);
  };
  const handleSubmitDelete = () => {
    setPopUpDelete(false);
    // and sth......
  };

  return (
    <div className="class-setting">
      <Typography variant="h3" className={classNames.pageHeader}>
        {`${courses[courseId].name} / ${classes[classId].name} / Setting`}
      </Typography>

      <Typography variant="h4">This is Class Setting</Typography>
      {/* TODO: rewrite the editor with <div />'s, use redux state, actions, and remove title */}
      {/* <Grid container className="class-setting-container" direction="column" justifyContent="center" alignItems="center">
        <Grid container item className="class-setting-col-top" direction="column" xs={6} justifyContent="center" alignItems="flex-start">
          <Typography variant="h3">PBC / 111-1 / Class Setting</Typography>
          <Grid container item direction="row" justifyContent="flex-start" alignItems="center" spacing={1}>
            <Grid item><SchoolIcon color="action" /></Grid>
            <Grid item><Typography variant="h4">National Taiwan University</Typography></Grid>
          </Grid>
        </Grid>
        <Grid container item className="class-setting-col-mid" direction="column" xs={6} justifyContent="center" alignItems="flex-start">
          <Grid container item direction="row" alignItems="center" justifyContent="space-between">
            <Typography variant="h6">Change Class Name</Typography>
            <Button onClick={handleClickRename} color="secondary">Rename</Button>
          </Grid>
          <Divider variant="fullWidth" style={{ width: '100%' }} />
          <Grid item>
            <Typography variant="body1">Once you change the class name, all related classes will be change their names. Please be certain.</Typography>
          </Grid>
        </Grid>
        <Grid container item className="class-setting-col-bottom" direction="column" xs={6} justifyContent="center" alignItems="flex-start">
          <Grid container item direction="row" alignItems="center" justifyContent="space-between">
            <Typography variant="h6">Delete Class</Typography>
            <Button onClick={handleClickDelete} color="secondary">Delete</Button>
          </Grid>
          <Divider variant="fullWidth" style={{ width: '100%' }} />
          <Grid item>
            <Typography variant="body1">Once you delete a class, there is no going back. Please be certain.</Typography>
          </Grid>
        </Grid>
      </Grid> */}
      {/* Rename class form dialog */}
      <Dialog open={popUpRename} keepMounted onClose={handleClosePopUpRename}>
        <DialogTitle>
          <Typography variant="h4">Rename class</Typography>
        </DialogTitle>
        <DialogContent>
          <Grid
            container
            className="rename-class-form"
            direction="row"
            justifyContent="space-between"
            alignContent="center"
          >
            <Grid
              container
              item
              className="rename-class-form-left"
              xs={4}
              spacing={2}
              direction="column"
              justifyContent="flex-start"
              alignContent="flex-start"
            >
              <Grid item>
                <Typography variant="body1">Type</Typography>
              </Grid>
              <Grid item>
                <Typography variant="body1">Course</Typography>
              </Grid>
              <Grid item>
                <Typography variant="body1" color="secondary">
                  Current Name
                </Typography>
              </Grid>
              <Grid item>
                <Typography variant="body1">New Name</Typography>
              </Grid>
            </Grid>
            <Grid
              container
              item
              className="rename-class-form-right"
              xs={8}
              spacing={2}
              direction="column"
              justifyContent="flex-start"
              alignContent="flex-start"
            >
              <Grid item>
                <Typography variant="body1">Type</Typography>
              </Grid>
              <Grid item>
                <Typography variant="body1">Course</Typography>
              </Grid>
              <Grid item>
                <Typography variant="body1" color="secondary">
                  Current Name
                </Typography>
              </Grid>
              <TextField
                autoFocus
                id="new-class-name"
                style={{ width: '96%' }}
                variant="outlined"
                onChange={(e) => handleClassNameChange(e)}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogContent>
          <Typography variant="body2">
            Once you change class name, all related information will be affected. Please be certain.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClosePopUpRename}>Cancel</Button>
          <Button onClick={handleSubmitRename} color="secondary">
            Rename
          </Button>
        </DialogActions>
      </Dialog>
      {/* Delete dialog */}
      <Dialog open={popUpDelete} keepMounted onClose={handleClosePopUpDelete}>
        <DialogTitle>
          <Typography variant="h4">Delete class</Typography>
        </DialogTitle>
        <DialogContent>
          <Grid
            container
            className="delete-class-detail"
            direction="row"
            justifyContent="space-between"
            alignContent="center"
          >
            <Grid
              container
              item
              className="delete-class-detail-left"
              direction="column"
              xs={4}
              spacing={2}
              justifyContent="flex-start"
              alignContent="flex-start"
            >
              <Grid item>
                <Typography variant="body1">Type</Typography>
              </Grid>
              <Grid item>
                <Typography variant="body1">Course</Typography>
              </Grid>
              <Grid item>
                <Typography variant="body1" color="secondary">
                  Current Name
                </Typography>
              </Grid>
            </Grid>
            <Grid
              container
              item
              className="delete-class-detail-right"
              direction="column"
              xs={8}
              spacing={2}
              justifyContent="flex-start"
              alignContent="flex-start"
            >
              <Grid item>
                <Typography variant="body1">Type</Typography>
              </Grid>
              <Grid item>
                <Typography variant="body1">Course</Typography>
              </Grid>
              <Grid item>
                <Typography variant="body1" color="secondary">
                  Current Name
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogContent>
          <Typography variant="body2">Once you delete a class, there is no going back. Please be certain.</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClosePopUpDelete}>Cancel</Button>
          <Button onClick={handleSubmitDelete} color="secondary">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default ClassSetting;
