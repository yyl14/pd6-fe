import React, { useState, useEffect } from 'react';
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
  menuItems, classes, history, location,
}) {
  const baseURL = '/admin/account';
  const [mode1, setMode1] = useState('main');
  const [institute, setInstitute] = useState('');
  const [account, setAccount] = useState('');
  let title = null;
  let itemList = [];
  let arrow = null;
  if (mode1 === 'main') {
    title = 'Account';
    itemList = [
      {
        text: 'Institute',
        icon: <SchoolIcon className={location.pathname === `${baseURL}/institute` ? classes.activeIcon : classes.icon} />,
        path: `${baseURL}/institute`,
      },
      {
        text: 'Account',
        icon: <PersonIcon className={location.pathname === `${baseURL}/account` ? classes.activeIcon : classes.icon} />,
        path: `${baseURL}/account`,
      },
    ];
  } else if (mode1 === 'institute') {
    arrow = <ArrowBackIcon className={classes.arrow} />;
    title = institute;
    itemList = [
      {
        text: 'Institute Setting',
        path: `${baseURL}/institute/${institute}/setting`,
        icon: <SettingsIcon className={location.pathname === `${baseURL}/institute/${institute}/setting` ? classes.activeIcon : classes.icon} />,
      },
    ];
  } else if (mode1 === 'account') {
    arrow = <ArrowBackIcon className={classes.arrow} />;
    title = account;
    itemList = [
      {
        text: 'Account Setting',
        path: `${baseURL}/account/${account}/setting`,
        icon: <SettingsIcon className={location.pathname === `${baseURL}/account/${account}/setting` ? classes.activeIcon : classes.icon} />,
      },
    ];
  }
  useEffect(() => {
    // console.log('Current route', location.pathname);
    const slashNum = (location.pathname.match(new RegExp('/', 'g')) || []).length;
    if (slashNum === 2 || slashNum === 3) {
      setMode1('main');
    } else if (location.pathname.includes('institute')) {
      setMode1('institute');
      const instituteName = location.pathname.match('institute/(.*)/setting');
      setInstitute(instituteName[1]);
    } else if (location.pathname.includes('account')) {
      setMode1('account');
      const accountName = location.pathname.match('account/account/(.*)/setting');
      setAccount(accountName[1]);
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
