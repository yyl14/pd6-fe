import React from 'react';
import { Typography } from '@material-ui/core';
import '../../styles/auth.css';

export default function Trademark() {
  return (
    <div className="auth-trademark">
      <span
        className="auth-trademark-main"
        style={{
          fontSize: '48px',
          lineHeight: '48px',
          fontFamily: 'Azonix',
        }}
      >
        PDOGS 6.0
      </span>
      <Typography className="auth-trademark-caption" variant="body1">
        Department of Information Management,
        <br />
        National Taiwan University
        <br />
        2021 All rights reserved.
      </Typography>
    </div>
  );
}
