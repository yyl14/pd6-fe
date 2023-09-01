import { TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import CopyToClipboardButton from './CopyToClipboardButton';

const useStyles = makeStyles(() => ({
  codeContent: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-end',
  },
  buttonWrapper: {
    height: 0,
    width: 0,
  },
  codeField: {
    width: '100%',
  },
  codeFieldInputRoot: {
    fontFamily: 'Noto Sans Mono',
    fontWeight: 300,
  },
  copyIcon: {
    transform: 'translate(-50px, 20px)',
    zIndex: '1000',
  },
}));

export default function CodeArea({ value }) {
  const classNames = useStyles();
  return (
    <div className={classNames.codeContent}>
      <div className={classNames.buttonWrapper}>
        <CopyToClipboardButton className={classNames.copyIcon} text={value} />
      </div>
      <TextField
        value={value}
        multiline
        minRows={15}
        disabled
        className={classNames.codeField}
        InputProps={{ className: classNames.codeFieldInputRoot }}
      />
    </div>
  );
}
