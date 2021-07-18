import React from 'react';
import { FormHelperText, Typography } from '@material-ui/core';
import { MdError } from 'react-icons/md';

export default function ErrorText({ children, className }) {
  console.log(className);
  return (
    children && (
      <div className={className} style={{ position: 'absolute', transform: 'translate(2px, 38px)' }}>
        <MdError style={{ fontSize: '0.9rem', transform: 'translate(0px, 1px)' }} />
        <Typography variant="body2">{children}</Typography>
      </div>
    )
  );
}
