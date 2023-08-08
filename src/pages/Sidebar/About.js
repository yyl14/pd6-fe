import { Divider, Drawer, List, ListItem, ListItemIcon, ListItemText, Typography } from '@material-ui/core';
import { useEffect, useState } from 'react';

import Icon from '@/components/ui/icon/index';

export default function About({ classes, history, location, mode, open, onClose }) {
  const baseURL = '/6a/about';
  const [display, setDisplay] = useState('unfold');
  const [title, setTitle] = useState('');
  const [itemList, setItemList] = useState([]);

  useEffect(() => {
    if (mode === 'system') {
      setTitle('About');
      setItemList([
        {
          text: 'Develop Team',
          path: `${baseURL}/team`,
          icon: <Icon.DevTeam />,
        },
      ]);
    }
  }, [location.pathname, history, mode]);

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
        <div className={classes.topSpace} />
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
                key={item.id}
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
