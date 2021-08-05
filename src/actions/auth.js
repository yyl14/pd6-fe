import agent from './agent';
import { userConstants } from './constant';

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
        type: userConstants.AUTH_SUCCESS,
        user: {
          ...userInfo.data.data,
          token,
        },
      });
    })
    .catch((err) => {
      dispatch({
        type: userConstants.AUTH_FAIL,
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
            type: userConstants.AUTH_SUCCESS,
            user: {
              ...userInfo.data.data,
              token,
            },
          });
        })
        .catch((err) => {
          dispatch({
            type: userConstants.AUTH_FAIL,
            errors: err,
          });
        });
    })
    .catch((err) => {
      dispatch({
        type: userConstants.AUTH_FAIL,
        errors: err,
      });
    });
};

const userLogout = (history) => (dispatch) => {
  dispatch({
    type: userConstants.AUTH_LOGOUT,
  });

  history.push('/login');
};

const userForgetPassword = (email) => (dispatch) => {
  console.log('Forget Password');
  dispatch({
    type: userConstants.FORGET_PASSWORD_START,
  });
  agent.post('/forget-password', { email })
    .then((res) => {
      dispatch({
        type: userConstants.FORGET_PASSWORD_SUCCESS,
      });
    })
    .catch((err) => {
      dispatch({
        type: userConstants.FORGET_PASSWORD_FAIL,
        errors: err,
      });
    });
};

const userRegister = () => (dispatch) => {
  console.log('Register');
  agent.post('');
};

export {
  getUserInfo, userSignIn, userLogout, userForgetPassword,
};
