import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import {
  Drawer, Typography, List, ListItem, ListItemIcon, ListItemText, Divider, IconButton,
} from '@material-ui/core';
import Icon from '../icon/index';

import { fetchChallenges, addChallenge } from '../../../actions/myClass/challenge';
import { fetchClass, fetchCourse } from '../../../actions/common/common';

export default function Challenge({
  classNames, history, location, mode,
}) {
  const { courseId, classId } = useParams();
  const dispatch = useDispatch();
  const authToken = useSelector((state) => state.auth.token);
  const loading = useSelector((state) => state.loading.myClass.challenge);
  const challenges = useSelector((state) => state.challenges.byId);
  const challengesID = useSelector((state) => state.challenges.allIds);
  // const classes = useSelector((state) => state.classes.byId);
  // const courses = useSelector((state) => state.courses.byId);
  const classes = useSelector((state) => state.classes);
  const courses = useSelector((state) => state.courses);
  const userClasses = useSelector((state) => state.user.classes);

  useEffect(() => {
    dispatch(fetchCourse(authToken, courseId));
    dispatch(fetchClass(authToken, classId));
  }, [dispatch, authToken, classId, courseId]);

  const { instituteId, accountId } = useParams();
  const instituteList = useSelector((state) => state.institutes);
  const accountList = useSelector((state) => state.accounts);
  const baseURL = '/admin/account';
  const [display, setDisplay] = useState('unfold');

  const [title, setTitle] = useState('');
  const [itemList, setItemList] = useState([]);
  const [arrow, setArrow] = useState(null);
  const [TAicon, setTAicon] = useState(null);

  useEffect(() => {
    // console.log(instituteId, accountId);
    console.log(userClasses);
    console.log(courses, classes);
    console.log(courses[courseId].name, classes[classId].name);
    const goBackToInstitute = () => {
      history.push('/admin/account/institute');
    };

    const goBackToAccount = () => {
      history.push('/admin/account/account');
    };

    if (mode === 'main') {
      setTitle('PBC 111-1');
      setTAicon(<Icon.TA style={{ marginLeft: '100px' }} />);
      setItemList([
        {
          text: 'Challenge',
          icon: (
            <Icon.Challenge
              className={location.pathname === `${baseURL}/institute` ? classNames.activeIcon : classNames.icon}
            />
          ),
          path: `${baseURL}/institute`,
        },
        {
          text: 'Submission',
          icon: (
            <Icon.Submission
              className={location.pathname === `${baseURL}/account` ? classNames.activeIcon : classNames.icon}
            />
          ),
          path: `${baseURL}/submission`,
        },
        {
          text: 'Grade',
          icon: (
            <Icon.Grade className={location.pathname === `${baseURL}/account` ? classNames.activeIcon : classNames.icon} />
          ),
          path: `${baseURL}/grade`,
        },
        {
          text: 'Team',
          icon: (
            <Icon.Team
              className={location.pathname === `${baseURL}/account` ? classNames.activeIcon : classNames.icon}
            />
          ),
          path: `${baseURL}/team`,
        },
        {
          text: 'Member',
          icon: (
            <Icon.Member
              className={location.pathname === `${baseURL}/account` ? classNames.activeIcon : classNames.icon}
            />
          ),
          path: `${baseURL}/member`,
        },
      ]);
    } else if (mode === 'institute' && instituteList.byId[instituteId]) {
      setArrow(
        <IconButton className={classNames.arrow} onClick={goBackToInstitute}>
          <Icon.ArrowBackRoundedIcon />
        </IconButton>,
      );
      setTitle(instituteList.byId[instituteId].abbreviated_name);
      setItemList([
        {
          text: 'Setting',
          path: `${baseURL}/institute/${instituteId}/setting`,
          icon: (
            <Icon.SettingsIcon
              className={
                location.pathname === `${baseURL}/institute/${instituteId}/setting` ? classNames.activeIcon : classNames.icon
              }
            />
          ),
        },
      ]);
    } else if (mode === 'account' && accountList.byId[accountId]) {
      setArrow(
        <IconButton className={classNames.arrow} onClick={goBackToAccount}>
          <Icon.ArrowBackRoundedIcon />
        </IconButton>,
      );
      setTitle(accountList.byId[accountId].username);
      setItemList([
        {
          text: 'Setting',
          path: `${baseURL}/account/${accountId}/setting`,
          icon: (
            <Icon.SettingsIcon
              className={
                location.pathname === `${baseURL}/account/${accountId}/setting` ? classNames.activeIcon : classNames.icon
              }
            />
          ),
        },
      ]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname, history, mode, courses, classes, accountId, instituteId]);

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
          className={classNames.drawer}
          variant="permanent"
          anchor="left"
          PaperProps={{ elevation: 5 }}
          classes={{ paper: classNames.drawerPaper }}
        />
      </div>
    );
  }

  return (
    <div>
      <Drawer
        className={classNames.drawer}
        variant="permanent"
        anchor="left"
        PaperProps={{ elevation: 5 }}
        classes={{ paper: classNames.drawerPaper }}
      >
        {mode === 'main' ? <div className={classNames.topSpace} /> : arrow}
        <div>
          {display === 'unfold' ? (
            <Icon.TriangleDown className={classNames.titleIcon} onClick={foldAccount} />
          ) : (
            <Icon.TriangleRight className={classNames.titleIcon} onClick={unfoldAccount} />
          )}
          <Typography variant="h4" className={classNames.title}>
            {title}
            {TAicon}
          </Typography>
        </div>
        <Divider variant="middle" className={classNames.divider} />
        {display === 'unfold' ? (
          <List>
            {itemList.map((item) => (
              <ListItem button key={item.text} onClick={() => history.push(item.path)} className={classNames.item}>
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.text} className={location.pathname === item.path ? classNames.active : null} />
              </ListItem>
            ))}
          </List>
        ) : (
          ''
        )}
        <div className={classNames.bottomSpace} />
      </Drawer>
    </div>
  );
}
