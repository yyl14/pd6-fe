import React from 'react';
import {
  makeStyles,
  Drawer,
  Typography,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Avatar,
  Divider,
} from '@material-ui/core';
import SchoolIcon from '@material-ui/icons/School';
import PersonIcon from '@material-ui/icons/Person';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import { useHistory, useLocation } from 'react-router-dom';

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
    marginTop: '9.34vh',
    marginBottom: '1.23vh',
    // marginRight: '9vw',
  },
  icon: {
    color: '#090909',
    marginLeft: '2.75vw',
    marginRight: '1.3vw',
  },
  titleIcon: {
    float: 'left',
    color: '#090909',
    marginTop: '10.44vh',
    marginBottom: '1.23vh',
    marginLeft: '1.6vw',
    marginRight: '0.97vw',
    // padding: '14px',
  },
  divider: {
    marginBottom: '2.21vh',
  },
}));

export default function Sidebar(props) {
  const classes = useStyles();
  const history = useHistory();
  const location = useLocation();
  console.log(props);

  const menuItems = [
    {
      text: 'Institute',
      path: '/institute',
      icon: <SchoolIcon className={
        location.pathname === '/institute' ? classes.activeIcon : classes.icon
      }
      />,
    },
    {
      text: 'Account',
      icon: <PersonIcon className={
        location.pathname === '/account' ? classes.activeIcon : classes.icon
      }
      />,
      path: '/account',
    },
  ];
  return (
    <div>
      <Drawer
        className={classes.drawer}
        variant="permanent"
        anchor="left"
        classes={{ paper: classes.drawerPaper }}
      >
        <div>
          <PlayArrowIcon className={classes.titleIcon} />
          <Typography variant="h2" className={classes.title}>
            Account
          </Typography>
        </div>
        <Divider variant="middle" className={classes.divider} />

        <List>
          {menuItems.map((item) => (
            <ListItem
              button
              key={item.text}
              onClick={() => history.push(item.path)}
              className={
                location.pathname === item.path ? classes.active : null
              }
            >
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItem>
          ))}
        </List>
      </Drawer>
    </div>
  );
}
