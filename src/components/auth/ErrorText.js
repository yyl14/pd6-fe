import React from 'react';
import { FormHelperText } from '@material-ui/core';
import { MdError } from 'react-icons/md';

export default function ErrorText({ children, className }) {
  return children ? (
    <div className={className}>
      <MdError />
      <caption>{children}</caption>
    </div>
  ) : (
    <></>
  );
}
