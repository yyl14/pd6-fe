import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import {
  Drawer, Typography, List, ListItem, ListItemIcon, ListItemText, Divider, IconButton,
} from '@material-ui/core';
import { ContactSupportOutlined } from '@material-ui/icons';
import Icon from '../icon/index';

import { fetchCourses, fetchClasses } from '../../../actions/admin/course';

export default function AllClass({
  classNames, history, location, mode,
}) {
  const { courseId, classId } = useParams();
  const baseURL = '/all-class';
  const dispatch = useDispatch();
  const authToken = useSelector((state) => state.auth.token);
  const classes = useSelector((state) => state.classes);
  const courses = useSelector((state) => state.courses);

  useEffect(() => {
    dispatch(fetchCourses(authToken));

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, authToken]);

  useEffect(() => {
    dispatch(fetchClasses(authToken, courseId));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authToken, courseId]);

  const [display, setDisplay] = useState('unfold'); // 0: fold, 1: unfold
  const [arrow, setArrow] = useState(null);
  const [title, setTitle] = useState('');
  const [itemList, setItemList] = useState([]);
  const [TAicons, setTAicons] = useState([]);

  // useEffect(() => {
  //   console.log(courses, classes);
  //   if (courses.allIds.length !== 0 && classes.allIds.length !== 0) {
  //     if (location.pathname === '/all-class') {
  //       history.push(`/all-class/${courses.byId[courses.allIds[0]].id}/${classes.byId[classes.allIds[0]].id}/challenge`);
  //     }
  //   }
  // }, [classes, courses, history, location.pathname]);

  useEffect(() => {
    // console.log(courses, classes);
    const goBackToMain = () => {
      history.push('/all-class');
    };
    if (
      mode === 'main'
    ) {
      setTitle('All Courses');
      setItemList(
        courses.allIds
          .map((id) => courses.byId[id])
          .map(({ id, type, name }) => ({
            type,
            text: name,
            icon: <Icon.PeopleIcon />,
            path: `${baseURL}/${id}`,
          })),
      );
    } else if (mode === 'course' && courses.byId[courseId] !== undefined) {
      setArrow(
        <IconButton className={classNames.arrow} onClick={goBackToMain}>
          <Icon.ArrowBackRoundedIcon />
        </IconButton>,
      );
      setTitle(courses.byId[courses.allIds[0]].name);
      setItemList(
        classes.allIds.sort()
          .map((id) => classes.byId[id])
          .map(({ id, name }) => ({
            type: 'Class',
            text: name,
            icon: <Icon.Challenge />,
            path: `${baseURL}/${courseId}/${id}/challenge`,
          })),
      );
    }
  }, [location.pathname, history, mode, courses, classes, courseId, classId, classNames.arrow]);

  // if (
  //   (courseId !== undefined && courses[courseId] === undefined)
  //   || (classId !== undefined && classes[classId] === undefined)
  // ) {
  //   return (
  //     <div>
  //       <Drawer
  //         className={classNames.drawer}
  //         variant="permanent"
  //         anchor="left"
  //         PaperProps={{ elevation: 5 }}
  //         classes={{ paper: classNames.drawerPaper }}
  //       />
  //     </div>
  //   );
  // }

  const fold = () => {
    setDisplay('fold');
  };

  const unfold = () => {
    setDisplay('unfold');
  };

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

        <div className={classNames.title}>
          {display === 'unfold' ? (
            <Icon.TriangleDown className={classNames.titleIcon} onClick={fold} />
          ) : (
            <Icon.TriangleRight className={classNames.titleIcon} onClick={unfold} />
          )}

          <Typography variant="h4" className={classNames.titleText}>
            {title}
          </Typography>
        </div>
        <Divider variant="middle" className={classNames.divider} />
        {display === 'unfold' && (
          <List>
            {itemList.map(
              (item) => (
                <ListItem
                  button
                  key={item.path}
                  onClick={() => history.push(item.path)}
                  className={classNames.item}
                >
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
              ),
            )}
          </List>
        )}
        <div className={classNames.bottomSpace} />
      </Drawer>
    </div>
  );
}
