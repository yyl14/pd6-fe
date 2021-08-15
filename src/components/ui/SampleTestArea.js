import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { CardHeader, Grid } from '@material-ui/core';
import AlignedText from './AlignedText';
import CopyToClipboardButton from './CopyToClipboardButton';

const useStyles = makeStyles({
  root: {
    width: '100%',
    height: 'auto',
  },
  cardContent: {
    '&:last-child': {
      padding: '22.5px 30px 5.5px',
    },
  },
  title: {
    display: 'flex',
    flexDirection: 'row',
    marginBottom: '18.5px',
    alignItems: 'center',
  },
  copyIcon: {
    marginLeft: '7.5px',
    transform: 'translate(0, -1px)',
  },
  content: {
    // margin: '10px',
    marginBottom: '18.5px',
    // marginLeft: '30px',
  },
});

export default function SampleTestArea({ input, output }) {
  const classes = useStyles();

  return (
    <>
      <Card className={classes.root} variant="outlined">
        <CardContent className={classes.cardContent}>
          <div>
            <div className={classes.title}>
              <Typography variant="h6">Input</Typography>
              <div className={classes.copyIcon}>
                <CopyToClipboardButton text={input} />
              </div>
            </div>
            <div className={classes.content}>
              <Typography variant="body1">{input}</Typography>
            </div>
          </div>
          <div>
            <div className={classes.title}>
              <Typography variant="h6">Output</Typography>
              <div className={classes.copyIcon}>
                <CopyToClipboardButton text={output} />
              </div>
            </div>
            <div className={classes.content}>
              <Typography variant="body1">{output}</Typography>
            </div>
          </div>
        </CardContent>
      </Card>
    </>
  );
}
