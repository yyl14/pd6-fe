import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  withRouter, Switch, Route, useHistory,
} from 'react-router-dom';
import { Button, Typography } from '@material-ui/core';
import AnnouncementTable from './AnnouncementTable';

const AnnouncementHome = () => (
  <div>
    <Typography variant="h3" style={{ marginBottom: '30px' }}>
      HomePage
    </Typography>
    <AnnouncementTable />
  </div>
);

export default AnnouncementHome;
