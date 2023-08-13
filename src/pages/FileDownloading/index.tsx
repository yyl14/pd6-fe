import { makeStyles } from '@material-ui/core';
import { useEffect, useMemo, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

import useQuery from '@/hooks/useQuery';

import Icon from '@/components/ui/icon';
import useS3File from '@/lib/s3File/useS3File';
import useAuthToken from '@/lib/user/useAuthToken';

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

const FileDownloading = () => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const query = useQuery();
  const history = useHistory();
  const authToken = useAuthToken();
  const S3FileData = useS3File();
  const [message, setMessage] = useState<string>('File Downloading...');
  const [tip, setTip] = useState<string>('');
  const filename = useMemo(() => query.get('filename'), [query]);
  const uuid = useMemo(() => query.get('uuid'), [query]);
  const [downloading, setDownloading] = useState<boolean>(false);

  useEffect(() => {
    if (filename === null || uuid === null || authToken === '') {
      history.push('/');
      return;
    }

    if (!downloading) {
      S3FileData.downloadFile(filename, uuid);
      setDownloading(true);
    }

    if (downloading) {
      setMessage('File Download Succeed.');
      setTip('Closing this page in a few seconds.');
      setTimeout(() => {
        window.close();
      }, 3000);
    } else {
      setMessage('Fail to Download File.');
      setTip('Turning to the main page in a few seconds.');
      setTimeout(() => {
        history.push('/');
      }, 3000);
    }
  }, [authToken, dispatch, downloading, filename, history, uuid, S3FileData]);

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
