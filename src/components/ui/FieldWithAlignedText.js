import { makeStyles, Typography } from '@material-ui/core';
import React from 'react';

const useStyles = makeStyles((theme) => ({
  wrapper: {
    display: 'flex',
    flexDirection: 'row',
    verticalAlign: 'center',
  },
  alignedTextWrapper: {
    width: '190px',
  },
  alignedText: {
    marginTop: '25px',
  },
}));

export default function FieldWithAlignedText({ text, children }) {
  const classes = useStyles();
  return (
    <div className={classes.wrapper}>
      <div className={classes.alignedTextWrapper}>
        <Typography variant="body1" className={classes.alignedText}>
          {text}
        </Typography>
      </div>
      {children}
    </div>
  );
}
