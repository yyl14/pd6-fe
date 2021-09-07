import React, { useState, useEffect } from 'react';
import moment from 'moment';
import {
  makeStyles, Typography, AppBar, Toolbar,
} from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import { format } from 'date-fns';
import Icon from './icon/index';
import { userLogout } from '../../actions/user/auth';
import { userBrowseAnnouncement, userReadAnnouncement } from '../../actions/user/user';

const useStyles = makeStyles((theme) => ({
  appbar: {
    minHeight: '55px',
    height: '55px',
    background: theme.palette.black.main,
  },
  toolbar: {
    minHeight: '55px',
    height: '55px',
    paddingLeft: '0px',
  },
  item: {
    marginLeft: '50px',
    // marginRight: '0.8vw',
    '&:hover': {
      cursor: 'pointer',
    },
  },
  date: {
    position: 'relative',
    float: 'left',
    marginRight: '20px',
    marginTop: '2px',
    marginBottom: 'auto',
    top: '2px',
  },
  notificationContainer: {
    position: 'relative',
    display: 'inline-block',
    '&:hover': {
      // '& $notificationDropContent': {
      //   display: 'block',
      // },
      cursor: 'pointer',
    },
  },
  notification: {
    position: 'relative',
    float: 'left',
    width: '20px',
    marginTop: '3px',
    marginBottom: 'auto',
    marginRight: '16px',
    top: '2px',
  },
  notificationTitle: {
    wordBreak: 'break-word',
  },
  notificationDays: {
    color: theme.palette.grey.A400,
    marginLeft: '10px',
  },
  notificationDropContent: {
    position: 'absolute',
    backgroundColor: theme.palette.primary.contrastText,
    right: '-120px',
    top: '45px',
    minWidth: '460px',
    maxHeight: '423px',
    zIndex: '1',
    boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.25)',
    borderRadius: '10px',
    overflow: 'auto',
  },
  eachNotify: {
    color: theme.palette.black.main,
    padding: '20px 30px',
    width: '460px',
    minHeight: '106px',
    height: 'auto',
    borderBottom: `1px solid ${theme.palette.grey.A700}`,
    textDecoration: 'none',
    textAlign: 'left',
    display: 'block',
    '&:nth-child(1)': {
      borderRadius: '10px 10px 0 0',
    },
    '&:last-child': {
      borderRadius: '0 0 10px 10px',
    },
    '&:hover': {
      cursor: 'pointer',
    },
    '& div': {
      width: '400px',
      minHeight: '25px',
      height: 'auto',
      lineHeight: '25px',
      display: 'flex',
      justifyContent: 'space-between',
      '& span': {
        fontSize: '18px',
      },
    },
  },
  unread: {
    backgroundColor: theme.palette.grey.A100,
  },
  unreadDot: {
    width: '6.75px',
    height: '6.75px',
    backgroundColor: theme.palette.secondary.main,
    position: 'absolute',
    left: '14px',
    top: '17px',
    borderRadius: '50%',
    zIndex: 2,
  },
  notificationContent: {
    marginTop: '16px',
    display: 'block !important',
    width: '400px',
    wordBreak: 'break-word',
  },

  name: {
    width: '65px',
    height: '33px',
    float: 'left',
    marginLeft: '2vw',
    marginRight: '1vw',
    marginTop: 'auto',
    marginBottom: 'auto',
    fontSize: '1rem',
    color: 'white',
    backgroundColor: 'black',
    '&:hover': {
      backgroundColor: 'black',
    },
  },
  right: {
    marginLeft: 'auto',
    marginRight: 0,
  },
  avatar: {
    marginLeft: '2vw',
    marginRight: '3.5vw',
    height: '4vh',
    width: '4vh',
  },
  a: {
    color: 'inherit',
    textDecoration: 'none',
  },
  active: {
    textDecoration: 'none',
    color: theme.palette.primary.main,
  },

  // menu
  dropdown: {
    position: 'relative',
    display: 'inline-block',
    '&:hover': {
      '& $dropdownContent': {
        display: 'block',
      },
    },
    marginRight: '20px',
    bottom: '3px',
  },

  dropbtn: {
    marginTop: 'auto',
    marginBottom: 'auto',
    backgroundColor: theme.palette.black.main,
    color: theme.palette.primary.contrastText,
    border: 'none',
    '&:hover': {
      cursor: 'pointer',
    },
  },

  dropdownContent: {
    display: 'none',
    position: 'absolute',
    backgroundColor: theme.palette.primary.contrastText,
    marginLeft: '-40px',
    minWidth: '140px',
    zIndex: '1',
    boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.25)',
    borderRadius: '10px',
    '& span': {
      color: theme.palette.black.main,
      padding: '12px',
      textDecoration: 'none',
      textAlign: 'center',
      display: 'block',
      '&:nth-child(1)': {
        borderRadius: '10px 10px 0 0',
      },
      '&:last-child': {
        borderRadius: '0 0 10px 10px',
      },
    },
    '& span:hover': {
      cursor: 'pointer',
      backgroundColor: theme.palette.grey.A100,
    },
  },
}));

