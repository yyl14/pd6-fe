import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  withRouter, Switch, Route, useHistory,
} from 'react-router-dom';
import { Button, Typography, makeStyles } from '@material-ui/core';
import CustomTable from '../../ui/CustomTable';

const useStyles = makeStyles((theme) => ({
  pageHeader: {
    marginBottom: '50px',
  },
}));

// TODO: use ui/CustomTable to implement announcement table directly in this component
// import AnnouncementTable from './AnnouncementTable';

/* This is a level 4 component (page component) */
const AnnouncementHome = () => {
  const classes = useStyles();
  const history = useHistory();
  const handleClickAdd = () => {
    history.push('/admin/system/announcement/add');
  };
  const columns = [
    {
      id: 'Title',
      label: 'Title',
      minWidth: 10,
      align: 'center',
    },
    {
      id: 'PostTime',
      label: 'Post Time',
      minWidth: 10,
      align: 'center',
    },
    {
      id: 'EndTime',
      label: 'End Time',
      minWidth: 10,
      align: 'center',
    },
  ];

  function createData(Title, PostTime, EndTime) {
    return {
      Title,
      PostTime,
      EndTime,
    };
  }

  const rows = [
    createData('系統維修AAA', '2021-04-20, 09:21', '2021-05-20, 09:21'),
    createData('系統維修BBB', '2021-05-20, 09:21', '2021-06-20, 09:21'),
    createData('系統維修CCC', '2021-06-20, 09:21', '2021-07-20, 09:21'),
  ];

  return (
    <>
      <Typography variant="h3" className={classes.pageHeader}>
        Announcement
      </Typography>
      <CustomTable
        hasSearch
        searchPlaceholder="Title"
        buttons={(
          <Button variant="contained" color="primary" onClick={handleClickAdd} placeholder="Search">
            +
          </Button>
      )}
        data={rows}
        columns={columns}
        hasFilter={[false, false, false]}
        dataColumnName={['Title', 'PostTime', 'EndTime']}
        hasLink={false}
      />
    </>
  );
};

export default AnnouncementHome;
