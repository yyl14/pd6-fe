import { Divider, Drawer, IconButton, List, ListItem, ListItemIcon, ListItemText, Typography } from '@material-ui/core';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import Icon from '@/components/ui/icon/index';
import useAccount from '@/lib/account/useAccount';
import useInstitute from '@/lib/institute/useInstitute';

export default function Account({ classes, history, location, mode, open, onClose }) {
  const { instituteId, accountId } = useParams();

  const { institute } = useInstitute(instituteId);
  const { account } = useAccount(accountId);

  const baseURL = '/6a/admin/account';

  const [display, setDisplay] = useState('unfold');

  const [title, setTitle] = useState('');
  const [itemList, setItemList] = useState([]);
  const [arrow, setArrow] = useState(null);

  useEffect(() => {
    // console.log(instituteId, accountId);
    const goBackToInstitute = () => {
      history.push(`${baseURL}/institute`);
    };

    const goBackToAccount = () => {
      history.push(`${baseURL}/account`);
    };

    if (mode === 'main') {
      setTitle('Account');
      setItemList([
        {
          text: 'Institute',
          icon: <Icon.Institute />,
          path: `${baseURL}/institute`,
        },
        {
          text: 'Account',
          icon: <Icon.Profile />,
          path: `${baseURL}/account`,
        },
      ]);
    } else if (mode === 'institute' && institute) {
      setArrow(
        <IconButton className={classes.arrow} onClick={goBackToInstitute}>
          <Icon.ArrowBackRoundedIcon />
        </IconButton>,
      );
      setTitle(institute.abbreviated_name);
      setItemList([
        {
          text: 'Setting',
          path: `${baseURL}/institute/${instituteId}/setting`,
          icon: <Icon.SettingsIcon />,
        },
      ]);
    } else if (mode === 'account' && account) {
      setArrow(
        <IconButton className={classes.arrow} onClick={goBackToAccount}>
          <Icon.ArrowBackRoundedIcon />
        </IconButton>,
      );
      setTitle(account.username);
      setItemList([
        {
          text: 'Setting',
          path: `${baseURL}/account/${accountId}/setting`,
          icon: <Icon.SettingsIcon />,
        },
      ]);
    }
  }, [location.pathname, history, mode, account, accountId, instituteId, institute, classes.arrow]);

  const foldAccount = () => {
    setDisplay('fold');
  };

  const unfoldAccount = () => {
    setDisplay('unfold');
  };

  if ((instituteId !== undefined && institute === undefined) || (accountId !== undefined && account === undefined)) {
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
        />
      </div>
    );
  }

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
