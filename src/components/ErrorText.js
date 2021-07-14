import React from 'react';
import { FormHelperText, Typography } from '@material-ui/core';
import { MdError } from 'react-icons/md';

export default function ErrorText({ children, className }) {
  return children ? (
    <div className={className}>
      <MdError style={{ fontSize: '0.8rem', transform: 'translate(0px, -1px) ' }} />
      <Typography variant="body2">{children}</Typography>
    </div>
  ) : (
    <></>
  );
}
