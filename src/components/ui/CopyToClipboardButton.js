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

export default function CopyToClipboardButton({
  text, onClick,
}) {
  return (
    <CopyToClipboard
      text={text}
      onCopy={onClick}
    >
      <Icon icon={bxCopy} style={{ fontSize: '25px' }} />
    </CopyToClipboard>
  );
}