export default function Header() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const authToken = useSelector((state) => state.auth.token);
  const classes = useStyles();
  const history = useHistory();
  const location = useLocation();
  const [currentTime, setCurrentTime] = useState(format(new Date(), 'MMM d   HH:mm'));
  const [itemList, setItemList] = useState([]);
  const [menuList, setMenuList] = useState([]);
  const [notifyPop, setNotifyPop] = useState(false);
  const [notifyList, setNotifyList] = useState([]);
  const [unreadNotifyExist, setUnreadNotifyExist] = useState(false);

  const [hasClass, setHasClass] = useState(false);
  const [, , removeCookie] = useCookies(['token', 'id']);

  useEffect(() => {
    setHasClass(user.classes.length !== 0);
  }, [user.classes.length]);

  useEffect(() => {
    dispatch(userBrowseAnnouncement(authToken));
  }, [authToken, dispatch]);

  useEffect(() => {
    switch (user.role) {
      case 'MANAGER': {
        setItemList([
          {
            text: 'Course',
            basePath: '/admin/course',
            path: '/admin/course/course',
          },
          {
            text: 'Account',
            basePath: '/admin/account',
            path: '/admin/account/institute',
          },
          {
            text: 'System',
            basePath: '/admin/system',
            path: '/admin/system/accesslog',
          },
          {
            text: 'About',
            path: '/about',
          },
        ]);
        setMenuList([
          { title: 'My Profile', link: '/my-profile' },
          { title: 'Logout', link: '/logout' },
        ]);
        break;
      }
      case 'NORMAL': {
        if (hasClass) {
          setItemList([
            {
              text: 'My Class',
              basePath: '/my-class',
              path: '/my-class',
            },
            {
              text: 'All Class',
              basePath: '/all-class',
              path: '/all-class',
            },
            // {
            //   text: 'Problem Set',
            //   basePath: '/problem-set',
            //   path: '/problem-set',
            // },
            {
              text: 'PDAO',
              basePath: '/pdao',
              path: '/pdao',
            },
            {
              text: 'Ranklist',
              basePath: '/ranklist',
              path: '/ranklist',
            },
            {
              text: 'System',
              basePath: '/system',
              path: '/system',
            },
          ]);
        } else {
          setItemList([
            {
              text: 'All Class',
              basePath: '/all-class',
              path: '/all-class',
            },
            // {
            //   text: 'Problem Set',
            //   basePath: '/problem-set',
            //   path: '/problem-set',
            // },
            {
              text: 'PDAO',
              basePath: '/pdao',
              path: '/pdao',
            },
            {
              text: 'Ranklist',
              basePath: '/ranklist',
              path: '/ranklist',
            },
            {
              text: 'System',
              basePath: '/system',
              path: '/system',
            },
          ]);
        }
        setMenuList([
          { title: 'My Submission', link: '/my-submission' },
          { title: 'My Profile', link: '/my-profile' },
          { title: 'Logout', link: '/logout' },
        ]);
        break;
      }
      case 'GUEST': {
        // System Guest
        setItemList([]);
        setMenuList([
          { title: 'My Profile', link: '/my-profile' },
          { title: 'Logout', link: '/logout' },
        ]);
        break;
      }
      default: {
        setItemList([]);
        setMenuList([
          { title: 'My Profile', link: '/my-profile' },
          { title: 'Logout', link: '/logout' },
        ]);
      }
    }
  }, [hasClass, user.role]);

  // useEffect(() => {
  //   console.log('Current route', location.pathname);
  // }, [location]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(format(new Date(), 'MMM d  HH:mm'));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const ns = user.notifications.sort((a, b) => new Date(b.post_time).getTime() - new Date(a.post_time).getTime());
    setNotifyList(ns);
    setUnreadNotifyExist(!!ns.filter((e) => !e.is_deleted).length);
  }, [user.notifications]);

  const toggleNotify = () => {
    setNotifyPop(!notifyPop);
  };

  // const readNotification = (notifyId) => {
  //   dispatch(userReadAnnouncement(authToken, notifyId));
  //   // dispatch(userBrowseAnnouncement(authToken)); // this line needs to be de-marked when BE complete read announcement
  // };

  const goto = (link) => {
    if (link === '/logout') {
      removeCookie('token', { path: '/' });
      removeCookie('id', { path: '/' });
      dispatch(userLogout(history));
    } else {
      history.push(link);
    }
  };

  return (
    <div>
      <AppBar className={classes.appbar} elevation={0}>
        <Toolbar className={classes.toolbar}>
          {itemList.map((item) => (
            <Typography
              variant="h6"
              onClick={() => history.push(item.path)}
              className={`${classes.item} ${location.pathname.includes(item.basePath) && classes.active}`}
              key={item.text}
            >
              {item.text}
            </Typography>
          ))}
          <div className={classes.right}>
            <Typography className={classes.date}>{currentTime}</Typography>
            <div className={classes.notificationContainer}>
              <Icon.NotificationsIcon className={classes.notification} onClick={toggleNotify} />
              {unreadNotifyExist && <div className={classes.unreadDot} />}
              {notifyPop && (
                <div className={classes.notificationDropContent}>
                  {notifyList.map((notify) => (
                    <div
                      key={notify.title}
                      className={
                        notify.is_deleted ? `${classes.eachNotify}` : `${classes.eachNotify} ${classes.unread}`
                      }
                      role="button"
                      tabIndex={notify.id}
                      // onClick={() => readNotification(notify.id)}
                      // onKeyDown={() => readNotification(notify.id)}
                    >
                      <div>
                        <Typography variant="h6" className={classes.notificationTitle}>
                          {notify.title}
                        </Typography>
                        <Typography variant="body2" className={classes.notificationDays}>
                          {moment(new Date()).diff(moment(notify.post_time), 'days')}
                          &nbsp;days
                        </Typography>
                      </div>
                      <Typography variant="body" className={classes.notificationContent}>
                        {notify.content}
                      </Typography>
                    </div>
                  ))}
                </div>
              )}
            </div>
            <div className={classes.dropdown}>
              <button type="button" className={classes.dropbtn}>
                <Typography variant="h6" className={location.pathname === '/my-profile' ? classes.active : null}>
                  {user.username}
                </Typography>
              </button>
              <div className={classes.dropdownContent}>
                {menuList.map((item) => (
                  <span
                    key={item.link}
                    tabIndex={item.link}
                    role="button"
                    onClick={() => goto(item.link)}
                    onKeyDown={() => goto(item.link)}
                  >
                    {item.title}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
}
