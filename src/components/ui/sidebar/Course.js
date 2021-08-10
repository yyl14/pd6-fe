import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import {
  Drawer, Typography, List, ListItem, ListItemIcon, ListItemText, Divider, Button,
} from '@material-ui/core';
import AddBoxIcon from '@material-ui/icons/AddBox';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import PeopleIcon from '@material-ui/icons/People';
import StarIcon from '@material-ui/icons/Star';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import SettingsIcon from '@material-ui/icons/Settings';

import { gridColumnLookupSelector } from '@material-ui/data-grid';
import { fetchCourses, fetchClasses } from '../../../actions/admin/course';

export default function Course({
  classes, history, location, mode,
}) {
  const { courseId, classId } = useParams();
  const courseList = useSelector((state) => state.admin.course.courses);
  const classList = useSelector((state) => state.admin.course.classes);
  const baseURL = '/admin/course';
  const [display, setDisplay] = useState('unfold');
  const [display1, setDisplay1] = useState('unfold');

  const [title1, setTitle1] = useState('');
  const [title2, setTitle2] = useState('');
  const [itemList, setItemList] = useState([]);
  const [arrow, setArrow] = useState(null);

  const dispatch = useDispatch();

  const authToken = useSelector((state) => state.auth.user.token);
  const loading = useSelector((state) => state.admin.course.loading);

  useEffect(() => {
    // console.log(mode, courseId, classId);
    const goBack = () => {
      history.push('/admin/course/course');
    };

    if (mode === 'class-list') {
      setTitle1('Lesson');
      setTitle2('Contest');
      setItemList(
        courseList.allIds
          .map((id) => courseList.byId[id])
          .map(({ id, type, name }) => {
            switch (type) {
              case 'LESSON':
                return {
                  type,
                  text: name,
                  icon: (
                    <PeopleIcon
                      className={
                        location.pathname === `${baseURL}/course/${id}/class-list` ? classes.activeIcon : classes.icon
                      }
                    />
                  ),
                  path: `${baseURL}/course/${id}/class-list`,
                };
              case 'CONTEST':
                return {
                  type,
                  text: name,
                  icon: (
                    <StarIcon
                      className={
                        location.pathname === `${baseURL}/course/${id}/class-list` ? classes.activeIcon : classes.icon
                      }
                    />
                  ),
                  path: `${baseURL}/course/${id}/class-list`,
                };
              default:
                return {
                  type,
                  text: name,
                  icon: (
                    <PeopleIcon
                      className={
                        location.pathname === `${baseURL}/course/${id}/class-list` ? classes.activeIcon : classes.icon
                      }
                    />
                  ),
                  path: `${baseURL}/course/${id}/class-list`,
                };
            }
          })
          .concat([
            {
              type: 'LESSON',
              text: 'Lesson',
              icon: (
                <AddBoxIcon
                  className={
                    location.pathname.substr(location.pathname.length - 6) === 'lesson'
                      ? classes.activeIcon
                      : classes.icon
                  }
                />
              ),
              path: `${baseURL}/course/${courseId}/class-list/lesson`,
            },
            {
              type: 'CONTEST',
              text: 'Contest',
              icon: (
                <AddBoxIcon
                  className={
                    location.pathname.substr(location.pathname.length - 7) === 'contest'
                      ? classes.activeIcon
                      : classes.icon
                  }
                />
              ),
              path: `${baseURL}/course/${courseId}/class-list/contest`,
            },
          ]),
      );
    } else if (mode === 'course-setting' && courseList.byId[courseId]) {
      setArrow(<ArrowBackIcon className={classes.arrow} onClick={goBack} />);
      setTitle1(courseList.byId[courseId].name);
      setItemList([
        {
          text: 'Setting',
          path: `${baseURL}/course/${courseId}/setting`,
          icon: (
            <SettingsIcon
              className={
                location.pathname === `${baseURL}/course/${courseId}/setting` ? classes.activeIcon : classes.icon
              }
            />
          ),
        },
      ]);
    } else if (mode === 'class' && courseList.byId[courseId] && classList.byId[classId]) {
      setArrow(<ArrowBackIcon className={classes.arrow} onClick={goBack} />);
      setTitle1(`${courseList.byId[courseId].name} / ${classList.byId[classId].name}`);
      setItemList([
        {
          text: 'Member',
          path: `${baseURL}/class/${courseId}/${classId}/member`,
          icon: (
            <PeopleIcon
              className={
                location.pathname === `${baseURL}/class/${courseId}/${classId}/member`
                  ? classes.activeIcon
                  : classes.icon
              }
            />
          ),
        },
        {
          text: 'Setting',
          path: `${baseURL}/class/${courseId}/${classId}/setting`,
          icon: (
            <SettingsIcon
              className={
                location.pathname === `${baseURL}/class/${courseId}/${classId}/setting`
                  ? classes.activeIcon
                  : classes.icon
              }
            />
          ),
        },
      ]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname, history, courseList, courseId, classList, classId, mode]);

  const foldLesson = () => {
    setDisplay('fold');
  };

  const unfoldLesson = () => {
    setDisplay('unfold');
  };

  const foldContest = () => {
    setDisplay1('fold');
  };

  const unfoldContest = () => {
    setDisplay1('unfold');
  };

  useEffect(() => {
    dispatch(fetchCourses(authToken));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (courseList.allIds.length !== 0) {
      if (location.pathname === '/admin/course/course') {
        history.push(`/admin/course/course/${courseList.byId[courseList.allIds[0]].id}/class-list`);
      }
    }
  }, [classId, classList, courseId, courseList, history, location]);

  // console.log(courseList.byId[courseId]);
  if (courseList.byId[courseId] === undefined || (classId && classList.byId[classId] === undefined)) {
    // console.log(classList.byId[classId]);
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
        {mode === 'class-list' ? <div className={classes.topSpace} /> : arrow}

        <div>
          {display === 'unfold' ? (
            <PlayArrowIcon className={`${classes.titleIcon} ${classes.rotate90}`} onClick={foldLesson} />
          ) : (
            <PlayArrowIcon className={classes.titleIcon} onClick={unfoldLesson} />
          )}

          <Typography variant="h4" className={classes.title}>
            {title1}
          </Typography>
        </div>
        <Divider variant="middle" className={classes.divider} />
        {display === 'unfold' && (
          <List>
            {itemList.map(
              (item) => (item.type === 'LESSON' || mode !== 'class-list') && (
              <ListItem button key={item.text} onClick={() => history.push(item.path)} className={item.text !== 'Lesson' ? classes.item : classes.addItem}>
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText
                  primary={item.text}
                  className={location.pathname === item.path ? classes.active : null}
                />
              </ListItem>
              ),
            )}
          </List>
        )}

        {mode === 'class-list' && (
          <>
            <div>
              {display1 === 'unfold' ? (
                <PlayArrowIcon className={`${classes.secondTitleIcon} ${classes.rotate90}`} onClick={foldContest} />
              ) : (
                <PlayArrowIcon className={classes.secondTitleIcon} onClick={unfoldContest} />
              )}
              <Typography variant="h4" className={classes.secondTitle}>
                {title2}
              </Typography>
            </div>
            <Divider variant="middle" className={classes.divider} />
            {display1 === 'unfold' && (
              <List>
                {itemList.map(
                  (item) => item.type === 'CONTEST' && (
                  <ListItem button key={item.text} onClick={() => history.push(item.path)} className={item.text !== 'Contest' ? classes.item : classes.addItem}>
                    <ListItemIcon>{item.icon}</ListItemIcon>
                    <ListItemText
                      primary={item.text}
                      className={location.pathname === item.path ? classes.active : null}
                    />
                  </ListItem>
                  ),
                )}
              </List>
            )}
          </>
        )}
        <div className={classes.bottomSpace} />
      </Drawer>
    </div>
  );
}
