import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { Icon, InlineIcon } from '@iconify/react';
import bxCopy from '@iconify/icons-bx/bx-copy';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { CardHeader, Grid } from '@material-ui/core';
import AlignedText from './AlignedText';
import CopyToClipboardButton from './CopyToClipboardButton';

const useStyles = makeStyles({
  root: {
    width: '100%',
    height: 'auto',
  },
  title: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: '22.5px',
    marginLeft: '30px',
  },
  copyIcon: {
    marginLeft: '7.5px',
  },
  content: {
    margin: '10px',
    marginTop: '18.5px',
    marginLeft: '30px',
  },
});

export default function SampleTestArea({
  input, output,
}) {
  const classes = useStyles();

  return (
    <>
      <Card className={classes.root}>
        <CardContent>
          <div className={classes.title}>
            <h2>Input</h2>
            <div className={classes.copyIcon}>
              <CopyToClipboardButton text={input} />
            </div>
          </div>
          <div className={classes.content}>
            <Typography variant="body1">
              {input}
            </Typography>
          </div>
          <div className={classes.title}>
            <h2>Output</h2>
            <div className={classes.copyIcon}>
              <CopyToClipboardButton text={output} />
            </div>
          </div>
          <div className={classes.content}>
            <Typography variant="body1">
              {output}
            </Typography>
          </div>
        </CardContent>
      </Card>
    </>
  );
}
