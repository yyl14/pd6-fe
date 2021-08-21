import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core';
import {
  Switch, Route, useHistory, useLocation,
} from 'react-router-dom';

import Account from './sidebar/Account';
import Course from './sidebar/Course';
import System from './sidebar/System';

import MyClass from './sidebar/MyClass';
import Challenge from './sidebar/Challenge';
import Submission from './sidebar/Submission';
import Grade from './sidebar/Grade';
import Team from './sidebar/Team';

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

  topSpace: {
    marginTop: '110px',
  },
  bottomSpace: {
    marginBottom: '40px',
  },
  title: {
    display: 'flex',
    marginTop: '20px',
    marginBottom: '6px',
  },
  titleIcon: {
    margin: 'auto 0',
    flex: '1',
    color: theme.palette.black.main,
    '&:hover': {
      cursor: 'pointer',
    },
  },

  titleText: {
    flex: '5',
  },
  itemIcon: {
    flex: '1',
    width: '18px',
    color: theme.palette.black.main,
    marginLeft: '35px',
    marginRight: '-15px',
  },
  itemText: {
    flex: '8',
    width: '30px',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
  activeItemText: {
    flex: '10',
    color: theme.palette.primary.main,
    width: '30px',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },

  greyIcon: {
    color: theme.palette.grey.A400,
    marginLeft: '35px',
    marginRight: '21px',
  },
  divider: {
    marginBottom: '16px',
  },
  arrow: {
    marginTop: '60px',
    marginLeft: '10px',
    marginRight: 'auto',
    marginBottom: '20px',
  },
  item: {
    display: 'flex',
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
      {/* {Admin} */}
      {/* {Course} */}
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
      {/* {Account} */}
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

      {/* {My Class} */}
      {/* {Challenge} */}
      <Route exact path="/my-class">
        {/* for fetchClass and redirection */}
        <MyClass classNames={classes} history={history} location={location} mode="main" />
      </Route>
      <Route exact path="/my-class/:courseId/:classId/challenge">
        <MyClass classNames={classes} history={history} location={location} mode="main" />
      </Route>
      <Route exact path="/my-class/:courseId/:classId/challenge/:challengeId">
        <Challenge classNames={classes} history={history} location={location} mode="challenge" />
      </Route>
      <Route exact path="/my-class/:courseId/:classId/challenge/:challengeId/:problemId">
        <Challenge classNames={classes} history={history} location={location} mode="problem" />
      </Route>
      {/* {Submission} */}
      <Route exact path="/my-class/:courseId/:classId/submission">
        <MyClass classNames={classes} history={history} location={location} mode="main" />
      </Route>
      <Route path="/my-class/:courseId/:classId/submission/:submissionId">
        <Submission classNames={classes} history={history} location={location} mode="detail" />
      </Route>
      {/* {Grade} */}
      <Route exact path="/my-class/:courseId/:classId/grade">
        <MyClass classNames={classes} history={history} location={location} mode="main" />
      </Route>
      <Route path="/my-class/:courseId/:classId/grade/:studentId">
        <Grade classNames={classes} history={history} location={location} mode="detail" />
      </Route>
      {/* {Team} */}
      <Route exact path="/my-class/:courseId/:classId/team">
        <MyClass classNames={classes} history={history} location={location} mode="main" />
      </Route>
      <Route path="/my-class/:courseId/:classId/team/:teamId">
        <Team classNames={classes} history={history} location={location} mode="detail" />
      </Route>
      {/* {Member} */}
      <Route path="/my-class/:courseId/:classId/member">
        <MyClass classNames={classes} history={history} location={location} mode="main" />
      </Route>
    </Switch>
  );
}
