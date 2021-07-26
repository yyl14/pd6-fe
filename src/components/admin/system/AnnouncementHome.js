import React, { Component } from 'react';
import { connect } from 'react-redux';

import {
  withRouter, Switch, Route,
} from 'react-router-dom';
import BasicTextFields from './SearchField';
import ContainedButtons from './AddButton';
import StickyHeadTable from './Table';

const AnnouncementHome = () => (
  <div>
    <h1>HomePage</h1>
    <BasicTextFields />
    <ContainedButtons />
    <StickyHeadTable />
  </div>
);

export default AnnouncementHome;
