import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import {
  Drawer, Typography, List, ListItem, ListItemIcon, ListItemText, Divider, IconButton,
} from '@material-ui/core';
import Icon from '../icon/index';

import { fetchChallenges, addChallenge } from '../../../actions/myClass/challenge';
import { fetchClass, fetchCourse } from '../../../actions/common/common';

export default function Team({
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

  const [display, setDisplay] = useState('unfold');

  const [title, setTitle] = useState('');
  const [itemList, setItemList] = useState([]);
  const [arrow, setArrow] = useState(null);
  const [TAicon, setTAicon] = useState(null);

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

    if (mode === 'main' && courses[courseId] !== undefined && classes[classId] !== undefined) {
      setTitle(`${courses[courseId].name} ${classes[classId].name}`);
      setTAicon(<Icon.TA style={{ marginLeft: '100px' }} />);
      setItemList([
        {
          text: 'Challenge',
          icon: (
            <Icon.Challenge
              className={
                location.pathname === `${baseURL}/${courseId}/${classId}/challenge` ? classNames.svg : classNames.icon
              }
            />
          ),
          path: `${baseURL}/${courseId}/${classId}/challenge`,
        },
        {
          text: 'Submission',
          icon: (
            <Icon.Submission
              className={
                location.pathname === `${baseURL}/${courseId}/${classId}/submission` ? classNames.svg : classNames.icon
              }
            />
          ),
          path: `${baseURL}/${courseId}/${classId}/submission`,
        },
        {
          text: 'Grade',
          icon:
            location.pathname === `${baseURL}/${courseId}/${classId}/grade` ? (
              <Icon.GradeActive className={classNames.icon} />
            ) : (
              <Icon.Grade className={classNames.icon} />
            ),
          path: `${baseURL}/${courseId}/${classId}/grade`,
        },
        {
          text: 'Team',
          icon: (
            <Icon.Team
              className={
                location.pathname === `${baseURL}/${courseId}/${classId}/team` ? classNames.svg : classNames.icon
              }
            />
          ),
          path: `${baseURL}/${courseId}/${classId}/team`,
        },
        {
          text: 'Member',
          icon: (
            <Icon.Member
              className={
                location.pathname === `${baseURL}/${courseId}/${classId}/member` ? classNames.svg : classNames.icon
              }
            />
          ),
          path: `${baseURL}/${courseId}/${classId}/member`,
        },
      ]);
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
  ]);

  const foldAccount = () => {
    setDisplay('fold');
  };

  const unfoldAccount = () => {
    setDisplay('unfold');
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
                <ListItemText
                  primary={item.text}
                  className={location.pathname === item.path ? classNames.active : null}
                />
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
