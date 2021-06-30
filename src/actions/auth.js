import agent from './agent';

import {} from './constant';

export const userSignIn = () => (dispatch) => {
  // agent.post('/signin', { userId: user_id })
  // .then(res => {
  //   dispatch({
  //     type: GET_SELF_USER_INFO,
  //     user: res.data
  //   })
  // })
  // .catch(err => {
  //   dispatch({
  //     type: API_CALL_ERROR,
  //     errors: err
  //   })
  // })
};

export const userLogout = () => (dispatch) => {};
