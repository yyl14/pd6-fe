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
    transform: 'translate(0px, 12px)',
  },
  buttons: {
    height: '60px',
  },
  divider: {
    margin: '0px',
  },
  children: {
    margin: '16px 0px 50px 50px',
  },
}));

export default function SimpleBar({ title, buttons, children }) {
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
      <div className={classes.children}>{children}</div>
    </>
  );
}
