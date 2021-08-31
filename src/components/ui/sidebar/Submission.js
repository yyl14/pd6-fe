import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import {
  Drawer, Typography, List, ListItem, ListItemIcon, ListItemText, Divider, IconButton,
} from '@material-ui/core';
import Icon from '../icon/index';

import { fetchClass, fetchCourse } from '../../../actions/common/common';

export default function Submission({
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

  const submissions = useSelector((state) => state.submissions);

  useEffect(() => {
    dispatch(fetchCourse(authToken, courseId));
    dispatch(fetchClass(authToken, classId));
  }, [dispatch, authToken, classId, courseId]);

  const [display, setDisplay] = useState('unfold');

  const [title, setTitle] = useState('');
  const [itemList, setItemList] = useState([]);
  const [arrow, setArrow] = useState(null);

  useEffect(() => {
    const goBackToSubmission = () => {
      history.push(`${baseURL}/${courseId}/${classId}/submission`);
    };

    if (mode === 'detail') {
      // console.log(submissions);
      setArrow(<IconButton className={classNames.arrow} onClick={goBackToSubmission}><Icon.ArrowBackRoundedIcon /></IconButton>);
      setTitle('00111');
      setItemList([
        {
          text: 'Submission Detail',
          icon: <Icon.Submission />,
          path: `${baseURL}/${courseId}/${classId}/submission`,
        },
      ]);
    }
  }, [location.pathname, history, mode, userClasses, courseId, classId, submissions, classes.arrow, classNames.arrow]);

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
        {arrow}
        <div className={classNames.title}>
          {display === 'unfold' ? (
            <Icon.TriangleDown className={classNames.titleIcon} onClick={foldAccount} />
          ) : (
            <Icon.TriangleRight className={classNames.titleIcon} onClick={unfoldAccount} />
          )}
          <Typography variant="h4" className={classNames.titleText}>
            {title}
          </Typography>
        </div>
        <Divider variant="middle" className={classNames.divider} />
        {display === 'unfold' && (
          <List>
            {itemList.map((item) => (
              <ListItem button key={item.text} className={classNames.item}>
                <ListItemIcon className={classNames.itemIcon} style={{ color: location.pathname.includes(item.path) ? '#1EA5FF' : '' }}>{item.icon}</ListItemIcon>
                <ListItemText
                  primary={item.text}
                  className={location.pathname.includes(item.path) ? classNames.activeItemText : classNames.itemText}
                />
              </ListItem>
            ))}
          </List>
        )}
        <div className={classNames.bottomSpace} />
      </Drawer>
    </div>
  );
}
