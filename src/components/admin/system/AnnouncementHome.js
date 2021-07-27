import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  withRouter, Switch, Route, useHistory,
} from 'react-router-dom';
import { Button, TextField } from '@material-ui/core';
import StickyHeadTable from './Table';

const AnnouncementHome = () => {
  const history = useHistory();
  const add = () => {
    history.push('/admin/system/announcement/add');
  };
  return (
    <div>
      <h1>HomePage</h1>
      <TextField />
      <Button variant="contained" color="primary" onClick={add}>Add Announcement</Button>
      <StickyHeadTable />
    </div>
  );
};

export default AnnouncementHome;
