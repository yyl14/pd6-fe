import { useSelector, useDispatch } from 'react-redux';
import {
  Switch, Route, useHistory, useLocation,
} from 'react-router-dom';
import { useCookies } from 'react-cookie';

import React, { useEffect } from 'react';
import { makeStyles, Fab } from '@material-ui/core';
import FeedbackIcon from '@material-ui/icons/Feedback';
import Normal from './normal';
import Admin from './admin';
import Account from './account';
import User from './user';
import MySubmission from './mySubmission';

import Sidebar from '../components/ui/Sidebar';
import Header from '../components/ui/Header';

import { getUserInfo } from '../actions/user/auth';

import '../styles/index.css';

const useStyles = makeStyles(() => ({
  bugReport: {
    position: 'fixed',
    right: '3.5vw',
    bottom: '5vh',
  },
}));

function Index() {
  const classes = useStyles();
  const history = useHistory();
  const location = useLocation();
  const auth = useSelector((state) => state.auth);
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [cookies, , removeCookie] = useCookies(['id', 'token']);

  useEffect(() => {
    if (!auth.isAuthenticated) {
      if (cookies.id && cookies.token) {
        if (auth.tokenExpired) {
          removeCookie('token', { path: '/' });
          removeCookie('id', { path: '/' });
          history.push('/login');
        } else {
          dispatch(getUserInfo(cookies.id, cookies.token));
        }
      } else {
        history.push('/login');
      }
    }
  }, [auth.isAuthenticated, auth.tokenExpired, cookies, cookies.id, cookies.token, dispatch, history, removeCookie]);

  useEffect(() => {
    if (auth.isAuthenticated && location.pathname === '/') {
      if (user.role.indexOf('MANAGER') !== -1 || user.role === 'MANAGER') {
        history.push('/admin/course/course');
      } else if (user.role.indexOf('NORMAL') !== -1 || user.role === 'NORMAL') {
        if (user.classes.length !== 0) {
          const sortedClasses = user.classes.sort(
            (a, b) => b.class_name.localeCompare(a.class_name) || b.course_name.localeCompare(a.course_name),
          );
          history.push(`/my-class/${sortedClasses[0].course_id}/${sortedClasses[0].class_id}/challenge`);
        } else {
          history.push('/all-class');
        }
      } else {
        history.push('/my-profile');
      }
    }
  }, [auth.isAuthenticated, history, location.pathname, user.classes, user.classes.length, user.role]);

  if (!auth.isAuthenticated) {
    return <></>;
  }
  // layout-content-container-no-sidebar

  return (
    <div className="wrapper">
      <Header />
      <Sidebar />
      <div>
        <div className="layout-content-container ">
          <div className="layout-content">
            <Switch>
              <Route path="/admin" component={Admin} />
              <Route path="/my-profile" component={Account} />
              <Route path="/my-submission" component={MySubmission} />
              <Route exact path="/user-profile/:accountId" component={User} />
              <Route path="/" component={Normal} />
            </Switch>
          </div>
        </div>
      </div>
      <Fab href="https://forms.gle/KaYJnXwgvsovzqVG7" target="_blank" className={classes.bugReport}>
        <FeedbackIcon />
      </Fab>
    </div>
  );
}

export default Index;
