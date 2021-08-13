import React, { useState, useEffect } from 'react';
import { docco } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { TextField } from '@material-ui/core';
import { PrismLight as SyntaxHighlighter } from 'react-syntax-highlighter';
import prism from 'react-syntax-highlighter/dist/esm/styles/prism/prism';

const useStyles = makeStyles({
  root: {
    width: '1091px',
  },
});

export default function CodeArea(
  codeString,
) {
  const classes = useStyles();
  return (
    <TextField
      className={classes.root}
      multiline
      rows={15}
    >
      <SyntaxHighlighter language={['python', 'cpp', 'c']} style={docco}>
        {codeString}
      </SyntaxHighlighter>
    </TextField>

  );
}
