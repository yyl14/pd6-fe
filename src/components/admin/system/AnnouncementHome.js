import React, { Component, useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  withRouter, Switch, Route, useHistory, useParams, BrowserRouter as Router, Link,
} from 'react-router-dom';
import { BiFilterAlt } from 'react-icons/bi';
import { Button, Typography, makeStyles } from '@material-ui/core';
import CustomTable from '../../ui/CustomTable';
import { fetchAnnouncement } from '../../../actions/admin/system';

const useStyles = makeStyles((theme) => ({
  pageHeader: {
    marginBottom: '50px',
  },
  filterButton: {
    justifyContent: 'space-between',
  },

}));

// TODO: use ui/CustomTable to implement announcement table directly in this component

/* This is a level 4 component (page component) */
export default function AnnouncementHome() {
  const classes = useStyles();

  const dispatch = useDispatch();
  const authToken = useSelector((state) => state.auth.user.token);
  const loading = useSelector((state) => state.admin.system.loading.fetchAnnouncement);
  const announcements = useSelector((state) => state.admin.system.announcements.byId);
  const announcementId = useSelector((state) => state.admin.system.announcements.allIds);

  const [tableData, setTableData] = useState([]);
  const [path, setPath] = useState([]);

  useEffect(() => {
    dispatch(fetchAnnouncement(authToken));
    console.log('call fetch announcement : ', announcements);
  }, [announcements, authToken, dispatch]);

  useEffect(() => {
    const newData = [];
    const newPath = [];

    announcementId.forEach((key) => {
      const item = announcements[key];
      console.log('item', item);
      const temp = { ...item };
      newData.push(temp);
      newPath.push(`announcement/${item.id}/setting`);
    });
    setTableData(newData);
    setPath(newPath);
  }, [announcements, announcementId]);

  const history = useHistory();
  const handleClickAdd = () => {
    history.push('/admin/system/announcement/add');
  };

  const [filter, setFilter] = useState(false);

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
            minWidth: 150,
            width: 150,
            align: 'center',
          },
          {
            id: 'EndTime',
            label: 'End Time',
            minWidth: 150,
            width: 150,
            align: 'center',
          },
        ]}
        columnComponent={[null, (<BiFilterAlt key="filter" onClick={() => { setFilter(true); }} />), (<BiFilterAlt key="filter" onClick={() => { setFilter(true); }} />)]}
        hasFilter={[false, true, true]}
        dataColumnName={['Title', 'PostTime', 'EndTime']}
        hasLink
        path={path}
      />
    </>
  );
}
