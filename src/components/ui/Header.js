import React, { useState, useEffect, useRef } from 'react';
import {
  makeStyles, Typography, AppBar, Toolbar,
} from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import { format } from 'date-fns';
import Icon from './icon/index';
import { userLogout } from '../../actions/user/auth';

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
    float: 'left',
    marginRight: '20px',
    marginTop: '2px',
    marginBottom: 'auto',
  },
  notification: {
    float: 'left',
    width: '20px',
    marginTop: '3px',
    marginBottom: 'auto',
    marginRight: '16px',
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
      borderRadius: '10px',
    },
    '& span:hover': {
      cursor: 'pointer',
      backgroundColor: theme.palette.grey.A100,
    },
  },
}));

export default function Header() {
  const user = useSelector((state) => state.user);
  const baseURL = '';
  const classes = useStyles();
  const history = useHistory();
  const location = useLocation();
  const [currentTime, setCurrentTime] = useState(format(new Date(), 'MMM d   HH:mm'));
  const [itemList, setItemList] = useState([]);
  const [menuList, setMenuList] = useState([]);

  const [hasClass, setHasClass] = useState(false);

  useEffect(() => {
    setHasClass(user.classes.length !== 0);
  }, [user.classes.length]);

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

  const [open, setOpen] = useState(false);
  const anchorRef = useRef(null);

  // const handleToggle = () => {
  //   setOpen((prevOpen) => !prevOpen);
  // };

  // const handleClose = (event) => {
  //   if (anchorRef.current && anchorRef.current.contains(event.target)) {
  //     return;
  //   }

  //   setOpen(false);
  // };

  // function handleListKeyDown(event) {
  //   if (event.key === 'Tab') {
  //     event.preventDefault();
  //     setOpen(false);
  //   }
  // }

  // return focus to the button when we transitioned from !open -> open
  const prevOpen = useRef(open);
  useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }

    prevOpen.current = open;
  }, [open]);

  const dispatch = useDispatch();

  const [cookies, setCookie, removeCookie] = useCookies(['token', 'id']);

  const goto = (link) => {
    // console.log(link);
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
            <Typography variant="h6" className={classes.item} key={item.text}>
              <a
                href={baseURL + item.path}
                className={location.pathname.includes(item.basePath) ? classes.active : classes.a}
              >
                {item.text}
              </a>
            </Typography>
          ))}
          <div className={classes.right}>
            <Typography className={classes.date}>{currentTime}</Typography>
            <Icon.NotificationsIcon className={classes.notification} />
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
