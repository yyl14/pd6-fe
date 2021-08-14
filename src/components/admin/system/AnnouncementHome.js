import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  useHistory, useParams, BrowserRouter as Router, Link,
} from 'react-router-dom';
import { BiFilterAlt } from 'react-icons/bi';
import {
  Button, Typography, makeStyles, Dialog, DialogActions, DialogContent, DialogTitle,
} from '@material-ui/core';
import moment from 'moment';

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
  const announcements = useSelector((state) => state.announcements.byId);
  const announcementId = useSelector((state) => state.announcements.allIds);
  const loading = useSelector((state) => state.loading.admin.system.fetchAnnouncement);
  const addLoading = useSelector((state) => state.loading.admin.system.addAnnouncement);
  const deleteLoading = useSelector((state) => state.loading.admin.system.deleteAnnouncement);

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

  const modifyRawData = (item) => {
    const temp = {
      title: item.title,
      PostTime: moment(item.post_time).format('YYYY-MM-DD, HH:mm'),
      EndTime: moment(item.expire_time).format('YYYY-MM-DD, HH:mm'),
    };
    return temp;
  };

  const filter = () => {
    const newData = [];

    const postStart = postRange[0].startDate.getTime();
    const postEnd = postRange[0].endDate.getTime();
    const endStart = endRange[0].startDate.getTime();
    const endEnd = endRange[0].endDate.getTime();

    announcementId.forEach((key) => {
      const item = announcements[key];
      const postTime = item.post_time.getTime();
      const endTime = item.expire_time.getTime();
      if (filterPostOrNot && (postStart > postTime || postTime > postEnd)) {
        return;
      }
      if (filterEndOrNot && (endStart > endTime || endTime > endEnd)) {
        return;
      }
      newData.push(modifyRawData(item));
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
    const newData = [];
    const newPath = [];
    announcementId.forEach((key) => {
      const item = announcements[key];
      newData.push(modifyRawData(item));
      newPath.push(`announcement/${item.id}/setting`);
    });
    setTableData(newData);
    setPath(newPath);
  }, [announcements, announcementId]);

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
        columnComponent={[
          null,
          <BiFilterAlt
            key="filterPost"
            onClick={() => {
              setFilterPostOrNot(true);
            }}
          />,
          <BiFilterAlt
            key="filterEnd"
            onClick={() => {
              setFilterEndOrNot(true);
            }}
          />,
        ]}
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
          <Button
            onClick={() => {
              filter();
            }}
            color="primary"
          >
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
          <Button
            onClick={() => {
              filter();
            }}
            color="primary"
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
