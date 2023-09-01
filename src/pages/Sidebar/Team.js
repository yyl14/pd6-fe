import { Divider, Drawer, IconButton, List, ListItem, ListItemIcon, ListItemText, Typography } from '@material-ui/core';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import Icon from '@/components/icon/index';
import useTeam from '@/lib/team/useTeam';

export default function Team({ classNames, history, location, mode, open, onClose }) {
  const { courseId, classId, teamId } = useParams();
  const baseURL = '/my-class';
  const { team } = useTeam(teamId);

  const [display, setDisplay] = useState('unfold');

  const [title, setTitle] = useState('');
  const [itemList, setItemList] = useState([]);
  const [arrow, setArrow] = useState(null);

  useEffect(() => {
    const goBackToTeam = () => {
      history.push(`${baseURL}/${courseId}/${classId}/team`);
    };

    if (mode === 'detail' && team !== undefined) {
      setArrow(
        <IconButton className={classNames.arrow} onClick={goBackToTeam}>
          <Icon.ArrowBackRoundedIcon />
        </IconButton>,
      );
      setTitle(team.name);
      setItemList([
        {
          text: 'Detail',
          icon: <Icon.Team />,
          path: `${baseURL}/${courseId}/${classId}/team`,
        },
      ]);
    }
  }, [classId, classNames.arrow, courseId, history, mode, teamId, team]);

  const foldTeam = () => {
    setDisplay('fold');
  };

  const unfoldTeam = () => {
    setDisplay('unfold');
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
        {arrow}
        <div className={classNames.title}>
          {display === 'unfold' ? (
            <Icon.TriangleDown className={classNames.titleIcon} onClick={foldTeam} />
          ) : (
            <Icon.TriangleRight className={classNames.titleIcon} onClick={unfoldTeam} />
          )}
          <Typography variant="h4" className={classNames.titleText}>
            {title}
          </Typography>
        </div>
        <Divider variant="middle" className={classNames.divider} />
        {display === 'unfold' && (
          <List>
            {itemList.map((item) => (
              <ListItem
                button
                key={item.text}
                className={
                  location.pathname.includes(item.path) ? `${classNames.active} ${classNames.item}` : classNames.item
                }
              >
                <ListItemIcon className={classNames.itemIcon}>{item.icon}</ListItemIcon>
                <ListItemText primary={item.text} className={classNames.itemText} />
              </ListItem>
            ))}
          </List>
        )}
        <div className={classNames.bottomSpace} />
      </Drawer>
    </div>
  );
}
