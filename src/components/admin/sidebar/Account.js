import React from 'react';
import {
  Drawer,
  Typography,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
} from '@material-ui/core';
import SchoolIcon from '@material-ui/icons/School';
import PersonIcon from '@material-ui/icons/Person';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import SettingsIcon from '@material-ui/icons/Settings';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { useHistory, useLocation } from 'react-router-dom';

export default function Account({
  menuItems, classes, history, location, mode1, institute, account,
}) {
  let title = null;
  let itemList = [];
  let arrow = null;
  if (mode1 === 'main') {
    title = 'Account';
    itemList = [
      {
        text: 'Institute',
        path: '/institute',
        icon: <SchoolIcon className={location.pathname === '/institute' ? classes.activeIcon : classes.icon} />,
      },
      {
        text: 'Account',
        icon: <PersonIcon className={location.pathname === '/account' ? classes.activeIcon : classes.icon} />,
        path: '/account',
      },
    ];
  } else if (mode1 === 'institute') {
    arrow = <ArrowBackIcon className={classes.arrow} />;
    title = institute;
    itemList = [
      {
        text: 'Institute Setting',
        path: '/institute_setting',
        icon: <SettingsIcon className={location.pathname === '/institute_setting' ? classes.activeIcon : classes.icon} />,
      },
    ];
  } else if (mode1 === 'account') {
    arrow = <ArrowBackIcon className={classes.arrow} />;
    title = account;
    itemList = [
      {
        text: 'Account Setting',
        path: '/account_setting',
        icon: <SettingsIcon className={location.pathname === '/account_setting' ? classes.activeIcon : classes.icon} />,
      },
    ];
  }
  return (
    <div>
      <Drawer
        className={classes.drawer}
        variant="permanent"
        anchor="left"
        PaperProps={{ elevation: 5 }}
        classes={{ paper: classes.drawerPaper }}
      >
        {arrow}
        <div>

          <PlayArrowIcon className={classes.titleIcon} />
          <Typography variant="h2" className={classes.title}>
            {title}
          </Typography>
        </div>
        <Divider variant="middle" className={classes.divider} />

        <List>
          {itemList.map((item) => (
            <ListItem
              button
              key={item.text}
              onClick={() => history.push(item.path)}
              className={location.pathname === item.path ? classes.active : null}
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
