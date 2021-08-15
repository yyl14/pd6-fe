import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import {
  Drawer, Typography, List, ListItem, ListItemIcon, ListItemText, Divider,
} from '@material-ui/core';
import Icon from '../icon/index';

export default function Account({
  menuItems, classes, history, location, mode,
}) {
  const { instituteId, accountId } = useParams();
  const instituteList = useSelector((state) => state.institutes);
  const accountList = useSelector((state) => state.accounts);
  const baseURL = '/admin/account';
  const [display, setDisplay] = useState('unfold');

  const [title, setTitle] = useState('');
  const [itemList, setItemList] = useState([]);
  const [arrow, setArrow] = useState(null);

  useEffect(() => {
    // console.log(instituteId, accountId);
    const goBackToInstitute = () => {
      history.push('/admin/account/institute');
    };

    const goBackToAccount = () => {
      history.push('/admin/account/account');
    };

    if (mode === 'main') {
      setTitle('Account');
      setItemList([
        {
          text: 'Institute',
          icon: (
            <Icon.SchoolIcon className={location.pathname === `${baseURL}/institute` ? classes.activeIcon : classes.icon} />
          ),
          path: `${baseURL}/institute`,
        },
        {
          text: 'Account',
          icon: (
            <Icon.PersonIcon className={location.pathname === `${baseURL}/account` ? classes.activeIcon : classes.icon} />
          ),
          path: `${baseURL}/account`,
        },
      ]);
    } else if (mode === 'institute' && instituteList.byId[instituteId]) {
      setArrow(<Icon.ArrowBackRoundedIcon className={classes.arrow} onClick={goBackToInstitute} />);
      setTitle(instituteList.byId[instituteId].abbreviated_name);
      setItemList([
        {
          text: 'Setting',
          path: `${baseURL}/institute/${instituteId}/setting`,
          icon: (
            <Icon.SettingsIcon
              className={
                location.pathname === `${baseURL}/institute/${instituteId}/setting` ? classes.activeIcon : classes.icon
              }
            />
          ),
        },
      ]);
    } else if (mode === 'account' && accountList.byId[accountId]) {
      setArrow(<Icon.ArrowBackRoundedIcon className={classes.arrow} onClick={goBackToAccount} />);
      setTitle(accountList.byId[accountId].username);
      setItemList([
        {
          text: 'Setting',
          path: `${baseURL}/account/${accountId}/setting`,
          icon: (
            <Icon.SettingsIcon
              className={
                location.pathname === `${baseURL}/account/${accountId}/setting` ? classes.activeIcon : classes.icon
              }
            />
          ),
        },
      ]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname, history, mode, accountList, instituteList, accountId, instituteId]);

  const foldAccount = () => {
    setDisplay('fold');
  };

  const unfoldAccount = () => {
    setDisplay('unfold');
  };

  if (
    (instituteId !== undefined && instituteList.byId[instituteId] === undefined)
    || (accountId !== undefined && accountList.byId[accountId] === undefined)
  ) {
    return (
      <div>
        <Drawer
          className={classes.drawer}
          variant="permanent"
          anchor="left"
          PaperProps={{ elevation: 5 }}
          classes={{ paper: classes.drawerPaper }}
        />
      </div>
    );
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
        {mode === 'main' ? <div className={classes.topSpace} /> : arrow}
        <div>
          {display === 'unfold' ? (
            <Icon.TriangleDown className={classes.titleIcon} onClick={foldAccount} />
          ) : (
            <Icon.TriangleRight className={classes.titleIcon} onClick={unfoldAccount} />
          )}
          <Typography variant="h4" className={classes.title}>
            {title}
          </Typography>
        </div>
        <Divider variant="middle" className={classes.divider} />
        {display === 'unfold' ? (
          <List>
            {itemList.map((item) => (
              <ListItem button key={item.text} onClick={() => history.push(item.path)} className={classes.item}>
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText
                  primary={item.text}
                  className={location.pathname === item.path ? classes.active : null}
                />
              </ListItem>
            ))}
          </List>
        ) : (
          ''
        )}
        <div className={classes.bottomSpace} />
      </Drawer>
    </div>
  );
}
