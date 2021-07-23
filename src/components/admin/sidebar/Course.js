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
import PeopleIcon from '@material-ui/icons/People';
import { useHistory, useLocation } from 'react-router-dom';

export default function Course({
  menuItems, classes, history, location, mode1, course, semester,
}) {
  let title1 = null;
  let title2 = null;
  let itemList = [];
  let secondItemList = [];
  let arrow = null;
  if (mode1 === 'main') {
    title1 = 'Lesson';
    title2 = 'Contest';
    itemList = [
      {
        text: 'PBC',
        path: '/pbc',
        icon: <PeopleIcon className={location.pathname === '/pbc' ? classes.activeIcon : classes.icon} />,
      },
      {
        text: 'DSAP',
        icon: <PeopleIcon className={location.pathname === '/dsap' ? classes.activeIcon : classes.icon} />,
        path: '/dsap',
      },
      {
        text: 'PD',
        icon: <PeopleIcon className={location.pathname === '/pd' ? classes.activeIcon : classes.icon} />,
        path: '/pd',
      },
      {
        text: 'OR',
        icon: <PeopleIcon className={location.pathname === '/or' ? classes.activeIcon : classes.icon} />,
        path: '/or',
      },
    ];
    secondItemList = [
      {
        text: 'PDAO',
        path: '/pdao',
        icon: <PeopleIcon className={location.pathname === '/pdao' ? classes.activeIcon : classes.icon} />,
      }];
  } else if (mode1 === 'setting') {
    arrow = <ArrowBackIcon className={classes.arrow} />;
    title1 = course;
    itemList = [
      {
        text: 'Course Setting',
        path: '/course_setting',
        icon: <SettingsIcon className={location.pathname === '/course_setting' ? classes.activeIcon : classes.icon} />,
      },
    ];
  } else if (mode1 === 'class') {
    arrow = <ArrowBackIcon className={classes.arrow} />;
    title1 = course;
    itemList = [
      {
        text: 'Members',
        path: '/member',
        icon: <PeopleIcon className={location.pathname === '/member' ? classes.activeIcon : classes.icon} />,
      },
      {
        text: 'Class Setting',
        path: '/class_setting',
        icon: <SettingsIcon className={location.pathname === '/class_setting' ? classes.activeIcon : classes.icon} />,
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
        {mode1 === 'main' ? (
          <Button color="primary" className={classes.button}>
            New
          </Button>
        ) : arrow }

        <div>

          <PlayArrowIcon className={classes.titleIcon} />
          <Typography variant="h2" className={classes.title}>
            {title1}
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
        {mode1 === 'main' ? (
          <>
            <div>
              <PlayArrowIcon className={classes.secondTitleIcon} />
              <Typography variant="h2" className={classes.secondTitle}>
                {title2}
              </Typography>
            </div>
            <Divider variant="middle" className={classes.divider} />
            <List>
              {secondItemList.map((item) => (
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
          </>
        ) : ''}
      </Drawer>
    </div>
  );
}
