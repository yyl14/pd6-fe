import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import {
  Drawer, Typography, List, ListItem, ListItemIcon, ListItemText, Divider, Button,
} from '@material-ui/core';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import SettingsIcon from '@material-ui/icons/Settings';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import DescriptionIcon from '@material-ui/icons/Description';
import NotificationsIcon from '@material-ui/icons/Notifications';
import CodeIcon from '@material-ui/icons/Code';
import AddIcon from '@material-ui/icons/Add';

export default function System({
  menuItems, classes, history, location,
}) {
  const announcementList = useSelector((state) => state.admin.system.announcements);
  const languageList = useSelector((state) => state.admin.system.submitLang);
  const baseURL = '/admin/system';
  const [mode1, setMode1] = useState('main');
  const [announcement, setAnnouncement] = useState(announcementList.byId[announcementList.allIds[0]].title);
  const [announcementID, setAnnouncementID] = useState(announcementList.byId[announcementList.allIds[0]].id);
  const [language, setLanguage] = useState(languageList.byId[languageList.allIds[0]].name);
  const [languageID, setLanguageID] = useState(languageList.byId[languageList.allIds[0]].id);
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
        icon: (
          <DescriptionIcon
            className={location.pathname === `${baseURL}/accesslog` ? classes.activeIcon : classes.icon}
          />
        ),
        path: `${baseURL}/accesslog`,
      },
      {
        text: 'Announcement',
        icon: (
          <NotificationsIcon
            className={location.pathname === `${baseURL}/announcement` ? classes.activeIcon : classes.icon}
          />
        ),
        path: `${baseURL}/announcement`,
      },
      {
        text: 'Submission Language',
        icon: (
          <CodeIcon className={location.pathname === `${baseURL}/submitlang` ? classes.activeIcon : classes.icon} />
        ),
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
        icon: (
          <AddIcon
            className={location.pathname === `${baseURL}/announcement/create` ? classes.activeIcon : classes.icon}
          />
        ),
      },
    ];
  } else if (mode1 === 'announcement') {
    arrow = <ArrowBackIcon className={classes.arrow} onClick={goBack} />;
    title = announcement;
    itemList = [
      {
        text: 'Setting',
        path: `${baseURL}/announcement/${announcementID}/setting`,
        icon: (
          <SettingsIcon
            className={
              location.pathname === `${baseURL}/announcement/${announcementID}/setting`
                ? classes.activeIcon
                : classes.icon
            }
          />
        ),
      },
    ];
  } else if (mode1 === 'language') {
    arrow = <ArrowBackIcon className={classes.arrow} onClick={goBack} />;
    title = language;
    itemList = [
      {
        text: 'Setting',
        path: `${baseURL}/submitlang/${languageID}/setting`,
        icon: (
          <SettingsIcon
            className={
              location.pathname === `${baseURL}/submitlang/${languageID}/setting` ? classes.activeIcon : classes.icon
            }
          />
        ),
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
    const split = location.pathname.split('/');
    const slashNum = split.length - 1;
    if (slashNum === 3) {
      setMode1('main');
    } else if (split[2] === 'system' && split[4] === 'create') {
      setMode1('create');
    } else if (split[3] === 'announcement' && split[5] === 'setting') {
      setAnnouncementID(split[4]);
      setAnnouncement(announcementList.byId[split[4]].title);
      setMode1('announcement');
    } else if (split[3] === 'submitlang' && split[5] === 'setting') {
      setLanguageID(split[4]);
      setLanguage(`${languageList.byId[split[4]].name} ${languageList.byId[split[4]].version}`);
      setMode1('language');
    }
  }, [announcementList, announcementList.byId, languageList, languageList.byId, location]);

  return (
    <div>
      <Drawer
        className={classes.drawer}
        variant="permanent"
        anchor="left"
        PaperProps={{ elevation: 5 }}
        classes={{ paper: classes.drawerPaper }}
      >
        {mode1 === 'main' ? <div className={classes.topSpace} /> : arrow}
        <div>
          {display === 'unfold' ? (
            <PlayArrowIcon className={`${classes.titleIcon} ${classes.rotate90}`} onClick={foldSystem} />
          ) : (
            <PlayArrowIcon className={classes.titleIcon} onClick={unfoldSystem} />
          )}
          <Typography variant="h4" className={classes.title}>
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
                <ListItemText primary={item.text} className={classes.wrapping} />
              </ListItem>
            ))}
          </List>
        ) : (
          ''
        )}
      </Drawer>
    </div>
  );
}
