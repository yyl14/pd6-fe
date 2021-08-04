import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
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

export default function Account({
  menuItems, classes, history, location,
}) {
  const instituteList = useSelector((state) => state.admin.account.institutes);
  const accountList = useSelector((state) => state.admin.account.accounts);
  const baseURL = '/admin/account';
  const [mode1, setMode1] = useState('main');
  const [institute, setInstitute] = useState(instituteList.byId[instituteList.allIds[0]].abbreviated_name);
  const [instituteID, setInstituteID] = useState(instituteList.byId[instituteList.allIds[0]].id);
  const [account, setAccount] = useState(accountList.byId[accountList.allIds[0]].username);
  const [accountID, setAccountID] = useState(accountList.byId[accountList.allIds[0]].id);
  const [display, setDisplay] = useState('unfold');

  const goBack = () => {
    history.goBack();
  };

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
    arrow = <ArrowBackIcon className={classes.arrow} onClick={goBack} />;
    title = institute;
    itemList = [
      {
        text: 'Setting',
        path: `${baseURL}/institute/${instituteID}/setting`,
        icon: <SettingsIcon className={location.pathname === `${baseURL}/institute/${instituteID}/setting` ? classes.activeIcon : classes.icon} />,
      },
    ];
  } else if (mode1 === 'account') {
    arrow = <ArrowBackIcon className={classes.arrow} onClick={goBack} />;
    title = account;
    itemList = [
      {
        text: 'Setting',
        path: `${baseURL}/account/${accountID}/setting`,
        icon: <SettingsIcon className={location.pathname === `${baseURL}/account/${accountID}/setting` ? classes.activeIcon : classes.icon} />,
      },
    ];
  }

  const foldAccount = () => {
    setDisplay('fold');
  };

  const unfoldAccount = () => {
    setDisplay('unfold');
  };

  useEffect(() => {
    // console.log(instituteList, accountList);
    // console.log('Current route', location.pathname);
    const split = location.pathname.split('/');
    const slashNum = split.length - 1;
    // console.log(split, slashNum);
    if (slashNum === 3) {
      setMode1('main');
    } else if (split[3] === 'institute' && split[5] === 'setting') {
      setInstituteID(split[4]);
      setInstitute(instituteList.byId[split[4]].abbreviated_name);
      setMode1('institute');
    } else if (split[3] === 'account' && split[5] === 'setting') {
      setInstituteID(split[4]);
      setInstitute(accountList.byId[split[4]].username);
      setMode1('account');
    }
  }, [accountList, instituteList, location]);
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
          <div className={classes.topSpace} />
        ) : (
          arrow
        )}
        <div>

          {display === 'unfold' ? (
            <PlayArrowIcon className={`${classes.titleIcon} ${classes.rotate90}`} onClick={foldAccount} />
          ) : (
            <PlayArrowIcon className={classes.titleIcon} onClick={unfoldAccount} />
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
                <ListItemText primary={item.text} />
              </ListItem>
            ))}
          </List>
        ) : ''}

      </Drawer>
    </div>
  );
}
