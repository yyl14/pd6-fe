import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import {
  Drawer, Typography, List, ListItem, ListItemIcon, ListItemText, Divider, IconButton,
} from '@material-ui/core';
import Icon from '../icon/index';

export default function MyProfile({
  classes, history, location, mode,
}) {
  const account = useSelector((state) => state.user);
  const [display, setDisplay] = useState('unfold');
  const [title, setTitle] = useState('');
  const [itemList, setItemList] = useState([]);

  useEffect(() => {
    console.log(account);
    if (mode === 'main') {
      setTitle(account.username);
      setItemList([
        {
          text: 'Setting',
          path: '/my-profile',
          icon: (
            <Icon.SettingsIcon />
          ),
        },
      ]);
    }
  }, [account, mode]);

  const foldAccount = () => {
    setDisplay('fold');
  };

  const unfoldAccount = () => {
    setDisplay('unfold');
  };

  return (
    <div>
      <Drawer
        className={classes.drawer}
        variant="permanent"
        anchor="left"
        PaperProps={{ elevation: 5 }}
        classes={{ paper: classes.drawerPaper }}
      >
        <div className={classes.topSpace} />
        <div className={classes.title}>
          {display === 'unfold' ? (
            <Icon.TriangleDown className={classes.titleIcon} onClick={foldAccount} />
          ) : (
            <Icon.TriangleRight className={classes.titleIcon} onClick={unfoldAccount} />
          )}
          <Typography variant="h4" className={classes.titleText}>
            {title}
          </Typography>
        </div>
        <Divider variant="middle" className={classes.divider} />
        {display === 'unfold' ? (
          <List>
            {itemList.map((item) => (
              <ListItem button key={item.text} onClick={() => history.push(item.path)} className={classes.item}>
                <ListItemIcon
                  className={classes.itemIcon}
                  style={{ color: location.pathname === item.path ? '#1EA5FF' : '' }}
                >
                  {item.icon}

                </ListItemIcon>
                <ListItemText
                  primary={item.text}
                  className={location.pathname === item.path ? classes.activeItemText : classes.itemText}
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
