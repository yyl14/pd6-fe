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
  const loading = useSelector((state) => state.loading.myClass.challenge);
  const classes = useSelector((state) => state.classes.byId);
  const courses = useSelector((state) => state.courses.byId);
  const userClasses = useSelector((state) => state.user.classes);

  useEffect(() => {
    dispatch(fetchCourse(authToken, courseId));
    dispatch(fetchClass(authToken, classId));
  }, [dispatch, authToken, classId, courseId]);

  // const [display, setDisplay] = useState('unfold');

  const [display, setDisplay] = useState([]);
  const [titles, setTitles] = useState([]);
  const [itemLists, setItemLists] = useState([]);
  const [arrow, setArrow] = useState(null);
  const [TAicons, setTAicons] = useState([]);

  useEffect(() => {
    console.log(userClasses);
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
    const goBackToChallenge = () => {
      history.push(`${baseURL}/${courseId}/${classId}/challenge`);
    };

    if (
      mode === 'main'
      && userClasses[0].course_id !== undefined
      && userClasses[0].class_id !== undefined
      && courses[courseId] !== undefined
      && classes[classId] !== undefined
    ) {
      userClasses.map((userClass, id) => {
        if (userClass.class_id === Number(classId)) {
          display.push(1);
        } else {
          display.push(0);
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
                icon: 'Grade',
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
                icon: 'Grade',
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
  }, [
    location.pathname,
    history,
    mode,
    courses,
    classes,
    userClasses,
    courseId,
    classId,
    classNames.activeIcon,
    classNames.icon,
    classNames.arrow,
    classNames.svg,
    display,
  ]);

  const foldAccount = (id) => {
    console.log(id);
    const updatedDisplay = [...display];
    updatedDisplay[id] = 0;
    setDisplay(updatedDisplay);
  };

  const unfoldAccount = (id) => {
    console.log(id);
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
        {mode === 'main' ? <div className={classNames.topSpace} /> : arrow}

        {userClasses.map((userClass, id) => (
          <div key={userClass.class_id}>
            <div>
              {display[id] === 1 ? (
                <Icon.TriangleDown
                  className={id === 0 ? classNames.titleIcon : classNames.secondTitleIcon}
                  onClick={() => foldAccount(id)}
                />
              ) : (
                <Icon.TriangleRight
                  className={id === 0 ? classNames.titleIcon : classNames.secondTitleIcon}
                  onClick={() => unfoldAccount(id)}
                />
              )}
              <Typography variant="h4" className={id === 0 ? classNames.title : classNames.secondTitle}>
                {titles[id]}
                {TAicons[id]}
              </Typography>
            </div>
            <Divider variant="middle" className={classNames.divider} />
            {display[id] === 1 ? (
              <List>
                {itemLists[id].map((item) => {
                  if (item.icon !== 'Grade') {
                    return (
                      <ListItem
                        button
                        key={item.text}
                        onClick={() => history.push(item.path)}
                        className={classNames.item}
                      >
                        <ListItemIcon className={location.pathname === item.path ? classNames.svg : classNames.icon}>
                          {item.icon}
                        </ListItemIcon>
                        <ListItemText
                          primary={item.text}
                          className={location.pathname === item.path ? classNames.active : null}
                        />
                      </ListItem>
                    );
                  }
                  return (
                    <ListItem
                      button
                      key={item.text}
                      onClick={() => history.push(item.path)}
                      className={classNames.item}
                    >
                      <ListItemIcon>
                        {location.pathname === `${baseURL}/${userClass.course_id}/${userClass.class_id}/grade` ? (
                          <Icon.GradeActive className={classNames.icon} />
                        ) : (
                          <Icon.Grade className={classNames.icon} />
                        )}
                      </ListItemIcon>
                      <ListItemText
                        primary={item.text}
                        className={location.pathname === item.path ? classNames.active : null}
                      />
                    </ListItem>
                  );
                })}
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
