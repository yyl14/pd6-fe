import { makeStyles } from '@material-ui/core';
import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

import Icon from '@/components/ui/icon';
import useS3FileDownload from '@/lib/s3File/useS3FileDownload';

const useStyles = makeStyles((theme) => ({
  wrapper: {
    width: '100%',
    padding: '50px 170px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
  },
  picContainer: {
    height: '350px',
    position: 'relative',
    top: '50px',
  },
  messageContainer: {
    width: '100%',
    height: '65px',
    lineHeight: '65px',
    textAlign: 'center',
    position: 'relative',
    top: '80px',
    '& span': theme.typography.h3,
  },
  tipsContainer: {
    width: '100%',
    height: '19px',
    lineHeight: '19px',
    textAlign: 'center',
    position: 'relative',
    top: '110px',
    '& span': {
      fontSize: '14px',
      fontFamily: 'Noto Sans',
      fontWeight: 300,
    },
  },
}));

interface FileDownloadingProps {
  filename: string;
  uuid: string;
}

const FileDownloading = ({ filename, uuid }: FileDownloadingProps) => {
  const classes = useStyles();
  const history = useHistory();

  const { downloadFile } = useS3FileDownload();
  const [message, setMessage] = useState<string>('File Downloading...');
  const [tip, setTip] = useState<string>('');

  useEffect(() => {
    const handleDownloadFile = async () => {
      try {
        await downloadFile({ fileName: filename, file_uuid: uuid });
        setMessage('File Download Succeed.');
      } catch (e) {
        setMessage('Fail to Download File.');
      } finally {
        setTip('Turning to the main page in a few seconds.');
        setTimeout(() => {
          history.push('/');
        }, 3000);
      }
    };
    handleDownloadFile();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filename, uuid, history]);

  return (
    <div className={classes.wrapper}>
      <Icon.Logo fill="#000" stroke="#000" style={{ width: '18vw' }} className={classes.picContainer} />
      <div className={classes.messageContainer}>
        <span>{message}</span>
      </div>
      <div className={classes.tipsContainer}>
        <span>{tip}</span>
      </div>
    </div>
  );
};

export default FileDownloading;
