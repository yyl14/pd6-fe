import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import {
  Drawer, Typography, List, ListItem, ListItemIcon, ListItemText, Divider, IconButton,
} from '@material-ui/core';
import Icon from '../icon/index';

import { fetchCourses, fetchClasses } from '../../../actions/admin/course';

export default function Challenge({
  classes, history, location, mode,
}) {
  // const dispatch = useDispatch();
  // const authToken = useSelector((state) => state.auth.token);
  // const loading = useSelector((state) => state.loading.admin.course);
  // const courseList = useSelector((state) => state.courses);
  // const classList = useSelector((state) => state.classes);

  // const userClass = useSelector((state) => state.user.classes);
  // useEffect(() => {
  //   if (!loading.addCourse && !loading.deleteCourse && !loading.renameCourse) {
  //     dispatch(fetchCourses(authToken));
  //   }
  // }, [authToken, dispatch, loading.addCourse, loading.deleteCourse, loading.renameCourse]);

  // useEffect(() => {
  //   if (!loading.addClass && !loading.renameClass && !loading.deleteClass) {
  //     dispatch(fetchClasses(authToken, '1'));
  //   }
  // }, [authToken, dispatch, loading.addClass, loading.deleteClass, loading.renameClass]);

  // useEffect(() => {
  //   console.log(userClass);
  //   console.log(courseList, classList);
  //   if (courseList.allIds.length !== 0) {
  //     if (location.pathname === '/admin/course/course') {
  //       history.push(`/admin/course/course/${courseList.byId[courseList.allIds[0]].id}/class-list`);
  //     }
  //   }
  // }, [courseList, classList, history, location, userClass]);

  // const {
  //   courseId, classId, challengeId, problemId,
  // } = useParams();
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
              className={location.pathname === `${baseURL}/institute` ? classes.activeIcon : classes.icon}
            />
          ),
          path: `${baseURL}/institute`,
        },
        {
          text: 'Submission',
          icon: (
            <Icon.Submission
              className={location.pathname === `${baseURL}/account` ? classes.activeIcon : classes.icon}
            />
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
            <Icon.SupervisedUserCircleIcon
              className={location.pathname === `${baseURL}/account` ? classes.activeIcon : classes.icon}
            />
          ),
          path: `${baseURL}/team`,
        },
        {
          text: 'Member',
          icon: (
            <Icon.PeopleIcon
              className={location.pathname === `${baseURL}/account` ? classes.activeIcon : classes.icon}
            />
          ),
          path: `${baseURL}/member`,
        },
      ]);
    } else if (mode === 'institute' && instituteList.byId[instituteId]) {
      setArrow(
        <IconButton className={classes.arrow} onClick={goBackToInstitute}>
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
                location.pathname === `${baseURL}/institute/${instituteId}/setting` ? classes.activeIcon : classes.icon
              }
            />
          ),
        },
      ]);
    } else if (mode === 'account' && accountList.byId[accountId]) {
      setArrow(
        <IconButton className={classes.arrow} onClick={goBackToAccount}>
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
            {TAicon}
          </Typography>
        </div>
        <Divider variant="middle" className={classes.divider} />
        {display === 'unfold' ? (
          <List>
            {itemList.map((item) => (
              <ListItem button key={item.text} onClick={() => history.push(item.path)} className={classes.item}>
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.text} className={location.pathname === item.path ? classes.active : null} />
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
