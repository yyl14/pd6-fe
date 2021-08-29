import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { IconButton } from '@material-ui/core';
import AlignedText from './AlignedText';
import Icon from './icon/index';

export default function CopyToClipboardButton({ text, onClick }) {
  return (
    <CopyToClipboard text={text} onCopy={onClick}>
      <IconButton>
        <Icon.Copy />
      </IconButton>
    </CopyToClipboard>
  );
}
