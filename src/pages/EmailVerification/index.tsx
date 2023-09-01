import { makeStyles } from '@material-ui/core';
import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

import PageTitle from '@/components/PageTitle';
import Icon from '@/components/icon';
import useVerifyEmail from '@/lib/email/useVerifyEmail';

const useStyles = makeStyles((theme) => ({
  wrapper: {
    width: '100%',
    height: '100vh',
  },
  topbar: {
    width: '100%',
    height: '55px',
    backgroundColor: theme.palette.primary.dark,
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

export default function EmailVerification({ verificationCode }: { verificationCode: string }) {
  const classes = useStyles();
  const history = useHistory();
  const [message, setMessage] = useState('Email Verifying...');
  const { emailVerification } = useVerifyEmail(verificationCode);

  useEffect(() => {
    (async () => {
      try {
        await emailVerification();
        setMessage('Email Verify Succeed.');
      } catch (err) {
        setMessage('Fail to verify Email.');
      } finally {
        setTimeout(() => {
          history.push('/login');
        }, 2000);
      }
    })();
  }, [history, emailVerification]);

  return (
    <div className={classes.wrapper}>
      <div className={classes.topbar} />
      <div className={classes.subwrapper}>
        <PageTitle text="Email Verification" />
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
