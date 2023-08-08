import { makeStyles } from '@material-ui/core';
import { useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import useQuery from '@/hooks/useQuery';

import { downloadFile } from '../../../actions/common/common';
import Icon from '../../ui/icon';

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

export default function FileDownloading() {
  const dispatch = useDispatch();
  const classes = useStyles();
  const query = useQuery();
  const history = useHistory();
  const authToken = useSelector((state) => state.auth.token);
  const [message, setMessage] = useState('File Downloading...');
  const [tip, setTip] = useState('');
  const filename = useMemo(() => query.get('filename'), [query]);
  const uuid = useMemo(() => query.get('uuid'), [query]);
  const [downloading, setDownloading] = useState(false);

  const onSuccess = () => {
    setMessage('File Download Succeed.');
    setTip('Closing this page in a few seconds.');
    setTimeout(() => {
      window.close();
    }, 3000);
  };

  const onError = () => {
    setMessage('Fail to Download File.');
    setTip('Turning to main page in a few seconds.');
    setTimeout(() => {
      history.push('/');
    }, 3000);
  };

  if (filename === null || uuid === null || authToken === '') {
    history.push('/');
  }

  if (!downloading) {
    dispatch(downloadFile(authToken, { filename, as_attachment: true, uuid }, onSuccess, onError));
    setDownloading(true);
  }

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
}
