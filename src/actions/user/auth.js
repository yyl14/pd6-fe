import agent from '../agent';
import { authConstants } from './constants';

const getUserInfo = (id, token) => (dispatch) => {
  const auth = {
    headers: {
      'Auth-Token': token,
    },
  };

  agent
    .get(`/account/${id}`, auth)
    .then((userInfo) => {
      dispatch({
        type: authConstants.AUTH_SUCCESS,
        user: {
          ...userInfo.data.data,
          token,
        },
      });
    })
    .catch((err) => {
      dispatch({
        type: authConstants.AUTH_FAIL,
        errors: err,
      });
    });
};

const userSignIn = (username, password) => (dispatch) => {
  agent
    .post('/account/jwt', { username, password })
    .then((logRes) => {
      const id = logRes.data.data.account_id;
      const { token } = logRes.data.data;

      return { id, token };
    })
    .then(({ id, token }) => {
      const auth = {
        headers: {
          'Auth-Token': token,
        },
      };

      agent
        .get(`/account/${id}`, auth)
        .then((userInfo) => {
          dispatch({
            type: authConstants.AUTH_SUCCESS,
            user: {
              ...userInfo.data.data,
              token,
            },
          });
        })
        .catch((err) => {
          dispatch({
            type: authConstants.AUTH_FAIL,
            errors: err,
          });
        });
    })
    .catch((err) => {
      dispatch({
        type: authConstants.AUTH_FAIL,
        errors: err,
      });
    });
};

const userLogout = (history) => (dispatch) => {
  dispatch({
    type: authConstants.AUTH_LOGOUT,
  });

  history.push('/login');
};

const userForgetPassword = (email) => (dispatch) => {
  console.log('Forget Password');
  dispatch({
    type: authConstants.FORGET_PASSWORD_START,
  });
  agent.post('/forget-password', { email })
    .then((res) => {
      dispatch({
        type: authConstants.FORGET_PASSWORD_SUCCESS,
      });
    })
    .catch((err) => {
      dispatch({
        type: authConstants.FORGET_PASSWORD_FAIL,
        errors: err,
      });
    });
};

const userRegister = (username, password, nickname, realName, emailPrefix, instituteId, studentId, altMail) => (dispatch) => {
  const body = {
    username,
    password,
    nickname,
    real_name: realName,
    alternative_email: altMail,
    institute_id: instituteId,
    student_id: studentId,
    institute_email_prefix: emailPrefix,
  };

  dispatch({ type: authConstants.SIGNUP_START });
  agent.post('account', body)
    .then((res) => {
      dispatch({
        type: authConstants.SIGNUP_SUCCESS,
      });
    })
    .catch((err) => {
      dispatch({
        type: authConstants.SIGNUP_FAIL,
        errors: err,
      });
    });
};

export {
  getUserInfo, userSignIn, userLogout, userForgetPassword, userRegister,
};
