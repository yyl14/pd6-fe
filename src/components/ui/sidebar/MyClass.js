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
    dispatch(fetchCourse(authToken, courseId));
    dispatch(fetchClass(authToken, classId));
  }, [dispatch, authToken, classId, courseId]);

  const [display, setDisplay] = useState([]); // 0: fold, 1: unfold
  const [titles, setTitles] = useState([]);
  const [itemLists, setItemLists] = useState([]);
  const [TAicons, setTAicons] = useState([]);

  useEffect(() => {
    if (
      userClasses[0].course_id !== undefined
      && userClasses[0].class_id !== undefined
      && courseId === undefined
      && classId === undefined
    ) {
      history.push(`/my-class/${userClasses[0].course_id}/${userClasses[0].class_id}/challenge`);
    }
  }, [classId, courseId, history, userClasses]);

  useEffect(() => {
    if (
      mode === 'main'
      && userClasses[0].course_id !== undefined
      && userClasses[0].class_id !== undefined
      && courses[courseId] !== undefined
      && classes[classId] !== undefined
    ) {
      setDisplay([]);
      userClasses.map((userClass, id) => {
        if (userClass.class_id === Number(classId)) {
          // current class
          setDisplay((prevDisplay) => [...prevDisplay, 1]); // unfold
        } else {
          setDisplay((prevDisplay) => [...prevDisplay, 0]); // fold
        }

        setTitles((prevTitles) => [...prevTitles, `${userClass.course_name} ${userClass.class_name}`]);
        if (userClass.role === 'MANAGER') {
          setTAicons((prevTAicons) => [
            ...prevTAicons,
            <Icon.TA key={userClass.class_id} style={{ marginLeft: '100px' }} />,
          ]);
          setItemLists((prevItemLists) => [
            ...prevItemLists,
            [
              {
                text: 'Challenge',
                icon: <Icon.Challenge />,
                path: `${baseURL}/${userClass.course_id}/${userClass.class_id}/challenge`,
              },
              {
                text: 'Submission',
                icon: <Icon.Submission />,
                path: `${baseURL}/${userClass.course_id}/${userClass.class_id}/submission`,
              },
              {
                text: 'Grade',
                icon: <Icon.Grade />,
                path: `${baseURL}/${userClass.course_id}/${userClass.class_id}/grade`,
              },
              {
                text: 'Team',
                icon: <Icon.Team />,
                path: `${baseURL}/${userClass.course_id}/${userClass.class_id}/team`,
              },
              {
                text: 'Member',
                icon: <Icon.Member />,
                path: `${baseURL}/${userClass.course_id}/${userClass.class_id}/member`,
              },
            ],
          ]);
        } else if (userClass.role === 'NORMAL') {
          setTAicons((prevTAicons) => [...prevTAicons, '']);
          setItemLists((prevItemLists) => [
            ...prevItemLists,
            [
              {
                text: 'Challenge',
                icon: <Icon.Challenge />,
                path: `${baseURL}/${userClass.course_id}/${userClass.class_id}/challenge`,
              },
              {
                text: 'Grade',
                icon: <Icon.Grade />,
                path: `${baseURL}/${userClass.course_id}/${userClass.class_id}/grade`,
              },
              {
                text: 'Team',
                icon: <Icon.Team />,
                path: `${baseURL}/${userClass.course_id}/${userClass.class_id}/team`,
              },
              {
                text: 'Member',
                icon: <Icon.Member />,
                path: `${baseURL}/${userClass.course_id}/${userClass.class_id}/member`,
              },
            ],
          ]);
        } else if (userClass.role === 'GUEST') {
          setTAicons((prevTAicons) => [...prevTAicons, '']);
          setItemLists((prevItemLists) => [
            ...prevItemLists,
            [
              {
                text: 'Challenge',
                icon: <Icon.Challenge />,
                path: `${baseURL}/${userClass.course_id}/${userClass.class_id}/challenge`,
              },
            ],
          ]);
        } else {
          console.log('Why are you here');
        }
        return userClass;
      });
    }
  }, [location.pathname, history, mode, courses, classes, userClasses, courseId, classId]);

  const foldMyClass = (id) => {
    // console.log(id);
    const updatedDisplay = [...display];
    updatedDisplay[id] = 0;
    setDisplay(updatedDisplay);
  };

  const unfoldMyClass = (id) => {
    // console.log(id);
    const updatedDisplay = [...display];
    updatedDisplay[id] = 1;
    setDisplay(updatedDisplay);
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
                <Icon.TriangleDown
                  className={classNames.titleIcon}
                  onClick={() => foldMyClass(id)}
                />
              ) : (
                <Icon.TriangleRight
                  className={classNames.titleIcon}
                  onClick={() => unfoldMyClass(id)}
                />
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
                  <ListItem
                    button
                    key={item.text}
                    onClick={() => history.push(item.path)}
                    className={classNames.item}
                  >
                    <ListItemIcon className={classNames.itemIcon} style={{ color: location.pathname === item.path ? '#1EA5FF' : '' }}>
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
