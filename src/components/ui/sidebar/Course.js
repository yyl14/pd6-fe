import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import {
  Drawer, Typography, List, ListItem, ListItemIcon, ListItemText, Divider, Button,
} from '@material-ui/core';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import SettingsIcon from '@material-ui/icons/Settings';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import PeopleIcon from '@material-ui/icons/People';

export default function Course({
  menuItems, classes, history, location,
}) {
  const courseList = useSelector((state) => state.admin.course.courses);
  const classList = useSelector((state) => state.admin.course.classes);
  const baseURL = '/admin/course/course';
  const [mode1, setMode1] = useState('main');
  const [course, setCourse] = useState(courseList.byId[courseList.allIds[0]].name);
  const [courseID, setCourseID] = useState(courseList.byId[courseList.allIds[0]].id);
  const [semester, setSemester] = useState(classList.byId[classList.allIds[0]].name);
  const [semesterID, setSemesterID] = useState(classList.byId[classList.allIds[0]].id);
  const [display, setDisplay] = useState('unfold');
  const [display1, setDisplay1] = useState('unfold');

  const goBack = () => {
    history.goBack();
  };

  let title1 = null;
  let title2 = null;
  let itemList = [];
  let arrow = null;
  if (mode1 === 'main') {
    title1 = 'Lesson';
    title2 = 'Contest';
    itemList = new Array(Object.keys(courseList.byId).length);
    for (let i = 0; i < Object.keys(courseList.byId).length; i += 1) {
      const item = courseList.byId[Object.keys(courseList.byId)[i]];
      itemList[i] = {
        type: item.type,
        text: item.name,
        icon: <PeopleIcon className={location.pathname === `${baseURL}/${item.id}/class-list` ? classes.activeIcon : classes.icon} />,
        path: `${baseURL}/${item.id}/class-list`,
      };
    }
  } else if (mode1 === 'setting') {
    arrow = <ArrowBackIcon className={classes.arrow} onClick={goBack} />;
    title1 = course;
    itemList = [
      {
        text: 'Course Setting',
        path: `${baseURL}/${courseID}/setting`,
        icon: (
          <SettingsIcon className={location.pathname === `${baseURL}/${courseID}/setting` ? classes.activeIcon : classes.icon} />
        ),
      },
    ];
  } else if (mode1 === 'class') {
    arrow = <ArrowBackIcon className={classes.arrow} onClick={goBack} />;
    title1 = `${course} / ${semester}`;
    itemList = [
      {
        text: 'Members',
        path: `${baseURL}/${courseID}/${semesterID}/member`,
        icon: <PeopleIcon className={location.pathname === `${baseURL}/${courseID}/${semesterID}/member` ? classes.activeIcon : classes.icon} />,
      },
      {
        text: 'Class Setting',
        path: `${baseURL}/${courseID}/${semesterID}/setting`,
        icon: <SettingsIcon className={location.pathname === `${baseURL}/${courseID}/${semesterID}/setting` ? classes.activeIcon : classes.icon} />,
      },
    ];
  }

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
    // /admin/course/course/
    if (location.pathname === '/admin/course/course/') {
      history.push(
        `/admin/course/course/${courseList.byId[courseList.allIds[0]].id}/class-list`,
      );
    }
    // console.log('Current route', location.pathname);
    console.log(courseList, classList);
    const split = location.pathname.split('/');
    const slashNum = split.length - 1;
    console.log(split, slashNum);
    if (split[5] === 'class-list') {
      // /admin/course/course/:courseId/class-list
      setCourseID(split[4]);
      setCourse(courseList.byId[split[4]].name);
      setMode1('main');
    } else if (split[5] === 'setting') {
      // /admin/course/course/:courseId/setting
      setCourseID(split[4]);
      setCourse(courseList.byId[split[4]].name);
      setMode1('setting');
    } else if (split[6] === 'member' || split[6] === 'setting') {
      setCourseID(split[4]);
      setCourse(courseList.byId[split[4]].name);
      setSemesterID(split[5]);
      setSemester(classList.byId[split[5]].name);
      setMode1('class');
    }
  }, [classList, courseList, history, location]);

  return (
    <div>
      <Drawer
        className={classes.drawer}
        variant="permanent"
        anchor="left"
        PaperProps={{ elevation: 5 }}
        classes={{ paper: classes.drawerPaper }}
      >
        {mode1 === 'main' ? (
          <Button color="primary" className={classes.button}>
            New
          </Button>
        ) : (
          arrow
        )}

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
        {display === 'unfold' ? (
          <List>
            {itemList.map((item) => (
              item.type === 'LESSON' || mode1 !== 'main'
                ? (
                  <ListItem
                    button
                    key={item.text}
                    onClick={() => history.push(item.path)}
                    className={location.pathname === item.path ? classes.active : null}
                  >
                    <ListItemIcon>{item.icon}</ListItemIcon>
                    <ListItemText primary={item.text} />
                  </ListItem>
                ) : ''
            ))}
          </List>
        ) : ''}

        {mode1 === 'main' ? (
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
            {display1 === 'unfold' ? (
              <List>
                {itemList.map((item) => (
                  item.type === 'Contest'
                    ? (
                      <ListItem
                        button
                        key={item.text}
                        onClick={() => history.push(item.path)}
                        className={location.pathname === item.path ? classes.active : null}
                      >
                        <ListItemIcon>{item.icon}</ListItemIcon>
                        <ListItemText primary={item.text} />
                      </ListItem>
                    ) : ''
                ))}
              </List>
            ) : ''}
          </>
        ) : (
          ''
        )}
      </Drawer>
    </div>
  );
}
