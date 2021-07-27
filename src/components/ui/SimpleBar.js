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
  children: {},
  divider: {
    margin: '0px',
  },
}));

export default function SimpleBar({ title, children }) {
  const classes = useStyles();
  return (
    <>
      <div className={classes.topContent}>
        <Typography variant="h4" className={classes.title}>
          {title}
        </Typography>
        <div className={classes.children}>{children}</div>
      </div>
      <hr className={classes.divider} />
    </>
  );
}
