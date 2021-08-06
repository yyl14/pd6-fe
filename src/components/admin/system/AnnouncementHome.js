import React, { Component, useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  withRouter, Switch, Route, useHistory, useParams, BrowserRouter as Router, Link,
} from 'react-router-dom';
import { BiFilterAlt } from 'react-icons/bi';
import {
  Button,
  Typography,
  makeStyles,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from '@material-ui/core';
import NoMatch from '../../noMatch';
import CustomTable from '../../ui/CustomTable';
import DateRangePicker from '../../ui/DateRangePicker';
import { fetchAnnouncement } from '../../../actions/admin/system';

const useStyles = makeStyles((theme) => ({
  pageHeader: {
    marginBottom: '50px',
  },
  filterButton: {
    justifyContent: 'space-between',
  },
  paper: {
    minWidth: '800px',
    minHeight: '550px',
  },
}));

// TODO: use ui/CustomTable to implement announcement table directly in this component

/* This is a level 4 component (page component) */
export default function AnnouncementHome() {
  const classes = useStyles();

  const dispatch = useDispatch();
  const authToken = useSelector((state) => state.auth.user.token);
  const loading = useSelector((state) => state.admin.system.loading);
  const announcements = useSelector((state) => state.admin.system.announcements.byId);
  const announcementId = useSelector((state) => state.admin.system.announcements.allIds);
  const addLoading = useSelector((state) => state.admin.system.loading.addAnnouncement);
  const deleteLoading = useSelector((state) => state.admin.system.loading.deleteAnnouncement);

  const [tableData, setTableData] = useState([]);
  const [path, setPath] = useState([]);

  const [filterPostOrNot, setFilterPostOrNot] = useState(false);
  const [filterEndOrNot, setFilterEndOrNot] = useState(false);
  const [postRange, setPostRange] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: 'selection',
    },
  ]);
  const [endRange, setEndRange] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: 'selection',
    },
  ]);

  const filter = () => {
    const newData = [];

    const postStart = postRange[0].startDate.getTime();
    const postEnd = postRange[0].endDate.getTime();
    const endStart = endRange[0].startDate.getTime();
    const endEnd = endRange[0].endDate.getTime();

    announcementId.forEach((key) => {
      const item = announcements[key];
      const postDate = new Date(item.post_time);
      const postTime = postDate.getTime();
      const endDate = new Date(item.expire_time);
      const endTime = endDate.getTime();
      if (filterPostOrNot && (postStart > postTime || postTime > postEnd)) {
        return;
      }
      if (filterEndOrNot && (endStart > endTime || endTime > endEnd)) {
        return;
      }
      const temp = {
        title: item.title,
        PostTime: item.post_time,
        EndTime: item.expire_time,
      };
      newData.push(temp);
    });
    setTableData(newData);
    setFilterPostOrNot(false);
    setFilterEndOrNot(false);
  };

  useEffect(() => {
    if (!addLoading && !deleteLoading) {
      dispatch(fetchAnnouncement(authToken));
    }
  }, [authToken, dispatch, addLoading, deleteLoading]);

  useEffect(() => {
    if (announcementId == null) {
      dispatch(fetchAnnouncement(authToken));
    } else {
      const newData = [];
      const newPath = [];
      announcementId.forEach((key) => {
        const item = announcements[key];
        const temp = {
          title: item.title,
          PostTime: item.post_time,
          EndTime: item.expire_time,
        };
        newData.push(temp);
        newPath.push(`announcement/${item.id}/setting`);
      });
      setTableData(newData);
      setPath(newPath);
    }
  }, [dispatch, authToken, announcements, announcementId]);

  const history = useHistory();
  const handleClickAdd = () => {
    history.push('/admin/system/announcement/add');
  };

  if (announcements === null) {
    if (loading.fetchAnnouncement) {
      return <div>loading...</div>;
    }
    return <NoMatch />;
  }
  return (
    <>
      <Typography variant="h3" className={classes.pageHeader}>
        Announcement
      </Typography>
      <CustomTable
        hasSearch
        searchPlaceholder="Search"
        buttons={(
          <Button variant="contained" color="primary" onClick={handleClickAdd} placeholder="Search">
            +
          </Button>
            )}
        data={tableData}
        columns={[
          {
            id: 'title',
            label: 'Title',
            minWidth: 200,
            width: 200,
            align: 'center',
          },
          {
            id: 'PostTime',
            label: 'Post Time',
            minWidth: 300,
            width: 300,
            align: 'center',
          },
          {
            id: 'EndTime',
            label: 'End Time',
            minWidth: 300,
            width: 300,
            align: 'center',
          },
        ]}
        columnComponent={[null, (<BiFilterAlt key="filterPost" onClick={() => { setFilterPostOrNot(true); }} />), (<BiFilterAlt key="filterEnd" onClick={() => { setFilterEndOrNot(true); }} />)]}
        hasLink
        path={path}
      />
      <Dialog
        open={filterPostOrNot}
        keepMounted
        onClose={() => setFilterPostOrNot(false)}
        aria-labelledby="dialog-slide-title"
        aria-describedby="dialog-slide-description"
        classes={{ paper: classes.paper }}
      >
        <DialogTitle id="dialog-slide-title">
          <Typography variant="h4">Post time range</Typography>
        </DialogTitle>
        <DialogContent>
          <DateRangePicker value={postRange} setValue={setPostRange} />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setFilterPostOrNot(false)} color="default">
            Cancel
          </Button>
          <Button onClick={() => { filter(); }} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog
        open={filterEndOrNot}
        keepMounted
        onClose={() => setFilterEndOrNot(false)}
        aria-labelledby="dialog-slide-title"
        aria-describedby="dialog-slide-description"
        classes={{ paper: classes.paper }}
      >
        <DialogTitle id="dialog-slide-title">
          <Typography variant="h4">End time range</Typography>
        </DialogTitle>
        <DialogContent>
          <DateRangePicker value={endRange} setValue={setEndRange} />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setFilterEndOrNot(false)} color="default">
            Cancel
          </Button>
          <Button onClick={() => { filter(); }} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
