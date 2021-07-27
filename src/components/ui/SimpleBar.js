import { Typography } from '@material-ui/core';
import React from 'react';

export default function SimpleBar({ title, children }) {
  return (
    <>
      <Typography variant="h4">title</Typography>
      {children}
      <hr />
    </>
  );
}
