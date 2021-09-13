import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import {
  Drawer,
  Typography,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Button,
  IconButton,
} from '@material-ui/core';
import Icon from '../icon/index';

export default function System({
  classes, history, location, mode,
}) {
  const { announcementId, languageId } = useParams();
  const announcementList = useSelector((state) => state.announcements);
  const languageList = useSelector((state) => state.submitLangs);
  const baseURL = '/admin/system';
  const [display, setDisplay] = useState('unfold');
  const [title, setTitle] = useState('');
  const [itemList, setItemList] = useState([]);
  const [arrow, setArrow] = useState(null);

  useEffect(() => {
    // console.log(instituteId, accountId);

    const goBackToAnnouncement = () => {
      history.push('/admin/system/announcement');
    };

    const goBackToLanguage = () => {
      history.push('/admin/system/submitlang');
    };

    const goBackToSystem = () => {
      history.push('/all-class');
    };

    if (mode === 'main') {
      setTitle('System');
      setItemList([
        {
          text: 'Access Log',
          icon: <Icon.DescriptionIcon />,
          path: `${baseURL}/accesslog`,
        },
        {
          text: 'Announcement',
          icon: <Icon.NotificationsIcon />,
          path: `${baseURL}/announcement`,
        },
        {
          text: 'Submission Language',
          icon: <Icon.CodeIcon />,
          path: `${baseURL}/submitlang`,
        },
      ]);
    } else if (mode === 'create') {
      setArrow(
        <IconButton className={classes.arrow} onClick={goBackToAnnouncement}>
          <Icon.ArrowBackRoundedIcon />
        </IconButton>,
      );
      setTitle('(Draft)');
      setItemList([
        {
          text: 'Setting',
          path: `${baseURL}/announcement/add`,
          icon: <Icon.SettingsIcon />,
        },
      ]);
    } else if (mode === 'announcement' && announcementList.byId[announcementId]) {
      setArrow(
        <IconButton className={classes.arrow} onClick={goBackToAnnouncement}>
          <Icon.ArrowBackRoundedIcon />
        </IconButton>,
      );
      setTitle(announcementList.byId[announcementId].title);
      setItemList([
        {
          text: 'Setting',
          path: `${baseURL}/announcement/${announcementId}/setting`,
          icon: <Icon.SettingsIcon />,
        },
      ]);
    } else if (mode === 'language' && languageList.byId[languageId]) {
      setArrow(
        <IconButton className={classes.arrow} onClick={goBackToLanguage}>
          <Icon.ArrowBackRoundedIcon />
        </IconButton>,
      );
      setTitle(`${languageList.byId[languageId].name} ${languageList.byId[languageId].version}`);
      setItemList([
        {
          text: 'Setting',
          path: `${baseURL}/submitlang/${languageId}/setting`,
          icon: <Icon.SettingsIcon />,
        },
      ]);
    } else if (mode === 'system') {
      setArrow(
        <IconButton className={classes.arrow} onClick={goBackToSystem}>
          <Icon.ArrowBackRoundedIcon />
        </IconButton>,
      );
      setTitle('System');
      setItemList([
        {
          text: 'About',
          path: '/system/about',
          icon: <Icon.Warning />,
        },
        {
          text: 'Access Log',
          path: '/system/accesslog',
          icon: <Icon.Paper />,
        },
      ]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname, history, mode, announcementList, languageList, announcementId, languageId]);

  const foldSystem = () => {
    setDisplay('fold');
  };

  const unfoldSystem = () => {
    setDisplay('unfold');
  };

  if (
    (announcementId !== undefined && announcementList.byId[announcementId] === undefined)
    || (languageId !== undefined && languageList.byId[languageId] === undefined)
  ) {
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
        {mode === 'main' ? <div className={classes.topSpace} /> : arrow}
        <div className={classes.title}>
          {display === 'unfold' ? (
            <Icon.TriangleDown className={classes.titleIcon} onClick={foldSystem} />
          ) : (
            <Icon.TriangleRight className={classes.titleIcon} onClick={unfoldSystem} />
          )}
          <Typography variant="h4" className={classes.titleText}>
            {title}
          </Typography>
        </div>
        <Divider variant="middle" className={classes.divider} />
        {display === 'unfold' && (
          <List>
            {itemList.map((item) => (
              <ListItem button key={item.text} onClick={() => history.push(item.path)} className={classes.item}>
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
            ))}
          </List>
        )}
        <div className={classes.bottomSpace} />
      </Drawer>
    </div>
  );
}
