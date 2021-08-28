import agent from '../agent';
import { authConstants } from './constants';

const getUserInfo = (id, token) => async (dispatch) => {
  try {
    const auth = {
      headers: {
        'Auth-Token': token,
      },
    };
    const userInfo = await agent.get(`/account/${id}`, auth);
    const userClassesRes = await agent.get(`/account/${id}/class`, auth);
    const userClassesInfo = userClassesRes.data.data;
    // console.log(userClasses);
    // const userClassesInfo = await Promise.all(
    //   userClasses.map(async (item) => agent
    //     .get(`/class/${item.class_id}`, auth)
    //     .then(({ data: { data } }) => ({ ...item, class_name: data.name, course_id: data.course_id }))
    //     .catch((error) => dispatch({
    //       type: authConstants.AUTH_FAIL,
    //       error,
    //     }))),
    // );

    dispatch({
      type: authConstants.AUTH_SUCCESS,
      user: {
        token,
        ...userInfo.data.data,
        classes: userClassesInfo,
      },
    });
  } catch (err) {
    dispatch({
      type: authConstants.AUTH_FAIL,
      error: err,
    });
  }
};

const userSignIn = (username, password) => async (dispatch) => {
  try {
    const logRes = await agent.post('/account/jwt', { username, password });
    const id = logRes.data.data.account_id;
    const { token } = logRes.data.data;
    const auth = {
      headers: {
        'Auth-Token': token,
      },
    };
    const userInfo = await agent.get(`/account/${id}`, auth);
    const userClassesRes = await agent.get(`/account/${id}/class`, auth);
    const userClasses = userClassesRes.data.data;
    const userClassesInfo = await Promise.all(
      userClasses.map(async (item) => agent
        .get(`/class/${item.class_id}`, auth)
        .then(({ data: { data } }) => ({ ...item, class_name: data.name, course_id: data.course_id }))
        .catch((error) => dispatch({
          type: authConstants.AUTH_FAIL,
          error,
        }))),
    );

    dispatch({
      type: authConstants.AUTH_SUCCESS,
      user: {
        token,
        ...userInfo.data.data,
        classes: userClassesInfo,
      },
    });
  } catch (err) {
    dispatch({
      type: authConstants.AUTH_FAIL,
      error: err,
    });
  }
};

const userLogout = (history) => (dispatch) => {
  dispatch({
    type: authConstants.AUTH_LOGOUT,
  });

  history.push('/login');
};

const userForgetPassword = (email) => async (dispatch) => {
  try {
    dispatch({
      type: authConstants.FORGET_PASSWORD_START,
    });
    const res = await agent.post('/account/forget-password', { email });
    if (res.data.success) {
      dispatch({
        type: authConstants.FORGET_PASSWORD_SUCCESS,
      });
    } else {
      dispatch({
        type: authConstants.FORGET_PASSWORD_FAIL,
        errors: res.data.error,
      });
    }
  } catch (err) {
    dispatch({
      type: authConstants.FORGET_PASSWORD_FAIL,
      errors: err,
    });
  }
};

const userRegister = (username, password, nickname, realName, emailPrefix, instituteId, studentId) => async (dispatch) => {
  dispatch({ type: authConstants.SIGNUP_START });
  const body = {
    username,
    password,
    nickname,
    real_name: realName,
    alternative_email: null,
    institute_id: instituteId,
    student_id: studentId,
    institute_email_prefix: emailPrefix,
  };
  try {
    const res = await agent.post('account', body);
    if (res.data.success) {
      dispatch({ type: authConstants.SIGNUP_SUCCESS });
    } else {
      dispatch({
        type: authConstants.SIGNUP_FAIL,
        error: res.data.error,
      });
    }
  } catch (err) {
    dispatch({
      type: authConstants.SIGNUP_FAIL,
      error: err,
    });
  }
};

export {
  getUserInfo, userSignIn, userLogout, userForgetPassword, userRegister,
};
