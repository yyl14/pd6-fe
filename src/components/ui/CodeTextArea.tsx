import { TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { GetDataContent } from '@/pages/ProblemInfo/components';
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


export default function CodeTextArea({ code_uuid, code_fileName}: {code_uuid: string | null; code_fileName: string | null}) {
  const className = useStyles();

  const code = GetDataContent(code_uuid, code_fileName);

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
