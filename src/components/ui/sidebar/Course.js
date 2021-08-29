import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import {
  Drawer,
  Typography,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  IconButton,
} from '@material-ui/core';
import Icon from '../icon/index';
import { fetchCourses } from '../../../actions/admin/course';

export default function Course({
  classes, history, location, mode,
}) {
  const { courseId, classId } = useParams();
  const courseList = useSelector((state) => state.courses);
  const classList = useSelector((state) => state.classes);
  const baseURL = '/admin/course';
  const [display, setDisplay] = useState('unfold');
  const [display1, setDisplay1] = useState('unfold');

  const [title1, setTitle1] = useState('');
  const [title2, setTitle2] = useState('');
  const [itemList, setItemList] = useState([]);
  const [arrow, setArrow] = useState(null);

  const dispatch = useDispatch();

  const authToken = useSelector((state) => state.auth.token);
  const loading = useSelector((state) => state.loading.admin.course);

  useEffect(() => {
    // console.log(mode, courseId, classId);
    const goBack = (courseid) => {
      history.push(`/admin/course/course/${courseid}/class-list`);
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
                  icon: <Icon.Class />,
                  path: `${baseURL}/course/${id}/class-list`,
                };
              case 'CONTEST':
                return {
                  type,
                  text: name,
                  icon: <Icon.Star />,
                  path: `${baseURL}/course/${id}/class-list`,
                };
              default:
                return {
                  type,
                  text: name,
                  icon: <Icon.Class />,
                  path: `${baseURL}/course/${id}/class-list`,
                };
            }
          })
          .concat([
            {
              type: 'LESSON',
              text: 'Lesson',
              icon: <Icon.Newadd />,
              path: `${baseURL}/course/${courseId}/class-list/lesson`,
            },
            {
              type: 'CONTEST',
              text: 'Contest',
              icon: <Icon.Newadd />,
              path: `${baseURL}/course/${courseId}/class-list/contest`,
            },
          ]),
      );
    } else if (mode === 'course-setting' && courseList.byId[courseId]) {
      setArrow(
        <IconButton className={classes.arrow} onClick={() => goBack(courseId)}>
          <Icon.ArrowBackRoundedIcon />
        </IconButton>,
      );
      setTitle1(courseList.byId[courseId].name);
      setItemList([
        {
          text: 'Setting',
          path: `${baseURL}/course/${courseId}/setting`,
          icon: <Icon.SettingsIcon />,
        },
      ]);
    } else if (mode === 'class' && courseList.byId[courseId] && classList.byId[classId]) {
      setArrow(
        <IconButton className={classes.arrow} onClick={() => goBack(courseId)}>
          <Icon.ArrowBackRoundedIcon />
        </IconButton>,
      );
      setTitle1(`${courseList.byId[courseId].name} / ${classList.byId[classId].name}`);
      setItemList([
        {
          text: 'Member',
          path: `${baseURL}/class/${courseId}/${classId}/member`,
          icon: <Icon.PeopleIcon />,
        },
        {
          text: 'Setting',
          path: `${baseURL}/class/${courseId}/${classId}/setting`,
          icon: <Icon.SettingsIcon />,
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

  if (courseList.byId[courseId] === undefined || (classId && classList.byId[classId] === undefined)) {
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

        <div className={classes.title}>
          {display === 'unfold' ? (
            <Icon.TriangleDown className={classes.titleIcon} onClick={foldLesson} />
          ) : (
            <Icon.TriangleRight className={classes.titleIcon} onClick={unfoldLesson} />
          )}

          <Typography variant="h4" className={classes.titleText}>
            {title1}
          </Typography>
        </div>
        <Divider variant="middle" className={classes.divider} />
        {display === 'unfold' && (
          <List>
            {itemList.map(
              (item) => (item.type === 'LESSON' || mode !== 'class-list') && (
              <ListItem
                button
                key={item.path}
                onClick={() => history.push(item.path)}
                className={item.text !== 'Lesson' ? classes.item : classes.addItem}
              >
                <ListItemIcon
                  className={classes.itemIcon}
                  style={{ color: location.pathname === item.path ? '#1EA5FF' : '' }}
                >
                  {item.icon}
                </ListItemIcon>
                <ListItemText
                  primary={item.text}
                  className={location.pathname === item.path ? classes.activeItemText : classes.itemText}
                />
              </ListItem>
              ),
            )}
          </List>
        )}

        {mode === 'class-list' && (
          <>
            <div className={classes.title}>
              {display1 === 'unfold' ? (
                <Icon.TriangleDown className={classes.titleIcon} onClick={foldContest} />
              ) : (
                <Icon.TriangleRight className={classes.titleIcon} onClick={unfoldContest} />
              )}
              <Typography variant="h4" className={classes.titleText}>
                {title2}
              </Typography>
            </div>
            <Divider variant="middle" className={classes.divider} />
            {display1 === 'unfold' && (
              <List>
                {itemList.map(
                  (item) => item.type === 'CONTEST' && (
                  <ListItem
                    button
                    key={item.path}
                    onClick={() => history.push(item.path)}
                    className={item.text !== 'Contest' ? classes.item : classes.addItem}
                  >
                    <ListItemIcon
                      className={classes.itemIcon}
                      style={{ color: location.pathname === item.path ? '#1EA5FF' : '' }}
                    >
                      {item.icon}
                    </ListItemIcon>
                    <ListItemText
                      primary={item.text}
                      className={location.pathname === item.path ? classes.activeItemText : classes.itemText}
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
