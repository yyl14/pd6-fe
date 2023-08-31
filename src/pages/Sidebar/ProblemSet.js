import { Divider, Drawer, List, ListItem, ListItemIcon, ListItemText, Typography } from '@material-ui/core';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import Icon from '@/components/ui/icon/index';
import useCoursesClasses from '@/lib/class/useCoursesClasses';
import useCourses from '@/lib/course/useCourses';

export default function ProblemSet({ classNames, history, location, open, onClose }) {
  const { courseId } = useParams();

  const { courses } = useCourses();
  const { coursesClasses } = useCoursesClasses(courses?.map((course) => course.id) ?? null);

  const baseURL = '/problem-set';

  const [display, setDisplay] = useState([]); // 0: fold, 1: unfold

  // has course and class id in url
  useEffect(() => {
    const foldIndex = courses
      ?.sort((a, b) => a.name.localeCompare(b.name))
      .map((item) => item.id)
      .indexOf(Number(courseId));
    if (foldIndex !== undefined && foldIndex !== -1) {
      setDisplay((state) => {
        const newList = state.length > 0 ? [...state] : courses?.map(() => 0);
        if (newList[foldIndex] !== 1) {
          newList[foldIndex] = 1;
        }
        return newList;
      });
    }
  }, [courses, courseId]);

  const changeFoldCourse = (id) => {
    const newList = [...display];
    newList[id] = !newList[id];
    setDisplay(newList);
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
          {courses
            ?.sort((a, b) => a.name.localeCompare(b.name))
            .map(({ id, name }, orderId) => (
              <div key={id}>
                <div className={classNames.title}>
                  {display[orderId] ? (
                    <Icon.TriangleDown className={classNames.titleIcon} onClick={() => changeFoldCourse(orderId)} />
                  ) : (
                    <Icon.TriangleRight className={classNames.titleIcon} onClick={() => changeFoldCourse(orderId)} />
                  )}
                  <Typography noWrap variant="h4" className={classNames.titleText}>
                    {name}
                  </Typography>
                </div>
                <Divider variant="middle" className={classNames.divider} />
                {Boolean(display[orderId]) && (
                  <List>
                    {coursesClasses[id]
                      ?.sort((a, b) => a.class_info.name.localeCompare(b.class_info.name))
                      .map((classItem) => (
                        <ListItem
                          button
                          key={classItem.class_info.id}
                          className={
                            location.pathname === `${baseURL}/${id}/${classItem.class_info.id}`
                              ? `${classNames.active} ${classNames.item}`
                              : classNames.item
                          }
                          onClick={() => history.push(`${baseURL}/${id}/${classItem.class_info.id}`)}
                        >
                          <ListItemIcon className={classNames.itemIcon}>
                            <Icon.Challenge />
                          </ListItemIcon>
                          <ListItemText primary={classItem.class_info.name} className={classNames.itemText} />
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
