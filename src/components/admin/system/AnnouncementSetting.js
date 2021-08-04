import React, { useState, useEffect } from 'react';
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
import { useSelector } from 'react-redux';
import {
  withRouter, Switch, Route, useHistory, useParams,
} from 'react-router-dom';
import SimpleBar from '../../ui/SimpleBar';
import AlignedText from '../../ui/AlignedText';
import DateRangePicker from '../../ui/DateRangePicker';

const useStyles = makeStyles((theme) => ({
  pageHeader: {
    marginBottom: '50px',
  },
}));

/* This is a level 4 component (page component) */
export default function AnnouncementSetting() {
  const classes = useStyles();
  const { announcementID } = useParams();
  const announcement = useSelector((state) => state.admin.system.announcement.byId);

  const [popUpDelete, setPopUpDelete] = useState(false);

  const handleClickDelete = () => {
    setPopUpDelete(true);
  };
  const handleClosePopUpDelete = () => {
    setPopUpDelete(false);
  };
  const handleSubmitDelete = (e) => {};

  const [edit, setEdit] = useState(false);
  const [state, setState] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: 'selection',
    },
  ]);
  /* TODO: re-write with ui components SimpleBar and DatePicker  */
  /* This is a level 4 component (page component) */
  return (
    <>
      <Typography variant="h3" className={classes.pageHeader}>
        {`${announcement.title} / Setting`}
      </Typography>
      <div>
        <SimpleBar
          title="Announcement"
          buttons={(
            <>
              <Button onClick={() => setEdit(true)}>Edit</Button>
            </>
        )}
        >
          <Typography variant="body1">
            <AlignedText text="Title" childrenType="field">
              <Typography variant="body1">{announcement.title}</Typography>
            </AlignedText>
            <AlignedText text="Duration" childrenType="field">
              <Typography variant="body1">{`${announcement.PostTime} to ${announcement.EndTime}`}</Typography>
            </AlignedText>
            <AlignedText text="Content" childrenType="field">
              <Typography variant="body1">{announcement.Content}</Typography>
            </AlignedText>
          </Typography>
        </SimpleBar>
      </div>
      <div>
        <SimpleBar
          title="Delete Announcement"
          childrenButtons={(
            <>
              <Button color="secondary" onClick={handleClickDelete}>Delete</Button>
            </>
          )}
        >
          <Typography className="delete-announcement-body" variant="body1">
            Once you delete this announcement, there is no going back. Please be certain.
          </Typography>
        </SimpleBar>
      </div>

      {/* Delete dialog */}
      <Dialog open={popUpDelete} keepMounted onClose={handleClosePopUpDelete}>
        <DialogTitle>
          <Typography variant="h4">Delete Announcement</Typography>
        </DialogTitle>
        <DialogContent>
          <Grid
            container
            className="delete-announcement-detail"
            direction="row"
            justifyContent="center"
            alignContent="center"
          >
            <Grid container item className="delete-Announcement-detail-title" xs={6}>
              <Typography variant="body1" color="secondary">
                Title
              </Typography>
            </Grid>
            <Grid container item className="delete-class-detail-content" xs={6}>
              <Typography variant="body1" color="secondary">
                管院停電
              </Typography>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogContent>
          <Typography variant="body2">
            Once you delete an announcement, there is no going back. Please be certain.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClosePopUpDelete}>Cancel</Button>
          <Button onClick={(e) => handleSubmitDelete()} color="secondary">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
