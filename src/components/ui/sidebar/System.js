import React, { useState, useEffect } from 'react';
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
import DetailsIcon from '@material-ui/icons/Details';
import SettingsIcon from '@material-ui/icons/Settings';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import DescriptionIcon from '@material-ui/icons/Description';
import NotificationsIcon from '@material-ui/icons/Notifications';
import CodeIcon from '@material-ui/icons/Code';
import AddIcon from '@material-ui/icons/Add';
import { useHistory, useLocation } from 'react-router-dom';

export default function System({
  menuItems, classes, history, location,
}) {
  const baseURL = '/admin/system';
  const [mode1, setMode1] = useState('main');
  const [announcement, setAnnouncement] = useState('');
  const [language, setLanguage] = useState('');
  const [display, setDisplay] = useState('unfold');
  const goBack = () => {
    history.goBack();
  };

  let title = null;
  let itemList = [];
  let arrow = null;
  if (mode1 === 'main') {
    title = 'System';
    itemList = [
      {
        text: 'Access Log',
        icon: <DescriptionIcon className={location.pathname === `${baseURL}/accesslog` ? classes.activeIcon : classes.icon} />,
        path: `${baseURL}/accesslog`,
      },
      {
        text: 'Announcement',
        icon: <NotificationsIcon className={location.pathname === `${baseURL}/announcement` ? classes.activeIcon : classes.icon} />,
        path: `${baseURL}/announcement`,
      },
      {
        text: 'Submission Language',
        icon: <CodeIcon className={location.pathname === `${baseURL}/submitlang` ? classes.activeIcon : classes.icon} />,
        path: `${baseURL}/submitlang`,
      },
    ];
  } else if (mode1 === 'create') {
    arrow = <ArrowBackIcon className={classes.arrow} onClick={goBack} />;
    title = 'Announcement';
    itemList = [
      {
        text: 'Create',
        path: `${baseURL}/announcement/create`,
        icon: <AddIcon className={location.pathname === `${baseURL}/announcement/create` ? classes.activeIcon : classes.icon} />,
      },
    ];
  } else if (mode1 === 'announcement') {
    arrow = <ArrowBackIcon className={classes.arrow} onClick={goBack} />;
    title = announcement;
    itemList = [
      {
        text: 'Setting',
        path: `${baseURL}/announcement/${announcement}/setting`,
        icon: <SettingsIcon className={location.pathname === `${baseURL}/announcement/${announcement}/setting` ? classes.activeIcon : classes.icon} />,
      },
    ];
  } else if (mode1 === 'language') {
    arrow = <ArrowBackIcon className={classes.arrow} onClick={goBack} />;
    title = language;
    itemList = [
      {
        text: 'Setting',
        path: `${baseURL}/submitlang/${language}/setting`,
        icon: <SettingsIcon className={location.pathname === `${baseURL}/submitlang/${language}/setting` ? classes.activeIcon : classes.icon} />,
      },
    ];
  }

  const foldSystem = () => {
    setDisplay('fold');
  };

  const unfoldSystem = () => {
    setDisplay('unfold');
  };

  useEffect(() => {
    // console.log('Current route', location.pathname);
    const slashNum = (location.pathname.match(new RegExp('/', 'g')) || []).length;
    if (slashNum === 2 || slashNum === 3) {
      setMode1('main');
    } else if (location.pathname.includes('announcement/create')) {
      setMode1('create');
    } else if (location.pathname.includes('announcement')) {
      setMode1('announcement');
      const announcementName = location.pathname.match('announcement/(.*)/setting');
      setAnnouncement(announcementName[1]);
    } else if (location.pathname.includes('submitlang')) {
      setMode1('language');
      const languageName = location.pathname.match('submitlang/(.*)/setting');
      setLanguage(languageName[1]);
    }
  }, [location]);

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

          {display === 'unfold' ? (
            <PlayArrowIcon className={classes.titleIcon} onClick={foldSystem} />
          ) : (
            <DetailsIcon className={classes.titleIcon} onClick={unfoldSystem} />
          )}
          <Typography variant="h2" className={classes.title}>
            {title}
          </Typography>
        </div>
        <Divider variant="middle" className={classes.divider} />
        {display === 'unfold' ? (
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
        ) : ''}

      </Drawer>
    </div>
  );
}
