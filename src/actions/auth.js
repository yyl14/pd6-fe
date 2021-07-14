import agent from './agent';
import {
  userConstants,
} from './constant';

export const userSignIn = (userId, password) => (dispatch) => {
  console.log('user signin function');
  console.log(userId);
  // Todo: encrypt password

  dispatch({
    type: userConstants.AUTH_START, payload: userId,
  });
  // agent.post('/signin', { userId: userId })
  // .then(res => {
  //   dispatch({
  //     type: userConstants.AUTH_SUCCESS,
  //     payload: res.data
  //   })
  // })
  // .catch(err => {
  //   dispatch({
  //     type: userConstants.AUTH_FAIL,
  //     errors: err
  //   })
  // })
};

export const userLogout = () => (dispatch) => {
  dispatch({
    type: userConstants.AUTH_LOGOUT,
  });
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
