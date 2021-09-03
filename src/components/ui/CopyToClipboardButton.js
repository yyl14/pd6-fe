import React from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { IconButton } from '@material-ui/core';
import Icon from './icon/index';

export default function CopyToClipboardButton({ text, onClick, className }) {
  return (
    <CopyToClipboard text={text} onCopy={onClick}>
      <IconButton className={className}>
        <Icon.Copy />
      </IconButton>
    </CopyToClipboard>
  );
}
