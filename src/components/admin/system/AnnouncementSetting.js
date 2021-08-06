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
import { useSelector, useDispatch } from 'react-redux';
import {
  withRouter, Switch, Route, useHistory, useParams,
} from 'react-router-dom';

import NoMatch from '../../noMatch';
import SimpleBar from '../../ui/SimpleBar';
import AlignedText from '../../ui/AlignedText';
import DateRangePicker from '../../ui/DateRangePicker';
import { fetchAnnouncement } from '../../../actions/admin/system';

const useStyles = makeStyles((theme) => ({
  pageHeader: {
    marginBottom: '50px',
  },
}));

/* This is a level 4 component (page component) */
export default function AnnouncementSetting() {
  const classes = useStyles();
  const { announcementId } = useParams();

  const dispatch = useDispatch();
  const authToken = useSelector((state) => state.auth.user.token);
  const announcements = useSelector((state) => state.admin.system.announcements.byId);
  const allIds = useSelector((state) => state.admin.system.announcements.allIds);
  const loading = useSelector((state) => state.admin.system.loading.fetchAnnouncement);

  const [popUpDelete, setPopUpDelete] = useState(false);
  const [announcement, setAnnouncement] = useState(null);

  useEffect(() => {
    if (allIds.length === 0) {
      dispatch(fetchAnnouncement(authToken));
      console.log('call fetchAnnouncement');
    } else {
      console.log('announcements :', announcements);
      console.log('announcementId :', announcementId);
      const item = announcements[announcementId];
      console.log('item :', item);
      setAnnouncement({
        title: item.title,
        PostTime: item.post_time,
        EndTime: item.expire_time,
        Content: item.content,
      });
    }
  }, [authToken, dispatch, allIds, announcementId, announcements]);

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

  if (announcement === null) {
    if (loading.fetchSubmitLanguage) {
      return <div>loading...</div>;
    }
    return <NoMatch />;
  }

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
            <AlignedText text="Title" childrenType="text">
              <Typography variant="body1">{announcement.title}</Typography>
            </AlignedText>
            <AlignedText text="Duration" childrenType="text">
              <Typography variant="body1">{`${announcement.PostTime} to ${announcement.EndTime}`}</Typography>
            </AlignedText>
            <AlignedText text="Content" childrenType="text">
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
                {announcement.title}
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
