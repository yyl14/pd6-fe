import React from 'react';
import {
  makeStyles, Typography, AppBar, Toolbar, Avatar,
} from '@material-ui/core';
import { AddCircleOutline, SubjectOutlined } from '@material-ui/icons';
import NotificationsIcon from '@material-ui/icons/Notifications';
import { useHistory, useLocation } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  appbar: {
    height: '9.21vh',
    background: '#090909',
  },
  toolbar: {
    height: '9.21vh',
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
    marginLeft: '2vw',
    marginRight: '1vw',
  },
  right: {
    marginLeft: 'auto',
    marginRight: 0,
  },
  avatar: {
    marginLeft: '2vw',
    marginRight: '3.5vw',
    height: '6.14vh',
    width: '6.14vh',
  },
}));

export default function Header(props) {
  const classes = useStyles();
  const history = useHistory();
  const location = useLocation();

  return (
    <div>
      <AppBar className={classes.appbar} elevation={0}>
        <Toolbar className={classes.toolbar}>
          <Avatar
            src="https://pdogs.ntu.im/judge/image/LOGO.png"
            className={classes.avatar}
          />
          <Typography className={classes.item}>Courses</Typography>
          <Typography className={classes.item}>Account</Typography>
          <Typography className={classes.item}>System </Typography>
          <Typography className={classes.item}>About</Typography>
          <div className={classes.right}>
            <NotificationsIcon className={classes.notification} />
            <Typography className={classes.name}>shiba</Typography>
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
}
