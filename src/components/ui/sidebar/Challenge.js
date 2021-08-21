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
  const {
    courseId, classId, challengeId, problemId,
  } = useParams();
  const baseURL = '/my-class';
  const dispatch = useDispatch();
  const authToken = useSelector((state) => state.auth.token);
  const loading = useSelector((state) => state.loading.myClass.challenge);
  const challenges = useSelector((state) => state.challenges.byId);
  const challengesID = useSelector((state) => state.challenges.allIds);
  const classes = useSelector((state) => state.classes.byId);
  const courses = useSelector((state) => state.courses.byId);
  const userClasses = useSelector((state) => state.user.classes);

  useEffect(() => {
    dispatch(fetchCourse(authToken, courseId));
    dispatch(fetchClass(authToken, classId));
    dispatch(fetchChallenges(authToken, classId));
  }, [dispatch, authToken, classId, courseId]);

  const [display, setDisplay] = useState('unfold');

  const [title, setTitle] = useState('');
  const [itemList, setItemList] = useState([]);
  const [arrow, setArrow] = useState(null);

  useEffect(() => {
    console.log(challenges);
    const goBackToChallenge = () => {
      history.push(`${baseURL}/${courseId}/${classId}/challenge`);
    };

    if (mode === 'challenge' && challenges[challengeId] !== undefined) {
      // console.log(challenges[challengeId]);
      setArrow(
        <IconButton className={classNames.arrow} onClick={goBackToChallenge}>
          <Icon.ArrowBackRoundedIcon />
        </IconButton>,
      );
      setTitle(challenges[challengeId].title);
      setItemList([
        {
          text: 'Info',
          icon: <Icon.Warning />,
          path: `${baseURL}/${courseId}/${classId}/challenge/${challengeId}`,
        },
      ]);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    challengeId,
    challenges,
    classId,
    courseId,
    history,
    location.pathname,
    mode,
  ]);

  const foldChallenge = () => {
    setDisplay('fold');
  };

  const unfoldChallenge = () => {
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
        {arrow}
        <div className={classNames.title}>
          {display === 'unfold' ? (
            <Icon.TriangleDown className={classNames.titleIcon} onClick={foldChallenge} />
          ) : (
            <Icon.TriangleRight className={classNames.titleIcon} onClick={unfoldChallenge} />
          )}
          <Typography variant="h4" className={classNames.titleText}>
            {title}
          </Typography>
        </div>
        <Divider variant="middle" className={classNames.divider} />
        {display === 'unfold' ? (
          <List>
            {itemList.map((item) => (
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
        <div className={classNames.bottomSpace} />
      </Drawer>
    </div>
  );
}
