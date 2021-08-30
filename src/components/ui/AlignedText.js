import { makeStyles, Typography } from '@material-ui/core';
import React from 'react';

const useStyles = makeStyles((theme) => ({
  wrapper: {
    display: 'flex',
    flexDirection: 'row',
    // verticalAlign: 'center',
  },
  textColorPrimary: {
    color: theme.palette.primary.main,
  },
  textColorSecondary: {
    color: theme.palette.secondary.main,
  },
  textColorDefault: {},
  alignedTextWrapper: {
    boxSizing: 'content-box',
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
  radioAlignedText: {
    marginBottom: '16px',
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
      case 'radio': {
        return classes.radioAlignedText;
      }
      default: {
        return classes.alignedText;
      }
    }
  };
  return (
    <div className={`${classes.wrapper} ${textColorSelect(textColor)}`}>
      <div className={`${classes.alignedTextWrapper} ${textWrapperWidth(maxWidth)}`}>
        <Typography variant="body1" className={textTopMargin(childrenType)}>
          {text}
        </Typography>
      </div>
      {children}
    </div>
  );
}
