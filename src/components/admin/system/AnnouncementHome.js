import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  withRouter, Switch, Route, useHistory,
} from 'react-router-dom';
import { Button, Typography, makeStyles } from '@material-ui/core';

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
  return (
    <>
      <Typography variant="h3" className={classes.pageHeader}>
        Announcement
      </Typography>
      <Typography variant="h4">This is Announcement Home</Typography>
    </>
  );
};

export default AnnouncementHome;
