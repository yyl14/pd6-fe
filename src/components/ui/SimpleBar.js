import { Typography, makeStyles } from '@material-ui/core';

import React from 'react';

const useStyles = makeStyles((theme) => ({
  topContent: {
    // width: '80%',
    // maxWidth: '1280px',
    display: 'flex',
    justifyContent: 'space-between',
  },
  title: {
    transform: 'translate(0px, 20px)',
  },
  buttons: {
    height: '60px',
  },
  buttonsBelow: {
    marginTop: '6px',
    width: '21.8%',
    display: 'flex',
    justifyContent: 'flex-end',
  },
  divider: {
    margin: '0px',
  },
  bottomContent: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  children: {
    margin: '16px 0px 50px 50px',
    width: '70.9%',
  },
}));

export default function SimpleBar({
  title, buttons, childrenButtons, children,
}) {
  const classes = useStyles();
  return (
    <>
      <div className={classes.topContent}>
        <Typography variant="h4" className={classes.title}>
          {title}
        </Typography>
        <div className={classes.buttons}>{buttons}</div>
      </div>
      <hr className={classes.divider} />
      <div className={classes.bottomContent}>
        <div className={classes.children}>{children}</div>
        <div className={`${classes.buttons} ${classes.buttonsBelow}`}>{childrenButtons}</div>
      </div>
    </>
  );
}
