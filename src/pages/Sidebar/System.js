import { Divider, Drawer, IconButton, List, ListItem, ListItemIcon, ListItemText, Typography } from '@material-ui/core';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import Icon from '@/components/ui/icon/index';
import useReduxStateShape from '@/hooks/useReduxStateShape';
import useAnnouncements from '@/lib/announcement/useAnnouncements';
import useSubmitLangs from '@/lib/submitLang/useSubmitLangs';

export default function System({ classes, history, location, mode, open, onClose }) {
  const { announcementId, submitlangId } = useParams();
  const { browseAnnouncement } = useAnnouncements();
  const { submitLangs } = useSubmitLangs();
  const [announcementById] = useReduxStateShape(browseAnnouncement.data);
  const [submitLangById] = useReduxStateShape(submitLangs);
  const baseURL = '/admin/system';
  const [display, setDisplay] = useState('unfold');
  const [title, setTitle] = useState('');
  const [itemList, setItemList] = useState([]);
  const [arrow, setArrow] = useState(null);

  useEffect(() => {
    const goBackToAnnouncement = () => {
      history.push(`${baseURL}/announcement`);
    };

    const goBackToLanguage = () => {
      history.push(`${baseURL}/submitlang`);
    };

    if (mode === 'main') {
      setTitle('System');
      setItemList([
        {
          text: 'Access Log',
          icon: <Icon.Paper />,
          path: `${baseURL}/accesslog`,
        },
        {
          text: 'Announcement',
          icon: <Icon.Bell />,
          path: `${baseURL}/announcement`,
        },
        {
          text: 'Submission Language',
          icon: <Icon.Code />,
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
          icon: <Icon.Setting />,
        },
      ]);
    } else if (mode === 'announcement' && announcementById && announcementById[announcementId]) {
      setArrow(
        <IconButton className={classes.arrow} onClick={goBackToAnnouncement}>
          <Icon.ArrowBackRoundedIcon />
        </IconButton>,
      );
      setTitle(announcementById[announcementId].title);
      setItemList([
        {
          text: 'Setting',
          path: `${baseURL}/announcement/${announcementId}/setting`,
          icon: <Icon.Setting />,
        },
      ]);
    } else if (mode === 'language' && submitLangById && submitLangById[submitlangId]) {
      setArrow(
        <IconButton className={classes.arrow} onClick={goBackToLanguage}>
          <Icon.ArrowBackRoundedIcon />
        </IconButton>,
      );
      setTitle(`${submitLangById[submitlangId].name} ${submitLangById[submitlangId].version}`);
      setItemList([
        {
          text: 'Setting',
          path: `${baseURL}/submitlang/${submitlangId}/setting`,
          icon: <Icon.Setting />,
        },
      ]);
    } else if (mode === 'system') {
      if (location.pathname === '/system') {
        history.push('/system/team');
      }
      setTitle('System');
      setItemList([
        {
          text: 'Develop Team',
          path: '/system/team',
          icon: <Icon.DevTeam />,
        },
      ]);
    }
  }, [location.pathname, history, mode, announcementId, announcementById, classes.arrow, submitLangById, submitlangId]);

  const foldSystem = () => {
    setDisplay('fold');
  };

  const unfoldSystem = () => {
    setDisplay('unfold');
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
        {mode === 'main' ? <div className={classes.topSpace} /> : arrow}
        {mode === 'system' && <div className={classes.topSpace} />}
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
              <ListItem
                button
                key={item.text}
                onClick={() => history.push(item.path)}
                className={location.pathname === item.path ? `${classes.active} ${classes.item}` : classes.item}
              >
                <ListItemIcon className={classes.itemIcon}>{item.icon}</ListItemIcon>
                <ListItemText primary={item.text} className={classes.itemText} />
              </ListItem>
            ))}
          </List>
        )}
        <div className={classes.bottomSpace} />
      </Drawer>
    </div>
  );
}
