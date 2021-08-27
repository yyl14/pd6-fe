import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import {
  Drawer, Typography, List, ListItem, ListItemIcon, ListItemText, Divider, IconButton,
} from '@material-ui/core';
import { ContactSupportOutlined } from '@material-ui/icons';
import Icon from '../icon/index';

import { fetchClass, fetchCourse } from '../../../actions/common/common';

export default function MyClass({
  classNames, history, location, mode,
}) {
  const { courseId, classId } = useParams();
  const baseURL = '/my-class';
  const dispatch = useDispatch();
  const authToken = useSelector((state) => state.auth.token);
  const classes = useSelector((state) => state.classes.byId);
  const courses = useSelector((state) => state.courses.byId);
  const userClasses = useSelector((state) => state.user.classes.sort((a, b) => (a.course_id > b.course_id) - (a.course_id < b.course_id)));

  useEffect(() => {
    userClasses.map(({ course_id }) => dispatch(fetchCourse(authToken, courseId)));
    // dispatch(fetchClass(authToken, classId));
  }, [dispatch, authToken, classId, courseId, userClasses]);

  const [display, setDisplay] = useState([]); // 0: fold, 1: unfold
  const [titles, setTitles] = useState([]);
  const [itemLists, setItemLists] = useState([]);
  const [TAicons, setTAicons] = useState([]);

  useEffect(() => {
    // console.log(userClasses[0].course_id, userClasses[0].class_id, location.pathname === '/my-class');
    if (
      userClasses[0].course_id !== undefined
      && userClasses[0].class_id !== undefined
      && location.pathname === '/my-class'
    ) {
      // console.log('push', `/my-class/${userClasses[0].course_id}/${userClasses[0].class_id}/challenge`);
      history.push(`/my-class/${userClasses[0].course_id}/${userClasses[0].class_id}/challenge`);
    }
  }, [history, location.pathname, userClasses]);
  // console.log(courses[0]);
  useEffect(() => {
    if (
      mode === 'main'
      && userClasses[0].course_id !== undefined
      && userClasses[0].class_id !== undefined
      && courses[courseId] !== undefined
      && classes[classId] !== undefined
    ) {
      // console.log(userClasses);
      setDisplay(userClasses.map((item) => (item.class_id === Number(classId) ? 1 : 0)));
      setTitles(userClasses.map((item) => `${item.course_name} ${item.class_name}`));
      setTAicons(
        userClasses.map((item) => (item.role === 'MANAGER' ? <Icon.TA key={item.class_id} style={{ marginLeft: '100px' }} /> : '')),
      );
      setItemLists(
        userClasses.map((item) => {
          switch (item.role) {
            case 'MANAGER': {
              return [
                {
                  text: 'Challenge',
                  icon: <Icon.Challenge />,
                  path: `${baseURL}/${item.course_id}/${item.class_id}/challenge`,
                },
                {
                  text: 'Submission',
                  icon: <Icon.Submission />,
                  path: `${baseURL}/${item.course_id}/${item.class_id}/submission`,
                },
                {
                  text: 'Grade',
                  icon: <Icon.Grade />,
                  path: `${baseURL}/${item.course_id}/${item.class_id}/grade`,
                },
                {
                  text: 'Team',
                  icon: <Icon.Team />,
                  path: `${baseURL}/${item.course_id}/${item.class_id}/team`,
                },
                {
                  text: 'Member',
                  icon: <Icon.Member />,
                  path: `${baseURL}/${item.course_id}/${item.class_id}/member`,
                },
              ];
            }
            case 'NORMAL': {
              return [
                {
                  text: 'Challenge',
                  icon: <Icon.Challenge />,
                  path: `${baseURL}/${item.course_id}/${item.class_id}/challenge`,
                },
                {
                  text: 'Grade',
                  icon: <Icon.Grade />,
                  path: `${baseURL}/${item.course_id}/${item.class_id}/grade`,
                },
                {
                  text: 'Team',
                  icon: <Icon.Team />,
                  path: `${baseURL}/${item.course_id}/${item.class_id}/team`,
                },
                {
                  text: 'Member',
                  icon: <Icon.Member />,
                  path: `${baseURL}/${item.course_id}/${item.class_id}/member`,
                },
              ];
            }
            default: {
              return [
                {
                  text: 'Challenge',
                  icon: <Icon.Challenge />,
                  path: `${baseURL}/${item.course_id}/${item.class_id}/challenge`,
                },
              ];
            }
          }
        }),
      );
    }
  }, [location.pathname, mode, courses, classes, userClasses, courseId, classId]);

  const foldMyClass = (id) => {
    setDisplay(display.map((item, index) => (index === id ? 0 : item)));
  };

  const unfoldMyClass = (id) => {
    setDisplay(display.map((item, index) => (index === id ? 1 : item)));
  };

  if (
    (courseId !== undefined && courses[courseId] === undefined)
    || (classId !== undefined && classes[classId] === undefined)
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
        <div className={classNames.topSpace} />

        {userClasses.map((userClass, id) => (
          <div key={userClass.class_id}>
            <div className={classNames.title}>
              {display[id] === 1 ? (
                <Icon.TriangleDown className={classNames.titleIcon} onClick={() => foldMyClass(id)} />
              ) : (
                <Icon.TriangleRight className={classNames.titleIcon} onClick={() => unfoldMyClass(id)} />
              )}
              <Typography variant="h4" className={classNames.titleText}>
                {titles[id]}
                {TAicons[id]}
              </Typography>
            </div>
            <Divider variant="middle" className={classNames.divider} />
            {display[id] === 1 ? (
              <List>
                {itemLists[id].map((item) => (
                  <ListItem button key={item.text} onClick={() => history.push(item.path)} className={classNames.item}>
                    <ListItemIcon
                      className={classNames.itemIcon}
                      style={{ color: location.pathname === item.path ? '#1EA5FF' : '' }}
                    >
                      {item.icon}
                    </ListItemIcon>
                    <ListItemText
                      primary={item.text}
                      className={location.pathname === item.path ? classNames.activeItemText : classNames.itemText}
                    />
                  </ListItem>
                ))}
              </List>
            ) : (
              ''
            )}
          </div>
        ))}
        <div className={classNames.bottomSpace} />
      </Drawer>
    </div>
  );
}
