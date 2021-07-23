import React from 'react';
import {
  Drawer,
  Typography,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Button,
} from '@material-ui/core';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import SettingsIcon from '@material-ui/icons/Settings';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import DescriptionIcon from '@material-ui/icons/Description';
import NotificationsIcon from '@material-ui/icons/Notifications';
import CodeIcon from '@material-ui/icons/Code';
import AddIcon from '@material-ui/icons/Add';
import { useHistory, useLocation } from 'react-router-dom';

export default function System({
  menuItems, classes, history, location, mode1, announcement, language,
}) {
  let title = null;
  let itemList = [];
  let arrow = null;
  if (mode1 === 'main') {
    title = 'System';
    itemList = [
      {
        text: 'Access Log',
        path: '/access_log',
        icon: <DescriptionIcon className={location.pathname === '/access_log' ? classes.activeIcon : classes.icon} />,
      },
      {
        text: 'Announcement',
        icon: <NotificationsIcon className={location.pathname === '/announcement' ? classes.activeIcon : classes.icon} />,
        path: '/announcement',
      },
      {
        text: 'Submission Language',
        icon: <CodeIcon className={location.pathname === '/submission_language' ? classes.activeIcon : classes.icon} />,
        path: '/submission_language',
      },
    ];
  } else if (mode1 === 'create') {
    arrow = <ArrowBackIcon className={classes.arrow} />;
    title = 'Announcement';
    itemList = [
      {
        text: 'Create',
        path: '/create_announcement',
        icon: <AddIcon className={location.pathname === '/create_announcement' ? classes.activeIcon : classes.icon} />,
      },
    ];
  } else if (mode1 === 'announcement') {
    arrow = <ArrowBackIcon className={classes.arrow} />;
    title = announcement;
    itemList = [
      {
        text: 'Setting',
        path: '/announcement_setting',
        icon: <SettingsIcon className={location.pathname === '/announcement_setting' ? classes.activeIcon : classes.icon} />,
      },
    ];
  } else if (mode1 === 'language') {
    arrow = <ArrowBackIcon className={classes.arrow} />;
    title = language;
    itemList = [
      {
        text: 'Setting',
        path: '/language_setting',
        icon: <SettingsIcon className={location.pathname === '/language_setting' ? classes.activeIcon : classes.icon} />,
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
