import { AppBar, Toolbar, Typography, makeStyles, useTheme } from '@material-ui/core';
import { format } from 'date-fns';
import moment from 'moment';
import { useEffect, useMemo, useRef, useState } from 'react';
import ResizeObserver from 'react-resize-observer';
import { useHistory, useLocation } from 'react-router-dom';

import Icon from '@/components/ui/icon/index';
import useActiveAnnouncements from '@/lib/announcement/useActiveAnnouncements';
import useLogOut from '@/lib/auth/useLogOut';
import useUser from '@/lib/user/useUser';
import useUserClasses from '@/lib/user/useUserClasses';

const useStyles = makeStyles((theme) => ({
  image: {
    width: '40px',
    height: '40px',
    display: 'block',
    borderRadius: '50%',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    marginLeft: 'auto',
    marginRight: 'auto',
    opacity: '1',
    zIndex: '-1',
  },
  logo: {
    '&:hover': {
      cursor: 'pointer',
    },
    display: 'flex',
    alignItems: 'center',
    color: theme.palette.grey[0],
    margin: '0 40px 0 30px',
    backgroundColor: 'transparent',
    border: 0,
  },
  noLogo: {
    marginLeft: '50px',
  },
  appbar: {
    left: 0,
    right: 'auto',
    minHeight: '55px',
    height: '55px',
    background: theme.headerStyle.background,
    minWidth: 'max-content',
  },
  toolbar: {
    minHeight: '55px',
    height: '55px',
    paddingLeft: '0px',
  },

  // header left
  item: {
    marginRight: '50px',
    '&:hover': {
      cursor: 'pointer',
    },
    '@media (max-width: 760px)': {
      marginRight: '20px',
    },
    color: theme.headerStyle.color,
  },

  itemActiveIndicator: {
    position: 'absolute',
    top: 52,
    height: 3,
    borderRadius: '3px 3px 0px 0px',
    backgroundColor: theme.headerStyle.color,
    transition: '0.3s',
    '-webkit-transform': 'translateZ(0)',
  },

  // header right
  right: {
    marginLeft: 'auto',
    marginRight: 0,
    paddingLeft: 15,
  },
  date: {
    color: theme.headerStyle.color,
    position: 'relative',
    float: 'left',
    marginRight: '4px',
    marginTop: '14px',
  },
  notificationContainer: {
    position: 'relative',
    display: 'inline-block',
    '&:hover': {
      cursor: 'pointer',
    },
  },
  notificationIcon: {
    color: theme.headerStyle.color,
    position: 'relative',
    transform: 'translateY(2px)',
    float: 'left',
    width: '20px',
    margin: '11px 16px 12px 16px',
    top: '2px',
  },
  unreadDot: {
    width: '6.75px',
    height: '6.75px',
    backgroundColor: theme.palette.secondary.main,
    position: 'absolute',
    left: '30px',
    top: '28px',
    borderRadius: '50%',
    zIndex: 2,
  },
  notificationDropdownContent: {
    position: 'fixed',
    backgroundColor: theme.palette.primary.contrastText,
    right: '30px',
    top: '39px',
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
    minHeight: '106px',
    borderBottom: `1px solid ${theme.palette.grey.A700}`,
    textAlign: 'left',
    '&:nth-child(1)': {
      borderRadius: '10px 10px 0 0',
    },
    '&:last-child': {
      borderRadius: '0 0 10px 10px',
    },
    '&:hover': {
      cursor: 'pointer',
    },
  },
  unreadNotification: {
    backgroundColor: theme.palette.grey.A100,
  },
  notificationHead: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  notificationTitle: {
    wordBreak: 'break-word',
  },
  notificationDays: {
    color: theme.palette.grey.A400,
    marginLeft: '10px',
    minWidth: '50px',
  },
  notificationContent: {
    marginTop: '16px',
    display: 'block !important',
    width: '400px',
    wordBreak: 'break-word',
  },

  userContainer: {
    position: 'relative',
    display: 'inline-block',
    marginRight: '20px',
    bottom: '13px',
  },
  userButton: {
    backgroundColor: 'transparent',
    color: theme.headerStyle.color,
    border: 'none',
    '&:hover': {
      cursor: 'pointer',
    },
  },
  active: {
    textDecoration: 'none',
    color: theme.headerStyle.activeColor, // temporary
  },
  userDropdownContent: {
    position: 'fixed',
    backgroundColor: theme.palette.primary.contrastText,
    right: '30px',
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
  hide: {
    display: 'none',
  },
}));

export default function Header() {
  const theme = useTheme();
  const classes = useStyles();
  const history = useHistory();
  const location = useLocation();

  const { account: user } = useUser();
  const { accountClasses: userClasses } = useUserClasses();
  const { activeAnnouncements } = useActiveAnnouncements();

  const [currentTime, setCurrentTime] = useState(format(new Date(), 'MMM d   HH:mm'));
  const [itemList, setItemList] = useState([]);
  const [menuList, setMenuList] = useState([]);
  const [notifyDropdown, setNotifyDropdown] = useState(false);
  const [userDropdown, setUserDropdown] = useState(false);
  const [notifyAlreadyClose, setNotifyAlreadyClose] = useState(false);
  const [userAlreadyClose, setUserAlreadyClose] = useState(false);
  const [notifyList, setNotifyList] = useState([]);

  const [hasClass, setHasClass] = useState(false);
  const [activeHeaderItemIndex, setActiveHeaderItemIndex] = useState(0);
  const [userButtonActive, setUserButtonActive] = useState(false);

  const headerItemRef = useRef([]);
  const notifyRef = useRef(null);
  const userRef = useRef(null);
  const userButtonRef = useRef(null);
  const [userButtonRect, setUserButtonRect] = useState({ left: 0, width: 0 });

  const indicatorStyles = useMemo(
    () => ({
      left:
        activeHeaderItemIndex !== undefined && activeHeaderItemIndex !== -1
          ? headerItemRef.current[activeHeaderItemIndex]?.offsetLeft
          : userButtonRect.left,
      width:
        activeHeaderItemIndex !== undefined && activeHeaderItemIndex !== -1
          ? headerItemRef.current[activeHeaderItemIndex]?.offsetWidth
          : userButtonRect.width,
    }),
    [activeHeaderItemIndex, userButtonRect.left, userButtonRect.width],
  );

  useEffect(() => {
    setHasClass(userClasses?.length !== 0);
  }, [userClasses]);

  useEffect(() => {
    switch (user?.role) {
      case 'MANAGER': {
        setItemList([
          {
            text: 'Course',
            basePath: '/6a/admin/course',
            path: '/6a/admin/course/course',
          },
          {
            text: 'Account',
            basePath: '/6a/admin/account',
            path: '/6a/admin/account/institute',
          },
          {
            text: 'System',
            basePath: '/6a/admin/system',
            path: '/6a/admin/system/accesslog',
          },
        ]);
        setMenuList([
          { title: 'My Profile', link: '/6a/my-profile' },
          { title: 'Logout', link: '/6a/logout' },
        ]);
        break;
      }
      case 'NORMAL': {
        if (hasClass) {
          setItemList([
            {
              text: 'My Class',
              basePath: '/6a/my-class',
              path: '/6a/my-class',
            },
            {
              text: 'Problem Set',
              basePath: '/6a/problem-set',
              path: '/6a/problem-set',
            },
            {
              text: 'About',
              basePath: '/6a/about',
              path: '/6a/about/team',
            },
          ]);
        } else {
          setItemList([
            {
              text: 'Problem Set',
              basePath: '/6a/problem-set',
              path: '/6a/problem-set',
            },
            {
              text: 'About',
              basePath: '/6a/about',
              path: '/6a/about/team',
            },
          ]);
        }
        setMenuList([
          { title: 'My Submission', link: '/6a/my-submission' },
          { title: 'My Profile', link: '/6a/my-profile' },
          { title: 'Logout', link: '/6a/logout' },
        ]);
        break;
      }
      case 'GUEST': {
        // System Guest
        setItemList([]);
        setMenuList([
          { title: 'My Profile', link: '/6a/my-profile' },
          { title: 'Logout', link: '/6a/logout' },
        ]);
        break;
      }
      default: {
        setItemList([]);
        setMenuList([
          { title: 'My Profile', link: '/6a/my-profile' },
          { title: 'Logout', link: '/6a/logout' },
        ]);
      }
    }
  }, [hasClass, user]);

  useEffect(() => {
    setActiveHeaderItemIndex(itemList.findIndex((item) => location.pathname.includes(item.basePath)));
  }, [itemList, location.pathname]);

  useEffect(() => {
    setUserButtonActive(location.pathname === '/my-profile' || location.pathname.slice(0, 14) === '/my-submission');
  }, [location.pathname]);

  const handleNotifyClickOutside = (event) => {
    if (notifyRef.current && !notifyRef.current.contains(event.target)) {
      setNotifyAlreadyClose(true);
      setNotifyDropdown(false);
      setTimeout(() => setNotifyAlreadyClose(false), 300);
    }
  };

  const handleUserClickOutside = (event) => {
    if (userRef.current && !userRef.current.contains(event.target)) {
      setUserAlreadyClose(true);
      setUserDropdown(false);
      setTimeout(() => setUserAlreadyClose(false), 300);
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleNotifyClickOutside, true);
    document.addEventListener('click', handleUserClickOutside, true);
    return () => {
      document.removeEventListener('click', handleNotifyClickOutside, true);
      document.removeEventListener('click', handleUserClickOutside, true);
    };
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(format(new Date(), 'MMM d  HH:mm'));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (activeAnnouncements.data?.data) {
      const ns = activeAnnouncements.data.data.sort(
        (a, b) => new Date(b.post_time).getTime() - new Date(a.post_time).getTime(),
      );
      setNotifyList(ns);
    }
  }, [activeAnnouncements.data]);

  const toggleNotify = () => {
    if (!notifyAlreadyClose) {
      setNotifyDropdown(true);
    }
    setNotifyAlreadyClose(false);
  };

  const toggleUser = () => {
    if (!userAlreadyClose) {
      setUserDropdown(true);
    }
    setUserAlreadyClose(false);
  };

  const logOut = useLogOut();
  const goto = (link) => {
    if (link === '/6a/logout') {
      logOut('/6a');
    } else {
      history.push(link);
    }
  };

  return (
    <div>
      <AppBar className={classes.appbar} elevation={0}>
        <Toolbar className={classes.toolbar}>
          <button type="button" className={classes.logo} onClick={() => history.push('/6a')}>
            {theme.headerStyle.logo}
          </button>
          {theme.headerStyle.hasIndicator && <div className={classes.itemActiveIndicator} style={indicatorStyles} />}
          {itemList.map((item, index) => (
            <Typography
              variant="h6"
              onClick={() => history.push(item.path)}
              className={`${classes.item} ${
                activeHeaderItemIndex === index && !theme.headerStyle.hasIndicator && classes.active
              }`}
              key={item.text}
              ref={(element) => {
                headerItemRef.current[index] = element;
              }}
            >
              {item.text}
            </Typography>
          ))}
          <div className={classes.right}>
            <Typography className={classes.date}>{currentTime}</Typography>
            <div
              className={classes.notificationContainer}
              onClick={toggleNotify}
              onKeyDown={toggleNotify}
              role="button"
              tabIndex="0"
            >
              <Icon.NotificationsIcon className={classes.notificationIcon} />
              {notifyList.length !== 0 && <div className={classes.unreadDot} />}
              {notifyDropdown && (
                <div className={classes.notificationDropdownContent} ref={notifyRef}>
                  {notifyList.map(
                    // between post time and expire time
                    (notify) =>
                      moment().diff(moment(notify.post_time), 'days') >= 0 &&
                      moment(notify.expire_time).diff(moment(new Date()), 'days') >= 0 && (
                        <div
                          key={notify.title}
                          className={
                            notify.is_deleted
                              ? `${classes.eachNotify}`
                              : `${classes.eachNotify} ${classes.unreadNotification}`
                          }
                          role="button"
                          tabIndex={notify.id}
                        >
                          <div className={classes.notificationHead}>
                            <Typography variant="h6" className={classes.notificationTitle}>
                              {notify.title}
                            </Typography>
                            <Typography variant="body2" className={classes.notificationDays}>
                              {`${moment(new Date()).diff(moment(notify.post_time), 'days')} days ago`}
                            </Typography>
                          </div>
                          <Typography variant="body1" className={classes.notificationContent}>
                            {notify.content}
                          </Typography>
                        </div>
                      ),
                  )}
                </div>
              )}
            </div>
            <div
              className={classes.userContainer}
              onClick={toggleUser}
              onKeyDown={toggleUser}
              role="button"
              tabIndex="-1"
            >
              <button type="button" className={classes.userButton} ref={userButtonRef}>
                <Typography
                  variant="h6"
                  className={userButtonActive && !theme.headerStyle.hasIndicator ? classes.active : null}
                >
                  <ResizeObserver onReflow={(rect) => setUserButtonRect(rect)} />
                  {user?.username}
                </Typography>
              </button>
              {userDropdown && (
                <div className={classes.userDropdownContent} ref={userRef}>
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
              )}
            </div>
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
}
