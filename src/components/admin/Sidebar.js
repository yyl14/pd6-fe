import React from 'react';
import { makeStyles } from '@material-ui/core';
import { useHistory, useLocation } from 'react-router-dom';

import Account from './sidebar/Account';
import Course from './sidebar/Course';
import System from './sidebar/System';

const useStyles = makeStyles((theme) => ({
  drawer: {
    top: '9.21vh',
    width: '300px',
  },
  drawerPaper: {
    top: '9.21vh',
    width: '300px',
  },
  active: {
    color: '#1EA5FF',
  },
  activeIcon: {
    color: '#1EA5FF',
    marginLeft: '2.75vw',
    marginRight: '1.3vw',
  },
  title: {
    float: 'left',
    marginTop: '5vh',
    marginBottom: '1.23vh',
    // marginRight: '9vw',
  },
  secondTitle: {
    float: 'left',
    marginTop: '3vh',
    marginBottom: '1.23vh',
  },
  icon: {
    color: '#090909',
    marginLeft: '2.75vw',
    marginRight: '1.3vw',
  },
  titleIcon: {
    float: 'left',
    color: '#090909',
    marginTop: '6.1vh',
    marginBottom: '1.23vh',
    marginLeft: '1.6vw',
    marginRight: '0.97vw',
    // padding: '14px',
  },
  secondTitleIcon: {
    float: 'left',
    color: '#090909',
    marginTop: '4vh',
    marginBottom: '1.23vh',
    marginLeft: '1.6vw',
    marginRight: '0.97vw',
  },
  divider: {
    marginBottom: '2.21vh',
  },
  arrow: {
    marginTop: '4vh',
    marginLeft: '1.6vw',
    marginRight: 'auto',
  },
  button: {
    marginLeft: 'auto',
    marginRight: '1vw',
    width: '90px',
    height: '36px',
    fontSize: '18px',
    alignItems: 'center',
    textAlign: 'center',
    display: 'flex',
  },
}));

export default function Sidebar({ mode = 'course' }) {
  const classes = useStyles();
  const history = useHistory();
  const location = useLocation();

  const menuItems = null;

  if (mode === 'course') {
    return (
      <div>
        <Course
          menuItems={menuItems}
          classes={classes}
          history={history}
          location={location}
          mode1="main"
          course="PBC / 111-1"
        />
      </div>
    );
  }
  if (mode === 'account') {
    return (
      <div>
        <Account
          menuItems={menuItems}
          classes={classes}
          history={history}
          location={location}
          mode1="account"
          institute="NTNU"
          account="B05705066"
        />
      </div>
    );
  }
  if (mode === 'system') {
    return (
      <div>
        <System
          menuItems={menuItems}
          classes={classes}
          history={history}
          location={location}
          mode1="language"
          announcement="管院停電"
          language="Python 3.8.1"
        />
      </div>
    );
  }
  return <div />;
}
