import { makeStyles, Typography } from '@material-ui/core';
import React from 'react';

const useStyles = makeStyles((theme) => ({
  wrapper: {
    display: 'flex',
    flexDirection: 'row',
    verticalAlign: 'center',
  },
  textColorPrimary: {
    color: '#1EA5FF',
  },
  textColorSecondary: {
    color: '#EA3222',
  },
  textColorDefault: {
    color: '#000000',
  },
  alignedTextWrapper: {
    width: '190px',
  },
  alignedTextWrapperMd: {
    width: '190px',
  },
  alignedTextWrapperLg: {
    width: '250px',
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

export default function AlignedText({
  text, children, maxWidth, textColor, childrenType,
}) {
  const classes = useStyles();
  const textWrapperWidth = (type) => {
    switch (type) {
      case 'lg': {
        return classes.alignedTextWrapperLg;
      }
      case 'md': {
        return classes.alignedTextWrapperMd;
      }
      default: {
        return classes.alignedTextWrapperMd;
      }
    }
  };
  const textColorSelect = (color) => {
    switch (color) {
      case 'primary': {
        return classes.textColorPrimary;
      }
      case 'secondary': {
        return classes.textColorSecondary;
      }
      default: {
        return classes.textColorDefault;
      }
    }
  };
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
    <div className={`${classes.wrapper} ${textColorSelect(textColor)}`}>
      <div className={textWrapperWidth(maxWidth)}>
        <Typography variant="body1" className={textTopMargin(childrenType)}>
          {text}
        </Typography>
      </div>
      {children}
    </div>
  );
}
