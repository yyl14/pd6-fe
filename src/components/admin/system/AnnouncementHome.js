import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  withRouter, Switch, Route, useHistory, useParams,
} from 'react-router-dom';
import { BiFilterAlt } from 'react-icons/bi';
import { Button, Typography, makeStyles } from '@material-ui/core';
import CustomTable from '../../ui/CustomTable';

const useStyles = makeStyles((theme) => ({
  pageHeader: {
    marginBottom: '50px',
  },
}));

// TODO: use ui/CustomTable to implement announcement table directly in this component

/* This is a level 4 component (page component) */
const AnnouncementHome = () => {
  const classes = useStyles();
  const { AnnouncementID } = useParams();
  const history = useHistory();
  const handleClickAdd = () => {
    history.push('/admin/system/announcement/add');
  };

  function createData(Title, PostTime, EndTime) {
    return {
      Title,
      PostTime,
      EndTime,
    };
  }

  const columns = [
    {
      id: 'Title',
      label: 'Title',
      minWidth: 200,
      width: 100,
      align: 'center',
    },
    {
      id: 'PostTime',
      label: 'PostTime',
      minWidth: 200,
      width: 150,
      align: 'center',
    },
    {
      id: 'EndTime',
      label: 'EndTime',
      minWidth: 200,
      width: 150,
      align: 'center',
    },
  ];
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
        searchPlaceholder="Search"
        buttons={(
          <Button variant="contained" color="primary" onClick={handleClickAdd} placeholder="Search">
            +
          </Button>
            )}
        data={rows}
        columns={columns}
        columnComponent={[null, (<BiFilterAlt key="filter" onClick={[]} />), (<BiFilterAlt key="filter" onClick={[]} />)]}
        hasFilter={[false, true, true]}
        dataColumnName={['Title', 'PostTime', 'EndTime']}
        hasLink
        path={[
          '/admin/system/announcement/:announcementId/setting',
          '/admin/system/announcement/:announcementId/setting',
          '/admin/system/announcement/:announcementId/setting',
        ]}
      />
    </>
  );
};

export default AnnouncementHome;
