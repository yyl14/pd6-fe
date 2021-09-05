import React, { useState, useEffect } from 'react';
import {
  makeStyles, Snackbar,
} from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useHistory } from 'react-router-dom';
import { emailVerification } from '../../actions/user/auth';
import GeneralLoading from '../../components/GeneralLoading';

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
    height: 'calc(100% - 55px)',
    padding: '50px 170px',
    // display: 'flex',
    // justifyContent: 'center',
    // alignItems: 'center',
    // flexWrap: 'wrap',
  },
  picContainer: {
    width: '350px',
    height: '350px',
    borderRadius: '50%',
    position: 'relative',
    top: '50px',
    left: 'calc(50% - 175px)',
    backgroundColor: theme.palette.grey.A500,
  },
  pic: {
    width: '350px',
    height: '350px',
    borderRadius: '50%',
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

export default function EmailVerification() {
  const dispatch = useDispatch();
  const classes = useStyles();
  const query = useQuery();
  const history = useHistory();
  const [showSnackbar, setShowSnackbar] = useState(false);
  const verifying = useSelector((state) => state.loading.user.auth.emailVerification);
  const verifyErr = useSelector((state) => state.error.user.auth.emailVerification);
  const verifyOver = useSelector((state) => state.auth.verificationDone);

  useEffect(() => {
    if (!verifyOver) {
      dispatch(emailVerification(query.get('code')));
    } else {
      setShowSnackbar(true);
      setTimeout(() => {
        setShowSnackbar(false);
        history.push('/');
      }, 3000);
    }
  }, [dispatch, query, verifyOver, verifyErr, history]);

  useEffect(() => {
    if (verifying) {
      return <GeneralLoading />;
    }

    return null;
  }, [verifying]);

  return (
    <div className={classes.wrapper}>
      <div className={classes.topbar} />
      <div className={classes.subwrapper}>
        {/* <div className={classes.picContainer}>
          <img src={} className={classes.pic} />
        </div> */}
        <div className={classes.picContainer} />
        <div className={classes.messageContainer}>
          <span>Email Verifying...</span>
        </div>
        <div className={classes.tipsContainer}>
          <span>Turning to login page in a few seconds.</span>
        </div>
      </div>
      <Snackbar
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        open={showSnackbar}
        onClose={() => setShowSnackbar(false)}
        message={verifyErr === null ? 'Email Verify Succeed.' : 'Fail to verify Email.'}
        key="verifyResult"
      />
    </div>
  );
}
