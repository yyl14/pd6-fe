import { Divider, Drawer, IconButton, List, ListItem, ListItemIcon, ListItemText, Typography } from '@material-ui/core';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import Icon from '@/components/ui/icon/index';
import useClass from '@/lib/class/useClass';
import useCourse from '@/lib/course/useCourse';
import useCourses from '@/lib/course/useCourses';

export default function Course({ classes, history, location, mode, open, onClose }) {
  const { courseId, classId } = useParams();
  const baseURL = '/admin/course';
  const [display, setDisplay] = useState('unfold');
  const [display1, setDisplay1] = useState('unfold');

  const [title1, setTitle1] = useState('');
  const [title2, setTitle2] = useState('');
  const [itemList, setItemList] = useState([]);
  const [arrow, setArrow] = useState(null);

  const { courses } = useCourses();
  const { course } = useCourse(Number(courseId));
  const { class: classData } = useClass(Number(classId));

  useEffect(() => {
    const goBack = () => {
      history.push(`${baseURL}/course/${courseId}/class-list`);
    };

    if (mode === 'class-list' && courses) {
      setTitle1('Lesson');
      setTitle2('Contest');
      setItemList(
        courses
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
              icon: <Icon.Newadd className={classes.addIconItem} />,
              path: `${baseURL}/course/${courseId}/class-list/lesson`,
            },
            {
              type: 'CONTEST',
              text: 'Contest',
              icon: <Icon.Newadd className={classes.addIconItem} />,
              path: `${baseURL}/course/${courseId}/class-list/contest`,
            },
          ]),
      );
    } else if (mode === 'course-setting' && course) {
      setArrow(
        <IconButton className={classes.arrow} onClick={() => goBack()}>
          <Icon.ArrowBackRoundedIcon />
        </IconButton>,
      );
      setTitle1(course?.name);
      setItemList([
        {
          text: 'Setting',
          path: `${baseURL}/course/${courseId}/setting`,
          icon: <Icon.Setting />,
        },
      ]);
    } else if (mode === 'class' && course && classData) {
      setArrow(
        <IconButton className={classes.arrow} onClick={() => goBack()}>
          <Icon.ArrowBackRoundedIcon />
        </IconButton>,
      );
      setTitle1(`${course.name} / ${classData.name}`);
      setItemList([
        {
          text: 'Member',
          path: `${baseURL}/class/${courseId}/${classId}/member`,
          icon: <Icon.Member />,
        },
        {
          text: 'Setting',
          path: `${baseURL}/class/${courseId}/${classId}/setting`,
          icon: <Icon.Setting />,
        },
      ]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname, history, courseId, classId, mode, courses, course, classData]);

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

  return (
    <div>
      <Drawer
        variant="persistent"
        open={open}
        onClose={onClose}
        className={classes.drawer}
        anchor="left"
        PaperProps={{ elevation: 5 }}
        classes={{ paper: classes.drawerPaper }}
      >
        {mode === 'class-list' ? <div className={classes.topSpace} /> : arrow}
        <div>
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
                (item) =>
                  (item.type === 'LESSON' || mode !== 'class-list') && (
                    <ListItem
                      button
                      key={item.text}
                      onClick={() => history.push(item.path)}
                      className={item.text !== 'Lesson' ? classes.item : classes.addItem}
                    >
                      <ListItemIcon
                        className={
                          location.pathname === item.path ? `${classes.active} ${classes.itemIcon}` : classes.itemIcon
                        }
                      >
                        {item.icon}
                      </ListItemIcon>
                      <ListItemText
                        primary={item.text}
                        className={
                          location.pathname === item.path ? `${classes.active} ${classes.itemText}` : classes.itemText
                        }
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
                    (item) =>
                      item.type === 'CONTEST' && (
                        <ListItem
                          button
                          key={item.text}
                          onClick={() => history.push(item.path)}
                          className={item.text !== 'Contest' ? classes.item : classes.addItem}
                        >
                          <ListItemIcon
                            className={
                              location.pathname === item.path
                                ? `${classes.active} ${classes.itemIcon}`
                                : classes.itemIcon
                            }
                          >
                            {item.icon}
                          </ListItemIcon>
                          <ListItemText
                            primary={item.text}
                            className={
                              location.pathname === item.path
                                ? `${classes.active} ${classes.itemText}`
                                : classes.itemText
                            }
                          />
                        </ListItem>
                      ),
                  )}
                </List>
              )}
            </>
          )}
        </div>
        <div className={classes.bottomSpace} />
      </Drawer>
    </div>
  );
}
