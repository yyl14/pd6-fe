import React from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { IconButton } from '@material-ui/core';
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
