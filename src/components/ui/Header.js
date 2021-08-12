import React, { useState, useEffect, useRef } from 'react';
import {
  makeStyles,
  Button,
  Typography,
  AppBar,
  Toolbar,
  Avatar,
  ClickAwayListener,
  Grow,
  Paper,
  Popper,
  MenuItem,
  MenuList,
} from '@material-ui/core';
import {
  AddCircleOutline,
  CallMissedOutgoingRounded,
  PlayCircleFilledWhite,
  SubjectOutlined,
} from '@material-ui/icons';
import NotificationsIcon from '@material-ui/icons/Notifications';
import { useHistory, useLocation } from 'react-router-dom';
import { format } from 'date-fns';

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
    marginTop: '3px',
    marginBottom: 'auto',
  },
  notification: {
    float: 'left',
    width: '3.28vh',
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
    '& a': {
      color: theme.palette.black.main,
      padding: '12px',
      textDecoration: 'none',
      textAlign: 'center',
      display: 'block',
    },
    '& a:hover': {
      backgroundColor: theme.palette.grey.A100,
    },
  },

}));

export default function Header({ role }) {
  const baseURL = '';
  const classes = useStyles();
  const history = useHistory();
  const location = useLocation();
  let itemList = [];
  const [currentTime, setCurrentTime] = useState(format(new Date(), 'MMM d   H:mm'));
  let menuList = [];

  if (role === 'MANAGER') {
    itemList = [
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
    ];
    menuList = [{ title: 'Logout', link: '/login' }];
  } else if (role === 'NORMAL') {
    itemList = [
      {
        text: 'My Class',
        basePath: '/my-class',
        path: '/my-class',
      },
      {
        text: 'Problem Set',
        basePath: '/problem-set',
        path: '/problem-set',
      },
      {
        text: 'PDAO',
        basePath: '/PDAO',
        path: '/PDAO',
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
    ];
    menuList = [
      { title: 'My Submission', link: '/my-submission' },
      { title: 'My Profile', link: '/my-profile' },
      { title: 'Logout', link: '/login' },
    ];
  } else if (role === 'GUEST') {
    itemList = [
      {
        text: 'Your Class',
        path: '/',
      },
      {
        text: 'Problem Set',
        path: '/problem_set',
      },
      {
        text: 'PDAO',
        path: '/pdao',
      },
      {
        text: 'About',
        path: '/about',
      },
    ];
  } else if (role === 'TA') {
    itemList = [
      {
        text: 'My Class',
        path: '/',
      },
      {
        text: 'Problem Set',
        path: '/problem_set',
      },
      {
        text: 'PDAO',
        path: '/pdao',
      },
      {
        text: 'System',
        path: '/system',
      },
      {
        text: 'About',
        path: '/about',
      },
    ];
  }

  useEffect(() => {
    console.log('Current route', location.pathname);
  }, [location]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(format(new Date(), 'MMM d   H:mm'));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef(null);

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpen(false);
  };

  function handleListKeyDown(event) {
    if (event.key === 'Tab') {
      event.preventDefault();
      setOpen(false);
    }
  }

  // return focus to the button when we transitioned from !open -> open
  const prevOpen = useRef(open);
  useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }

    prevOpen.current = open;
  }, [open]);

  return (
    <div>
      <AppBar className={classes.appbar} elevation={0}>
        <Toolbar className={classes.toolbar}>
          {/* <Avatar src="https://pdogs.ntu.im/judge/image/LOGO.png" className={classes.avatar} /> */}
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
            <NotificationsIcon className={classes.notification} />
            {/* <Typography variant="h6" className={classes.name}> */}
            <div className={classes.dropdown}>
              <button type="button" className={classes.dropbtn}>
                <Typography variant="h6">Shiba</Typography>
              </button>
              <div className={classes.dropdownContent}>
                {menuList.map((item, id) => (
                  <a key={item.link} href={item.link}>
                    {item.title}
                  </a>
                ))}
              </div>
            </div>
            {/* <Button
              ref={anchorRef}
              aria-controls={open ? 'menu-list-grow' : undefined}
              aria-haspopup="true"
              onClick={handleToggle}
              className={classes.name}
            >
              Shiba
            </Button> */}
            {/* <Popper open={open} anchorEl={anchorRef.current} role={undefined} transition disablePortal>
              {({ TransitionProps, placement }) => (
                <Grow
                  // eslint-disable-next-line react/jsx-props-no-spreading
                  {...TransitionProps}
                  style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
                >
                  <Paper>
                    <ClickAwayListener onClickAway={handleClose}>
                      <MenuList autoFocusItem={open} id="menu-list-grow" onKeyDown={handleListKeyDown}>
                        {menuList.map((menu, id) => (
                          <MenuItem onClick={handleClose} key={menu.title}>
                            <a href={menu.link}>{menu.title}</a>
                          </MenuItem>
                        ))}
                      </MenuList>
                    </ClickAwayListener>
                  </Paper>
                </Grow>
              )}
            </Popper> */}
            {/* </Typography> */}
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
}
