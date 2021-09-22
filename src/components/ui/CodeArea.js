import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { InputBase, withStyles } from '@material-ui/core';
import CopyToClipboardButton from './CopyToClipboardButton';
import '../../index.css';

const useStyles = makeStyles({
  codeContent: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-end',
  },
  buttonWrapper: {
    height: 0,
    width: 0,
  },
  codeField: {
    width: '100%',
  },
  copyIcon: {
    transform: 'translate(-50px, 20px)',
    zIndex: '1000',
  },
});

const StyledTextField = withStyles({
  root: {
    fontFamily: 'Cascadia',
  },
  input: {
    margin: '15px',
  },
})(InputBase);

export default function CodeArea({ value }) {
  const classNames = useStyles();
  return (
    <div className={classNames.codeContent}>
      <div className={classNames.buttonWrapper}>
        <CopyToClipboardButton className={classNames.copyIcon} text={value} />
      </div>
      <StyledTextField className={classNames.codeField} value={value} disabled multiline minRows={10} />
    </div>
  );
}
