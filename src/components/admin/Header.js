import React from 'react';
import {
  makeStyles,
  Typography,
  AppBar,
  Toolbar,
  Avatar,
} from '@material-ui/core';
import { AddCircleOutline, SubjectOutlined, Notifications } from '@material-ui/icons';
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
    marginRight: '2.604vw',
  },
  notification: {
    height: '3.28vh',
    width: '3.28vh',
    marginLeft: '52vw',
    marginRight: '0vw',
  },
  name: {
    marginLeft: 'auto',
    marginRight: '1vw',
  },
  avatar: {
    marginLeft: '0.7vw',
    marginRight: '2.604vw',
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
            src="https://img.ltn.com.tw/Upload/ent/page/800/2020/04/02/3120679_1.jpg"
            className={classes.avatar}
          />
          <Typography className={classes.item}>Courses</Typography>
          <Typography className={classes.item}>Account</Typography>
          <Typography className={classes.item}>System </Typography>
          <Typography className={classes.item}>About</Typography>
          <Notifications className={classes.notification} />
          <Typography className={classes.name}>shiba</Typography>
        </Toolbar>
      </AppBar>
    </div>
  );
}
