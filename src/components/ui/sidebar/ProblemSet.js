import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import {
  Drawer, Typography, List, ListItem, ListItemIcon, ListItemText, Divider, IconButton,
} from '@material-ui/core';
import Icon from '../icon/index';

import { fetchCourses, fetchClasses } from '../../../actions/admin/course';

export default function ProblemSet({
  classNames, history, location, mode,
}) {
  // const { courseId, classId } = useParams();
  const baseURL = '/problem-set';
  const dispatch = useDispatch();
  const authToken = useSelector((state) => state.auth.token);
  const classes = useSelector((state) => state.classes);
  const courses = useSelector((state) => state.courses);
  const [hasFetchClasses, setHasFetchClasses] = useState(false);

  const [display, setDisplay] = useState([]); // 0: fold, 1: unfold

  useEffect(() => {
    if (courses && !hasFetchClasses) {
      courses.allIds.map((id) => dispatch(fetchClasses(authToken, id)));
      setHasFetchClasses(true);
    }
  }, [authToken, courses, dispatch, hasFetchClasses]);

  useEffect(() => {
    dispatch(fetchCourses(authToken));
  }, [authToken, dispatch]);

  const changeFoldCourse = (id) => {
    const newList = [...display];
    newList[id] = !newList[id];
    setDisplay(newList);
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
        <div className={classNames.topSpace} />
        <div>
          {courses.allIds.map((courseId, id) => (
            <div key={courseId}>
              <div className={classNames.title}>
                {display[id] ? (
                  <Icon.TriangleDown className={classNames.titleIcon} onClick={() => changeFoldCourse(id)} />
                ) : (
                  <Icon.TriangleRight className={classNames.titleIcon} onClick={() => changeFoldCourse(id)} />
                )}
                <Typography noWrap variant="h4" className={classNames.titleText}>
                  {courses.byId[courseId].name}
                </Typography>
              </div>
              <Divider variant="middle" className={classNames.divider} />
              {Boolean(display[id]) && (
                <List>
                  {courses.byId[courseId].classIds.map((classId) => (
                    <ListItem
                      button
                      key={classId}
                      className={classNames.item}
                      onClick={() => history.push(`${baseURL}/${courseId}/${classId}`)}
                    >
                      <ListItemIcon className={classNames.itemIcon}>
                        <Icon.Challenge />
                      </ListItemIcon>
                      <ListItemText primary={classes.byId[classId].name} className={classNames.itemText} />
                    </ListItem>
                  ))}
                </List>
              )}
            </div>
          ))}
        </div>
      </Drawer>
    </div>
  );
}
