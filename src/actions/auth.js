import agent from './agent';
import {
  userConstants,
} from './constant';

export const getUserInfo = async (token) => async (dispatch) => {
  try {
    const header = {
      header: {
        Authorization: `Barear ${token}`,
      },
    };

    const userIdRes = await agent.get('/account/my-id', header);
    const userInfo = await agent.get(`/account/${userIdRes.data}`, header);

    dispatch({
      type: userConstants.AUTH_SUCCESS,
      user: {
        ...userInfo.data,
        token,
      },
    });
  } catch (err) {
    dispatch({
      type: userConstants.AUTH_FAIL,
      errors: err,
    });
  }
  const header = {
    header: {
      Authorization: `Barear ${token}`,
    },
  };
};

export const userSignIn = async (name, password) => async (dispatch) => {
  try {
    dispatch({
      type: userConstants.AUTH_START,
      user: {},
    });

    const logRes = await agent.post('/account/jwt', { name, password }); // public api, thus no need to apply token in header
    const userToken = logRes.data.data;

    getUserInfo();
  } catch (err) {
    dispatch({
      type: userConstants.AUTH_FAIL,
      errors: err,
    });
  }
};

export const userLogout = (history) => (dispatch) => {
  dispatch({
    type: userConstants.AUTH_LOGOUT,
  });

  history.push('/login');
};

export const userForgetPassword = (email) => (dispatch) => {
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
