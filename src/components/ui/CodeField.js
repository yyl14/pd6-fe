import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { TextField } from '@material-ui/core';

const useStyles = makeStyles(() => ({
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
    height: 'auto',
  },
  codeFieldInputRoot: {
    fontFamily: 'Noto Sans Mono',
  },
}));

export default function CodeField({
  value, onChange, disabled = false, placeholder,
}) {
  const classNames = useStyles();
  return (
    <TextField
      style={{ whiteSpace: 'nowrap' }}
      value={value}
      onChange={onChange}
      multiline
      minRows={15}
      disabled={disabled}
      className={classNames.codeField}
      InputProps={{ className: classNames.codeFieldInputRoot }}
      placeholder={placeholder}
    />
  );
}
