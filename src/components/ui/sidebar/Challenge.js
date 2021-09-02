import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import {
  Drawer, Typography, List, ListItem, ListItemIcon, ListItemText, Divider, IconButton,
} from '@material-ui/core';
import Icon from '../icon/index';
import TaskAddingCard from '../../normal/myClass/Challenge/TaskAddingCard';

import { fetchChallenges } from '../../../actions/myClass/challenge';
import { fetchClass, fetchCourse } from '../../../actions/common/common';

export default function Challenge({
  classNames, history, location, mode,
}) {
  const {
    courseId, classId, challengeId, problemId, submissionId,
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

  const problems = useSelector((state) => state.problem);
  const essays = useSelector((state) => state.essays);

  useEffect(() => {
    dispatch(fetchCourse(authToken, courseId));
    dispatch(fetchClass(authToken, classId));
    dispatch(fetchChallenges(authToken, classId));
  }, [dispatch, authToken, classId, courseId]);

  const [display, setDisplay] = useState('unfold');

  const [title, setTitle] = useState('');
  const [itemList, setItemList] = useState([]);
  const [arrow, setArrow] = useState(null);
  const [TAicon, setTAicon] = useState();

  const [addTaskPopUp, setAddTaskPopUp] = useState(false);

  useEffect(() => {
    const goBackToChallenge = () => {
      history.push(`${baseURL}/${courseId}/${classId}/challenge`);
    };
    const goBackToProblem = () => {
      history.push(`${baseURL}/${courseId}/${classId}/challenge/${challengeId}/${problemId}`);
    };
    const goBackToSubmission = () => {
      history.push(`${baseURL}/${courseId}/${classId}/challenge/${challengeId}/${problemId}/my-submission`);
    };
    if (mode === 'challenge' && userClasses.length !== 0 && userClasses.find((x) => x.class_id === Number(classId))) {
      // console.log(userClasses);
      if (
        userClasses.find((x) => x.class_id === Number(classId)).role === 'MANAGER'
        && challenges[challengeId] !== undefined
      ) {
        // console.log(problems, essays, userClasses);
        setTAicon(<Icon.TA className={classNames.titleRightIcon} />);
        setArrow(
          <IconButton className={classNames.arrow} onClick={goBackToChallenge}>
            <Icon.ArrowBackRoundedIcon />
          </IconButton>,
        );
        setTitle(challenges[challengeId].title);

        setItemList(
          [].concat(
            [
              {
                text: 'Setting',
                icon: <Icon.Setting />,
                path: `${baseURL}/${courseId}/${classId}/challenge/${challengeId}/setting`,
              },
              {
                text: 'Statistics',
                icon: <Icon.Statistic />,
                path: `${baseURL}/${courseId}/${classId}/challenge/${challengeId}/statistics`,
              },
              {
                text: 'Info',
                icon: <Icon.Info />,
                path: `${baseURL}/${courseId}/${classId}/challenge/${challengeId}`,
              },
            ],
            challenges[challengeId].problemIds
              .map((id) => problems.byId[id])
              .map(({ id, challenge_label }) => ({
                text: challenge_label,
                icon: <Icon.Code />,
                path: `${baseURL}/${courseId}/${classId}/challenge/${challengeId}/${id}`,
              })),
            challenges[challengeId].essayIds
              .map((id) => essays.byId[id])
              .map(({ id, challenge_label }) => ({
                text: challenge_label,
                icon: <Icon.Paper />,
                path: `${baseURL}/${courseId}/${classId}/challenge/${challengeId}/essay/${id}`,
              })),
          ),
        );
      } else if (
        userClasses.find((x) => x.class_id === Number(classId)).role !== 'MANAGER'
        && challenges[challengeId] !== undefined
      ) {
        setArrow(
          <IconButton className={classNames.arrow} onClick={goBackToChallenge}>
            <Icon.ArrowBackRoundedIcon />
          </IconButton>,
        );
        setTitle(challenges[challengeId].title);
        if (Object.keys(problems).length !== 0 && Object.keys(essays).length !== 0) {
          setItemList(
            [].concat(
              [
                {
                  text: 'Info',
                  icon: <Icon.Info />,
                  path: `${baseURL}/${courseId}/${classId}/challenge/${challengeId}`,
                },
              ],
              challenges[challengeId].problemIds
                .map((id) => problems.byId[id])
                .map(({ id, challenge_label }) => ({
                  text: challenge_label,
                  icon: <Icon.Code />,
                  path: `${baseURL}/${courseId}/${classId}/challenge/${challengeId}/${id}`,
                })),
              challenges[challengeId].essayIds
                .map((id) => essays.byId[id])
                .map(({ id, challenge_label }) => ({
                  text: challenge_label,
                  icon: <Icon.Paper />,
                  path: `${baseURL}/${courseId}/${classId}/challenge/${challengeId}/essay/${id}`,
                })),
            ),
          );
        } else {
          setItemList([
            {
              text: 'Info',
              icon: <Icon.Info />,
              path: `${baseURL}/${courseId}/${classId}/challenge/${challengeId}`,
            },
          ]);
        }
      }
    } else if (
      mode === 'submission'
      && userClasses.length !== 0
      && userClasses.find((x) => x.class_id === Number(classId))
      && challenges[challengeId] !== undefined
      && problems.byId[problemId] !== undefined
    ) {
      if (userClasses.find((x) => x.class_id === Number(classId)).role === 'MANAGER') {
        setTAicon(<Icon.TA className={classNames.titleRightIcon} />);
      }
      setArrow(
        <IconButton className={classNames.arrow} onClick={goBackToProblem}>
          <Icon.ArrowBackRoundedIcon />
        </IconButton>,
      );
      setTitle(`${challenges[challengeId].title} / ${problems.byId[problemId].challenge_label}`);
      setItemList([
        {
          text: 'Code Submission',
          icon: <Icon.Code />,
          path: `${baseURL}/${courseId}/${classId}/challenge/${challengeId}/${problemId}/code-submission`,
        },
        {
          text: 'My Submission',
          icon: <Icon.Statistic />,
          path: `${baseURL}/${courseId}/${classId}/challenge/${challengeId}/${problemId}/my-submission`,
        },
      ]);
    } else if (
      mode === 'submission_detail'
      && userClasses.length !== 0
      && userClasses.find((x) => x.class_id === Number(classId))
    ) {
      if (userClasses.find((x) => x.class_id === Number(classId)).role === 'MANAGER') {
        setTAicon(<Icon.TA className={classNames.titleRightIcon} />);
      }
      setArrow(
        <IconButton className={classNames.arrow} onClick={goBackToSubmission}>
          <Icon.ArrowBackRoundedIcon />
        </IconButton>,
      );
      setTitle(submissionId);
      setItemList([
        {
          text: 'Submission Detail',
          icon: <Icon.Code />,
          path: `${baseURL}/${courseId}/${classId}/challenge/${challengeId}/${problemId}/my-submission/${submissionId}`,
        },
      ]);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [challengeId, challenges, classId, courseId, problems, essays, history, location.pathname, mode]);

  const addTaskItemColor = (popup) => {
    if (popup) {
      return classNames.addIconItemClicked;
    }
    return classNames.addIconItem;
  };

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
        <div>
          <div className={classNames.title}>
            {display === 'unfold' ? (
              <Icon.TriangleDown className={classNames.titleIcon} onClick={foldChallenge} />
            ) : (
              <Icon.TriangleRight className={classNames.titleIcon} onClick={unfoldChallenge} />
            )}
            <Typography variant="h4" className={classNames.titleText}>
              {title}
            </Typography>
            {TAicon}
          </div>
          <Divider variant="middle" className={classNames.divider} />
          {display === 'unfold' && (
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
              {mode === 'challenge'
                && userClasses.length !== 0
                && userClasses.find((x) => x.class_id === Number(classId)).role === 'MANAGER'
                && challenges[challengeId] !== undefined && (
                  <ListItem button key="Task" onClick={() => setAddTaskPopUp(true)} className={classNames.item}>
                    <ListItemIcon className={`${classNames.itemIcon} ${addTaskItemColor(addTaskPopUp)}`}>
                      <Icon.AddBox />
                    </ListItemIcon>
                    <ListItemText
                      primary="Task"
                      className={`${classNames.itemText} ${addTaskItemColor(addTaskPopUp)}`}
                    />
                  </ListItem>
              )}
            </List>
          )}
        </div>
        <div className={classNames.bottomSpace} />
      </Drawer>

      <TaskAddingCard open={addTaskPopUp} setOpen={setAddTaskPopUp} />
    </div>
  );
}
