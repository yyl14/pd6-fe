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
import AlignedText from './AlignedText';
import CopyToClipboardButton from './CopyToClipboardButton';

const useStyles = makeStyles({
  root: {
    width: 584,
    height: 198,
  },
});

export default function SampleTestArea({
  input, output,
}) {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardContent>
          <CopyToClipboardButton text={input} />
          <Typography variant="body1">
            {input}
            input test data
          </Typography>
          <AlignedText text="Output" childrenType="text">
            <CopyToClipboardButton text={output} />
          </AlignedText>
          <Typography variant="body1">
            {output}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
