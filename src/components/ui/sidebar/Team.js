import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import {
  Drawer, Typography, List, ListItem, ListItemIcon, ListItemText, Divider, IconButton,
} from '@material-ui/core';
import Icon from '../icon/index';

import { fetchTeams } from '../../../actions/myClass/team';
import { fetchClass, fetchCourse } from '../../../actions/common/common';

export default function Team({
  classNames, history, location, mode,
}) {
  const { courseId, classId, teamId } = useParams();
  const baseURL = '/my-class';
  const dispatch = useDispatch();
  const authToken = useSelector((state) => state.auth.token);
  const teams = useSelector((state) => state.teams);

  useEffect(() => {
    dispatch(fetchTeams(authToken, classId));
  }, [dispatch, authToken, classId, courseId]);

  const [display, setDisplay] = useState('unfold');

  const [title, setTitle] = useState('');
  const [itemList, setItemList] = useState([]);
  const [arrow, setArrow] = useState(null);

  useEffect(() => {
    // console.log(teams);
    const goBackToTeam = () => {
      history.push(`${baseURL}/${courseId}/${classId}/team`);
    };

    if (mode === 'detail' && teams.byId[teamId] !== undefined) {
      setArrow(
        <IconButton className={classNames.arrow} onClick={goBackToTeam}>
          <Icon.ArrowBackRoundedIcon />
        </IconButton>,
      );
      setTitle(teams.byId[teamId].name);
      setItemList([
        {
          text: 'Detail',
          icon: <Icon.Team />,
          path: `${baseURL}/${courseId}/${classId}/team`,
        },
      ]);
    }
  }, [classId, classNames.arrow, courseId, history, mode, teamId, teams]);

  const foldTeam = () => {
    setDisplay('fold');
  };

  const unfoldTeam = () => {
    setDisplay('unfold');
  };

  // if (teamId !== undefined && teams[teamId] === undefined) {
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
        <div>
          {display === 'unfold' ? (
            <Icon.TriangleDown className={classNames.titleIcon} onClick={foldTeam} />
          ) : (
            <Icon.TriangleRight className={classNames.titleIcon} onClick={unfoldTeam} />
          )}
          <Typography variant="h4" className={classNames.title}>
            {title}
          </Typography>
        </div>
        <Divider variant="middle" className={classNames.divider} />
        {display === 'unfold' ? (
          <List>
            {itemList.map((item) => (
              <ListItem button key={item.text} onClick={() => history.push(item.path)} className={classNames.item}>
                <ListItemIcon className={location.pathname.includes(item.path) ? classNames.svg : classNames.icon}>
                  {item.icon}
                </ListItemIcon>
                <ListItemText
                  primary={item.text}
                  className={location.pathname.includes(item.path) ? classNames.active : null}
                />
              </ListItem>
            ))}
          </List>
        ) : (
          ''
        )}
        <div className={classNames.bottomSpace} />
      </Drawer>
    </div>
  );
}
