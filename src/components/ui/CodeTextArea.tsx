import { TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import useS3FileContent from '@/lib/s3File/useS3FileContent';

import CopyToClipboardButton from './CopyToClipboardButton';

const useStyles = makeStyles({
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
  },
});

export default function CodeTextArea({
  codeUuid,
  codeFileName,
}: {
  codeUuid: string | null;
  codeFileName: string | null;
}) {
  const className = useStyles();

  const { fileContent: code } = useS3FileContent(codeUuid, codeFileName);

  return (
    <div className={className.codeContent}>
      <div className={className.buttonWrapper}>
        <CopyToClipboardButton className={className.copyIcon} text={code} />
      </div>
      <TextField
        value={code}
        multiline
        minRows={15}
        disabled
        className={className.codeField}
        InputProps={{ className: className.codeFieldInputRoot }}
      />
    </div>
  );
}
