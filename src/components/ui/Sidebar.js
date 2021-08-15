import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core';
import {
  Switch, Route, useHistory, useLocation,
} from 'react-router-dom';

import Account from './sidebar/Account';
import Course from './sidebar/Course';
import System from './sidebar/System';

const useStyles = makeStyles((theme) => ({
  drawer: {
    top: '55px',
    height: 'calc(100% - 55px)',
    width: '300px',
  },
  drawerPaper: {
    top: '55px',
    height: 'calc(100% - 55px)',
    width: '300px',
  },
  active: {
    color: theme.palette.primary.main,
  },
  topSpace: {
    marginTop: '82.5px',
  },
  bottomSpace: {
    marginBottom: '40px',
  },
  titleIcon: {
    float: 'left',
    color: theme.palette.black.main,
    marginTop: '44px',
    marginBottom: '6.33px',
    marginLeft: '20px',
    marginRight: '14px',
    '&:hover': {
      cursor: 'pointer',
    },
  },
  title: {
    float: 'left',
    marginTop: '40px',
    marginBottom: '6.33px',
  },
  secondTitle: {
    float: 'left',
    marginTop: '25px',
    marginBottom: '6.33px',
  },
  icon: {
    color: theme.palette.black.main,
    marginLeft: '35px',
    marginRight: '21px',
  },
  activeIcon: {
    color: theme.palette.primary.main,
    marginLeft: '35px',
    marginRight: '21px',
  },
  greyIcon: {
    color: theme.palette.grey.A400,
    marginLeft: '35px',
    marginRight: '21px',
  },
  secondTitleIcon: {
    float: 'left',
    color: theme.palette.black.main,
    marginTop: '29px',
    marginBottom: '6.33px',
    marginLeft: '20px',
    marginRight: '14px',
    '&:hover': {
      cursor: 'pointer',
    },
  },
  divider: {
    marginBottom: '16px',
  },
  arrow: {
    marginTop: '65px',
    marginLeft: '15px',
    marginRight: 'auto',
  },
  item: {
    paddingTop: '7.5px',
    paddingBottom: '7.5px',
  },
  addItem: {
    color: theme.palette.grey.A400,
    paddingTop: '7.5px',
    paddingBottom: '7.5px',
  },
  rotate90: {
    transform: 'rotate(90deg)',
  },
  wrapping: {
    width: '30px',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
}));

export default function Sidebar() {
  const classes = useStyles();
  const history = useHistory();
  const location = useLocation();
  // const [mode, setMode] = useState('course');

  return (
    <Switch>
      <Route exact path="/admin/course/course/">
        {/* for fetchCourse and redirection */}
        <Course classes={classes} history={history} location={location} mode="class-list" />
      </Route>
      <Route path="/admin/course/course/:courseId/class-list">
        <Course classes={classes} history={history} location={location} mode="class-list" />
      </Route>
      <Route path="/admin/course/course/:courseId/setting">
        <Course classes={classes} history={history} location={location} mode="course-setting" />
      </Route>
      <Route path="/admin/course/class/:courseId/:classId/">
        <Course classes={classes} history={history} location={location} mode="class" />
      </Route>
      <Route exact path="/admin/account/institute">
        <Account classes={classes} history={history} location={location} mode="main" />
      </Route>
      <Route path="/admin/account/institute/:instituteId/setting">
        <Account classes={classes} history={history} location={location} mode="institute" />
      </Route>
      <Route exact path="/admin/account/account">
        <Account classes={classes} history={history} location={location} mode="main" />
      </Route>
      <Route path="/admin/account/account/:accountId/setting">
        <Account classes={classes} history={history} location={location} mode="account" />
      </Route>
      <Route exact path="/admin/system/accesslog">
        <System classes={classes} history={history} location={location} mode="main" />
      </Route>
      <Route exact path="/admin/system/announcement">
        <System classes={classes} history={history} location={location} mode="main" />
      </Route>
      <Route exact path="/admin/system/announcement/add">
        <System classes={classes} history={history} location={location} mode="create" />
      </Route>
      <Route path="/admin/system/announcement/:announcementId/setting">
        <System classes={classes} history={history} location={location} mode="announcement" />
      </Route>
      <Route exact path="/admin/system/submitlang">
        <System classes={classes} history={history} location={location} mode="main" />
      </Route>
      <Route path="/admin/system/submitlang/:languageId/setting">
        <System classes={classes} history={history} location={location} mode="language" />
      </Route>
    </Switch>
  );
}
