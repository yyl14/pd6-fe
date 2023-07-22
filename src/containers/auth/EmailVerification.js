import { makeStyles } from '@material-ui/core';
import { useEffect, useMemo, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { emailVerification } from '../../actions/user/auth';
import Icon from '../../components/ui/icon';
import useQuery from '../../hooks/useQuery';

const useStyles = makeStyles((theme) => ({
  wrapper: {
    width: '100%',
    height: '100vh',
  },
  topbar: {
    width: '100%',
    height: '55px',
    backgroundColor: theme.palette.black.main,
  },
  subwrapper: {
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

export default function EmailVerification() {
  const dispatch = useDispatch();
  const classes = useStyles();
  const query = useQuery();
  const history = useHistory();
  const [message, setMessage] = useState('Email Verifying...');
  const queryString = useMemo(() => query.get('code'), [query]);

  useEffect(() => {
    const onSuccess = () => {
      setMessage('Email Verify Succeed.');
      setTimeout(() => {
        history.push('/login');
      }, 3000);
    };

    const onError = () => {
      setMessage('Fail to verify Email.');
      setTimeout(() => {
        history.push('/login');
      }, 3000);
    };

    dispatch(emailVerification(queryString, onSuccess, onError));
  }, [dispatch, history, queryString]);

  return (
    <div className={classes.wrapper}>
      <div className={classes.topbar} />
      <div className={classes.subwrapper}>
        <Icon.Logo fill="#000" stroke="#000" style={{ width: '18vw' }} className={classes.picContainer} />
        <div className={classes.messageContainer}>
          <span>{message}</span>
        </div>
        <div className={classes.tipsContainer}>
          <span>Turning to login page in a few seconds.</span>
        </div>
      </div>
    </div>
  );
}
