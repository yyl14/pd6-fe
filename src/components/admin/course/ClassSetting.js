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

  const courses = useSelector((state) => state.admin.course.courses.byId);
  const classes = useSelector((state) => state.admin.course.classes.byId);

  const [showRenameDialog, setShowRenameDialog] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [newClassName, setNewClassName] = useState([]);
  // TODO: data & button loading
  const handleSubmitRename = () => {
    setShowRenameDialog(false);
    //
  };
  const handleSubmitDelete = () => {
    setShowDeleteDialog(false);
    //
  };

  return (
    <div className="class-setting">
      <Typography variant="h3" className={classNames.pageHeader}>
        {`${courses[courseId].name} / ${classes[classId].name} / Setting`}
      </Typography>

      <SimpleBar title="Course Information">
        <AlignedText text="Type" childrenType="text">
          <Typography variant="body1">{courses[courseId].type}</Typography>
        </AlignedText>
        <AlignedText text="Course Name" childrenType="text">
          <Typography variant="body1">{courses[courseId].name}</Typography>
        </AlignedText>
        <AlignedText text="Class Name" childrenType="text">
          <Typography variant="body1">{classes[classId].name}</Typography>
        </AlignedText>
        {/* <p>
          <div className={classNames.informationRow}>
            <div className={classNames.informationItem}>
              <Typography variant="body1">Type</Typography>
            </div>
            <div className={classNames.informationItem} />
          </div>
        </p>
        <p>
          <div className={classNames.informationRow}>
            <div className={classNames.informationItem}>
              <Typography variant="body1">Course Name</Typography>
            </div>
            <div className={classNames.informationItem}>

            </div>
          </div>
        </p>
        <p>
          <div className={classNames.informationRow}>
            <div className={classNames.informationItem}>
              <Typography variant="body1">Class Name</Typography>
            </div>
            <div className={classNames.informationItem}>
              <Typography variant="body1">{classes[classId].name}</Typography>
            </div>
          </div>
        </p> */}
      </SimpleBar>

      <SimpleBar
        title="Rename Class"
        buttons={(
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
            <Typography variant="body1">{courses[courseId].type}</Typography>
          </AlignedText>
          <AlignedText text="Course" childrenType="text">
            <Typography variant="body1">{courses[courseId].name}</Typography>
          </AlignedText>
          <div className={classNames.dialogInformationRow}>
            <div className={classNames.dialogInformationItem}>
              <Typography variant="body1" color="secondary">
                Current Name
              </Typography>
            </div>
            <div className={classNames.dialogInformationItem}>
              <Typography variant="body1" color="secondary">
                {classes[classId].name}
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
          <Button onClick={handleSubmitRename} color="secondary">
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
                {classes[classId].name}
              </Typography>
            </div>
          </div>
        </DialogContent>
        <DialogContent>
          <Typography variant="body2">Once you delete a class, there is no going back. Please be certain.</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowDeleteDialog(false)}>Cancel</Button>
          <Button onClick={handleSubmitDelete} color="secondary">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default ClassSetting;
