import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core';
import { useHistory, useLocation } from 'react-router-dom';

import Account from './sidebar/Account';
import Course from './sidebar/Course';
import System from './sidebar/System';

const useStyles = makeStyles((theme) => ({
  drawer: {
    top: '55px',
    width: '300px',
  },
  drawerPaper: {
    top: '55px',
    width: '300px',
  },
  active: {
    color: '#1EA5FF',
  },
  topSpace: {
    marginTop: '10vh',
  },
  titleIcon: {
    float: 'left',
    color: '#090909',
    marginTop: '5.4vh',
    marginBottom: '1.23vh',
    marginLeft: '1.6vw',
    marginRight: '0.97vw',
    '&:hover': {
      cursor: 'pointer',
    },
  },
  title: {
    float: 'left',
    marginTop: '5vh',
    marginBottom: '1.23vh',
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
  activeIcon: {
    color: '#1EA5FF',
    marginLeft: '2.75vw',
    marginRight: '1.3vw',
  },
  secondTitleIcon: {
    float: 'left',
    color: '#090909',
    marginTop: '3.5vh',
    marginBottom: '1.23vh',
    marginLeft: '1.6vw',
    marginRight: '0.97vw',
    '&:hover': {
      cursor: 'pointer',
    },
  },
  divider: {
    marginBottom: '2.21vh',
  },
  arrow: {
    marginTop: '7.3vh',
    marginLeft: '1.6vw',
    marginRight: 'auto',
    '&:hover': {
      cursor: 'pointer',
    },
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
  const [mode, setMode] = useState('course');

  useEffect(() => {
    if (location.pathname.includes('course')) {
      setMode('course');
    } else if (location.pathname.includes('account')) {
      setMode('account');
    } else if (location.pathname.includes('system')) {
      setMode('system');
    }
  }, [location]);

  const menuItems = []; // to be done, get data from redux

  if (mode === 'course') {
    return (
      <div>
        <Course
          menuItems={menuItems}
          classes={classes}
          history={history}
          location={location}
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
        />
      </div>
    );
  }
  return <div />;
}

// button: {
//   marginTop: '2.5vh',
//   marginLeft: 'auto',
//   marginRight: '1.5vw',
//   width: '90px',
//   height: '36px',
//   fontSize: '18px',
//   alignItems: 'center',
//   textAlign: 'center',
//   display: 'flex',
// },
// itemPadding: {
//   padding: '0px',
// },
