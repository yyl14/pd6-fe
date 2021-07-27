import React, { useState, useEffect } from 'react';
import {
  Drawer, Typography, List, ListItem, ListItemIcon, ListItemText, Divider, Button,
} from '@material-ui/core';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import SettingsIcon from '@material-ui/icons/Settings';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import PeopleIcon from '@material-ui/icons/People';
import { useHistory, useLocation } from 'react-router-dom';

export default function Course({
  menuItems, classes, history, location,
}) {
  const baseURL = '/admin/course';
  const [mode1, setMode1] = useState('main');
  const [course, setCourse] = useState('');
  // const [mode2, setMode2] = useState('');
  const [display, setDisplay] = useState('unfold');
  const [display1, setDisplay1] = useState('unfold');

  const goBack = () => {
    history.goBack();
  };

  let title1 = null;
  let title2 = null;
  let itemList = [];
  let secondItemList = [];
  let arrow = null;
  if (mode1 === 'main') {
    title1 = 'Lesson';
    title2 = 'Contest';
    itemList = [
      {
        text: 'PBC',
        icon: <PeopleIcon className={location.pathname === `${baseURL}/PBC` ? classes.activeIcon : classes.icon} />,
        path: `${baseURL}/PBC`,
      },
      {
        text: 'DSAP',
        icon: <PeopleIcon className={location.pathname === `${baseURL}/DSAP` ? classes.activeIcon : classes.icon} />,
        path: `${baseURL}/DSAP`,
      },
      {
        text: 'PD',
        icon: <PeopleIcon className={location.pathname === `${baseURL}/PD` ? classes.activeIcon : classes.icon} />,
        path: `${baseURL}/PD`,
      },
      {
        text: 'OR',
        icon: <PeopleIcon className={location.pathname === `${baseURL}/OR` ? classes.activeIcon : classes.icon} />,
        path: `${baseURL}/OR`,
      },
    ];
    secondItemList = [
      {
        text: 'PDAO',
        path: `${baseURL}/PDAO`,
        icon: <PeopleIcon className={location.pathname === `${baseURL}/PDAO` ? classes.activeIcon : classes.icon} />,
      },
    ];
  } else if (mode1 === 'setting') {
    arrow = <ArrowBackIcon className={classes.arrow} onClick={goBack} />;
    title1 = course;
    itemList = [
      {
        text: 'Course Setting',
        path: `${baseURL}/${course}`,
        icon: (
          <SettingsIcon className={location.pathname === `${baseURL}/${course}` ? classes.activeIcon : classes.icon} />
        ),
      },
    ];
  } else if (mode1 === 'class') {
    arrow = <ArrowBackIcon className={classes.arrow} onClick={goBack} />;
    title1 = course;
    itemList = [
      {
        text: 'Members',
        path: `${baseURL}/${course}/member`,
        icon: <PeopleIcon className={location.pathname.includes('ember') ? classes.activeIcon : classes.icon} />,
      },
      {
        text: 'Class Setting',
        path: `${baseURL}/${course}/setting`,
        icon: <SettingsIcon className={location.pathname.includes('etting') ? classes.activeIcon : classes.icon} />,
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
    // console.log('Current route', location.pathname);
    const slashNum = (location.pathname.match(new RegExp('/', 'g')) || []).length;
    if (slashNum === 2 || location.pathname.includes('overview')) {
      setMode1('main');
    } else if (slashNum === 3) {
      setMode1('setting');
      const courseName = location.pathname.substring(location.pathname.lastIndexOf('/') + 1, location.pathname.length);
      setCourse(courseName);
    } else if (slashNum === 4 || slashNum === 5 || slashNum === 6) {
      setMode1('class');
      const split = location.pathname.split('/');
      setCourse(`${split[3]}/${split[4]}`);
    }
  }, [location]);

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

          <Typography variant="h2" className={classes.title}>
            {title1}
          </Typography>
        </div>
        <Divider variant="middle" className={classes.divider} />
        {display === 'unfold' ? (
          <List>
            {itemList.map((item) => (
              <ListItem
                button
                key={item.text}
                onClick={() => history.push(item.path)}
                className={location.pathname === item.path ? classes.active : null}
              >
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItem>
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
              <Typography variant="h2" className={classes.secondTitle}>
                {title2}
              </Typography>
            </div>
            <Divider variant="middle" className={classes.divider} />
            {display1 === 'unfold' ? (
              <List>
                {secondItemList.map((item) => (
                  <ListItem
                    button
                    key={item.text}
                    onClick={() => history.push(item.path)}
                    className={location.pathname === item.path ? classes.active : null}
                  >
                    <ListItemIcon>{item.icon}</ListItemIcon>
                    <ListItemText primary={item.text} />
                  </ListItem>
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
