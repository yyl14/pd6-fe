import { Divider, Drawer, List, ListItem, ListItemIcon, ListItemText, Typography } from '@material-ui/core';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import Icon from '@/components/ui/icon/index';
import useAccount from '@/lib/account/useAccount';

export default function UserProfile({ classes, history, location, mode, open, onClose }) {
  const { accountId } = useParams();
  const { account } = useAccount(accountId);
  const [display, setDisplay] = useState('unfold');
  const [title, setTitle] = useState('');
  const [itemList, setItemList] = useState([]);

  const baseURL = '/user-profile';

  useEffect(() => {
    if (mode === 'main' && account !== undefined) {
      setTitle(account.username);
      setItemList([
        {
          text: 'Profile',
          path: `${baseURL}/${accountId}`,
          icon: <Icon.Profile />,
        },
      ]);
    }
  }, [accountId, account, mode]);

  const foldAccount = () => {
    setDisplay('fold');
  };

  const unfoldAccount = () => {
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
            <Icon.TriangleDown className={classes.titleIcon} onClick={foldAccount} />
          ) : (
            <Icon.TriangleRight className={classes.titleIcon} onClick={unfoldAccount} />
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
