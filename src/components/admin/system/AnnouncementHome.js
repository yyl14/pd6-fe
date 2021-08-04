import React, { Component, useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import {
  withRouter, Switch, Route, useHistory, useParams, BrowserRouter as Router, Link,
} from 'react-router-dom';
import { BiFilterAlt } from 'react-icons/bi';
import { Button, Typography, makeStyles } from '@material-ui/core';
import CustomTable from '../../ui/CustomTable';

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

  const announcement = useSelector((state) => state.admin.system.announcement.byId);
  const announcementID = useSelector((state) => state.admin.system.announcement.allIds);

  const [tableData, setTableData] = useState([]);
  const [path, setPath] = useState([]);

  useEffect(() => {
    const newData = [];
    const newPath = [];

    announcementID.forEach((key) => {
      const item = announcement[key];
      newData.push(item);
      newPath.push(`announcement/${item.id}/setting`);
    });
    setTableData(newData);
    setPath(newPath);
  }, [announcement, announcementID]);

  const history = useHistory();
  const handleClickAdd = () => {
    history.push('/admin/system/announcement/add');
  };

  const [filter, setFilter] = useState(false);

  const columns = [
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
  ];

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
        columns={columns}
        columnComponent={[null, (<BiFilterAlt key="filter" onClick={() => { setFilter(true); }} />), (<BiFilterAlt key="filter" onClick={() => { setFilter(true); }} />)]}
        hasFilter={[false, true, true]}
        dataColumnName={['Title', 'PostTime', 'EndTime']}
        hasLink
        path={path}
      />
    </>
  );
}
