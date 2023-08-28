import { IconButton, Portal, Snackbar } from '@material-ui/core';
import { useState } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';

import Icon from './icon/index';

export default function CopyToClipboardButton({ text, onClick = null, className = null, format = 'text/plain' }) {
  const [showSnackbar, setShowSnackbar] = useState(false);

  const handleCopy = () => {
    if (onClick !== null) {
      onClick();
    }
    setShowSnackbar(true);
  };

  return (
    <>
      <CopyToClipboard text={text} onCopy={handleCopy} options={{ format }}>
        <IconButton className={className}>
          <Icon.Copy />
        </IconButton>
      </CopyToClipboard>
      <Portal>
        <Snackbar
          open={showSnackbar}
          autoHideDuration={1000}
          onClose={() => {
            setShowSnackbar(false);
          }}
          message="Copied to clipboard"
        />
      </Portal>
    </>
  );
}
