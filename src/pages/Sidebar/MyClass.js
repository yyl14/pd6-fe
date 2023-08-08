import { Divider, Drawer, List, ListItem, ListItemIcon, ListItemText, Typography } from '@material-ui/core';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import Icon from '@/components/ui/icon/index';
import useClass from '@/lib/class/useClass';
import useCourse from '@/lib/course/useCourse';
import useUserClasses from '@/lib/user/useUserClasses?';

export default function MyClass({ classNames, history, location, mode, open, onClose }) {
  const { courseId, classId } = useParams();

  const baseURL = '/6a/my-class';

  const { course } = useCourse(courseId);
  const { class: classData } = useClass(classId);
  const { accountClasses: userClasses } = useUserClasses();

  const [display, setDisplay] = useState([]); // 0: fold, 1: unfold
  const [titles, setTitles] = useState([]);
  const [itemLists, setItemLists] = useState([]);

  useEffect(() => {
    if (userClasses?.length) {
      if (
        mode === 'main' &&
        userClasses[0].course_id !== undefined &&
        userClasses[0].class_id !== undefined &&
        course !== undefined &&
        classData !== undefined
      ) {
        setDisplay(
          userClasses
            ?.sort((a, b) => b.class_name.localeCompare(a.class_name) || b.course_name.localeCompare(a.course_name))
            .map((item) => item.class_id === Number(classId)),
        );
        setTitles(
          userClasses
            ?.sort((a, b) => b.class_name.localeCompare(a.class_name) || b.course_name.localeCompare(a.course_name))
            .map((item) => `${item.course_name} ${item.class_name}`),
        );

        setItemLists(
          userClasses
            ?.sort((a, b) => b.class_name.localeCompare(a.class_name) || b.course_name.localeCompare(a.course_name))
            .map((item) => {
              switch (item.role) {
                case 'MANAGER': {
                  return [
                    {
                      text: 'Challenge',
                      icon: <Icon.Challenge />,
                      path: `${baseURL}/${item.course_id}/${item.class_id}/challenge`,
                    },
                    {
                      text: 'Submission',
                      icon: <Icon.Submission />,
                      path: `${baseURL}/${item.course_id}/${item.class_id}/submission`,
                    },
                    {
                      text: 'Grade',
                      icon: <Icon.Grade />,
                      path: `${baseURL}/${item.course_id}/${item.class_id}/grade`,
                    },
                    {
                      text: 'Team',
                      icon: <Icon.Team />,
                      path: `${baseURL}/${item.course_id}/${item.class_id}/team`,
                    },
                    {
                      text: 'Member',
                      icon: <Icon.Member />,
                      path: `${baseURL}/${item.course_id}/${item.class_id}/member`,
                    },
                  ];
                }
                case 'NORMAL': {
                  return [
                    {
                      text: 'Challenge',
                      icon: <Icon.Challenge />,
                      path: `${baseURL}/${item.course_id}/${item.class_id}/challenge`,
                    },
                    {
                      text: 'Grade',
                      icon: <Icon.Grade />,
                      path: `${baseURL}/${item.course_id}/${item.class_id}/grade`,
                    },
                    {
                      text: 'Team',
                      icon: <Icon.Team />,
                      path: `${baseURL}/${item.course_id}/${item.class_id}/team`,
                    },
                    {
                      text: 'Member',
                      icon: <Icon.Member />,
                      path: `${baseURL}/${item.course_id}/${item.class_id}/member`,
                    },
                  ];
                }
                default: {
                  return [
                    {
                      text: 'Challenge',
                      icon: <Icon.Challenge />,
                      path: `${baseURL}/${item.course_id}/${item.class_id}/challenge`,
                    },
                  ];
                }
              }
            }),
        );
      }
    }
  }, [location.pathname, mode, course, classData, userClasses, courseId, classId]);

  const foldMyClass = (id) => {
    setDisplay(display.map((item, index) => (index === id ? 0 : item)));
  };

  const unfoldMyClass = (id) => {
    setDisplay(display.map((item, index) => (index === id ? 1 : item)));
  };

  return (
    <div>
      <Drawer
        variant="persistent"
        open={open}
        onClose={onClose}
        className={classNames.drawer}
        anchor="left"
        PaperProps={{ elevation: 5 }}
        classes={{ paper: classNames.drawerPaper }}
      >
        <div className={classNames.topSpace} />
        <div>
          {userClasses?.map((userClass, id) => (
            <div key={userClass.class_id}>
              <div className={classNames.title}>
                {display[id] ? (
                  <Icon.TriangleDown className={classNames.titleIcon} onClick={() => foldMyClass(id)} />
                ) : (
                  <Icon.TriangleRight className={classNames.titleIcon} onClick={() => unfoldMyClass(id)} />
                )}
                <Typography noWrap variant="h4" className={classNames.titleText}>
                  {titles[id]}
                </Typography>
                {userClass.role === 'MANAGER' && (
                  <div className={classNames.titleRightIcon} style={{ marginRight: '0px' }}>
                    <Icon.TA />
                  </div>
                )}
              </div>
              <Divider variant="middle" className={classNames.divider} />
              {Boolean(display[id]) && (
                <List>
                  {itemLists[id].map((item) => (
                    <ListItem
                      button
                      key={item.path}
                      onClick={() => history.push(item.path)}
                      className={
                        location.pathname === item.path ? `${classNames.active} ${classNames.item}` : classNames.item
                      }
                    >
                      <ListItemIcon className={classNames.itemIcon}>{item.icon}</ListItemIcon>
                      <ListItemText primary={item.text} className={classNames.itemText} />
                    </ListItem>
                  ))}
                </List>
              )}
            </div>
          ))}
        </div>
        <div className={classNames.bottomSpace} />
      </Drawer>
    </div>
  );
}
