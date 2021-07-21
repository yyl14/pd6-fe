import agent from './agent';
import {
  userConstants,
} from './constant';

const getUserInfo = (id, token) => (dispatch) => {
  const header = {
    header: {
      Authorization: `Bearer ${token}`,
    },
  };

  agent.get(`/account/${id}`, header)
    .then((userInfo) => {
      console.log(userInfo);
      // dispatch({
      //   type: userConstants.AUTH_SUCCESS,
      //   user: {
      //     ...userInfo.data,
      //     token,
      //   },
      // });
    })
    .catch((err) => {
      dispatch({
        type: userConstants.AUTH_FAIL,
        errors: err,
      });
    });
};

const userSignIn = (username, password) => (dispatch) => {
  const header = {
    header: {
      'Content-Type': 'application/json',
    },
  };

  agent.post('/account/jwt', { username, password }, header)
    .then((logRes) => {
      const id = logRes.data.data.account_id;
      const { token } = logRes.data.data;
      console.log(id, token);
      return { id, token };
    })
    .then((id, token) => {
      const auth = {
        header: {
          Authorization: `Bearer ${token}`,
        },
      };

      agent.get(`/account/${id}`, header)
        .then((userInfo) => {
          console.log(userInfo);
          // dispatch({
          //   type: userConstants.AUTH_SUCCESS,
          //   user: {
          //     ...userInfo.data,
          //     token,
          //   },
          // });
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
    type: userConstants.FORGET_PASSWORD_REQUEST,
  });
  // agent.post('/forget_password', { email: email })
  // .then(res => {
  //   dispatch({
  //     type: userConstants.FORGET_PASSWORD_SUCCESS,
  //   })
  // })
  // .catch(err => {
  //   dispatch({
  //     type: userConstants.FORGET_PASSWORD_FAIL,
  //     errors: err
  //   })
  // })
};

export {
  getUserInfo,
  userSignIn,
  userLogout,
  userForgetPassword,
};
