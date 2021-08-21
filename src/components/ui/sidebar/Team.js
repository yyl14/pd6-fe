import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import {
  Drawer, Typography, List, ListItem, ListItemIcon, ListItemText, Divider, IconButton,
} from '@material-ui/core';
import Icon from '../icon/index';

export default function Team({
  classes, history, location, mode,
}) {
  const baseURL = '/admin/account';
  const [title, setTitle] = useState('');
  const [itemList, setItemList] = useState([]);
  const [arrow, setArrow] = useState(null);
  const [display, setDisplay] = useState('unfold');
  useEffect(() => {
    if (mode === 'main') {
      setTitle('PBC 111-1');
      setItemList([
        {
          text: 'Challenge',
          icon: (
            <Icon.Challenge className={location.pathname === `${baseURL}/institute` ? classes.activeIcon : classes.icon} />
          ),
          path: `${baseURL}/institute`,
        },
        {
          text: 'Submission',
          icon: (
            <Icon.Submission className={location.pathname === `${baseURL}/account` ? classes.activeIcon : classes.icon} />
          ),
          path: `${baseURL}/submission`,
        },
        {
          text: 'Grade',
          icon: (
            <Icon.Grade className={location.pathname === `${baseURL}/account` ? classes.activeIcon : classes.icon} />
          ),
          path: `${baseURL}/grade`,
        },
        {
          text: 'Team',
          icon: (
            <Icon.SupervisedUserCircleIcon className={location.pathname === `${baseURL}/account` ? classes.activeIcon : classes.icon} />
          ),
          path: `${baseURL}/team`,
        },
        {
          text: 'Member',
          icon: (
            <Icon.PeopleIcon className={location.pathname === `${baseURL}/account` ? classes.activeIcon : classes.icon} />
          ),
          path: `${baseURL}/member`,
        },
      ]);
    }
  }, [classes.activeIcon, classes.icon, location.pathname, mode]);

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
