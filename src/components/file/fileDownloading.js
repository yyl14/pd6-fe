import React, {
  useState, useMemo,
} from 'react';
import { makeStyles } from '@material-ui/core';
import { useSelector, useDispatch } from 'react-redux';
import { useLocation, useHistory } from 'react-router-dom';
import { downloadFile } from '../../actions/common/common';

const useStyles = makeStyles((theme) => ({
  picContainer: {
    width: '350px',
    height: '200px',
    borderRadius: '50%',
    position: 'relative',
    top: '50px',
    left: 'calc(50% - 175px)',
    backgroundColor: theme.palette.grey.A500,
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

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

export default function FileDownloading() {
  const dispatch = useDispatch();
  const classes = useStyles();
  const query = useQuery();
  const history = useHistory();
  const authToken = useSelector((state) => state.auth.token);
  const [message, setMessage] = useState('File Downloading...');
  const filename = useMemo(() => query.get('filename'), [query]);
  const uuid = useMemo(() => query.get('uuid'), [query]);
  const [downloading, setDownloading] = useState(false);

  const onSuccess = () => {
    setMessage('File Download Succeed.');
    setTimeout(() => {
      history.push('/');
    }, 3000);
  };

  const onError = () => {
    setMessage('Fail to Download File.');
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
    <>
      <div className={classes.picContainer} />
      <div className={classes.messageContainer}>
        <span>{message}</span>
      </div>
      <div className={classes.tipsContainer}>
        <span>Turning to main page in a few seconds.</span>
      </div>
    </>
  );
}
