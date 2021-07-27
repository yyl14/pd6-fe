import React, { useEffect } from 'react';
import {
  makeStyles, Typography, AppBar, Toolbar, Avatar,
} from '@material-ui/core';
import { AddCircleOutline, SubjectOutlined } from '@material-ui/icons';
import NotificationsIcon from '@material-ui/icons/Notifications';
import { useHistory, useLocation } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  appbar: {
    height: '75px',
    // height: '9.21vh',
    background: '#090909',
  },
  toolbar: {
    height: '75px',
    // height: '9.21vh',
  },
  main: theme.mixins.toolbar,
  item: {
    marginRight: '3.5vw',
  },
  notification: {
    float: 'left',
    height: '3.28vh',
    width: '3.28vh',
    // marginRight: '2vw',
  },
  name: {
    float: 'left',
    margin: 'auto 1vw auto 2vw',
  },
  right: {
    marginLeft: 'auto',
    marginRight: 0,
    display: 'flex',
    alignItems: 'center',
  },
  avatar: {
    marginLeft: '2vw',
    marginRight: '3.5vw',
    height: '6.14vh',
    width: '6.14vh',
  },
  a: {
    color: 'inherit',
    textDecoration: 'none',
  },
  active: {
    textDecoration: 'none',
    color: '#1EA5FF',
  },
}));

export default function Header({ role }) {
  const baseURL = '';
  const classes = useStyles();
  const history = useHistory();
  const location = useLocation();
  let itemList = [];

  if (role === 'MANAGER') {
    itemList = [
      {
        text: 'Course',
        path: '/admin/course',
      },
      {
        text: 'Account',
        path: '/admin/account',
      },
      {
        text: 'System',
        path: '/admin/system',
      },
      {
        text: 'About',
        path: '/about',
      },
    ];
  } else if (role === 'NORMAL') {
    itemList = [
      {
        text: 'Problem Set',
        path: '/',
      },
      {
        text: 'About',
        path: '/about',
      },
    ];
  } else if (role === 'GUEST') {
    itemList = [
      {
        text: 'Your Class',
        path: '/',
      },
      {
        text: 'Problem Set',
        path: '/problem_set',
      },
      {
        text: 'PDAO',
        path: '/pdao',
      },
      {
        text: 'About',
        path: '/about',
      },
    ];
  } else if (role === 'TA') {
    itemList = [
      {
        text: 'Your Class',
        path: '/',
      },
      {
        text: 'Problem Set',
        path: '/problem_set',
      },
      {
        text: 'PDAO',
        path: '/pdao',
      },
      {
        text: 'System',
        path: '/system',
      },
      {
        text: 'About',
        path: '/about',
      },
    ];
  }

  useEffect(() => {
    console.log('Current route', location.pathname);
  }, [location]);

  return (
    <div>
      <AppBar className={classes.appbar} elevation={0}>
        <Toolbar className={classes.toolbar}>
          <Avatar src="https://pdogs.ntu.im/judge/image/LOGO.png" className={classes.avatar} />
          {itemList.map((item) => (
            <Typography variant="h6" className={classes.item} key={item.text}>
              <a href={baseURL + item.path} className={location.pathname === item.path ? classes.active : classes.a}>
                {item.text}
              </a>
            </Typography>
          ))}
          <section className={classes.right}>
            <NotificationsIcon className={classes.notification} />
            <Typography variant="h6" className={classes.name}>
              shiba
            </Typography>
          </section>
        </Toolbar>
      </AppBar>
    </div>
  );
}
