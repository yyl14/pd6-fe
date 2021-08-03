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
    marginTop: '23px',
    marginBottom: '16px',
  },
  textAlignedText: {
    marginTop: '0px',
    marginBottom: '16px',
  },
  fieldAlignedText: {
    marginTop: '18px',
  },
}));

export default function AlignedText({ text, children, childrenType }) {
  const classes = useStyles();
  const textTopMargin = (type) => {
    switch (type) {
      case 'field': {
        return classes.fieldAlignedText;
      }
      case 'text': {
        return classes.textAlignedText;
      }
      default: {
        return classes.alignedText;
      }
    }
  };
  return (
    <div className={classes.wrapper}>
      <div className={classes.alignedTextWrapper}>
        <Typography variant="body1" className={textTopMargin(childrenType)}>
          {text}
        </Typography>
      </div>
      {children}
    </div>
  );
}
