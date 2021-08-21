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
    const userClasses = await agent.get(`/account/${id}/class`, auth);
    const getClassDetail = async () => {
      const classDetail = [];
      for (let i = 0; i < userClasses.data.data.length; i += 1) {
        const classId = userClasses.data.data[i].class_id;
        // eslint-disable-next-line no-await-in-loop
        const classInfo = await agent.get(`/class/${classId}`, auth);
        classDetail.push(userClasses.data.data[i]);
        classDetail[i].class_name = classInfo.data.data.name;
        classDetail[i].course_id = classInfo.data.data.course_id;
        // eslint-disable-next-line no-await-in-loop
        const courseInfo = await agent.get(`/course/${classInfo.data.data.course_id}`, auth);
        classDetail[i].course_name = courseInfo.data.data.name;
        // console.log(classDetail);
      }
      return classDetail;
    };

    const userClassesInfo = await getClassDetail();

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
      errors: err,
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
    const userClasses = await agent.get(`/account/${id}/class`, auth);
    dispatch({
      type: authConstants.AUTH_SUCCESS,
      user: {
        token,
        ...userInfo.data.data,
        classes: userClasses.data.data,
      },
    });
  } catch (err) {
    dispatch({
      type: authConstants.AUTH_FAIL,
      errors: err,
    });
  }
};

const userLogout = (history) => (dispatch) => {
  dispatch({
    type: authConstants.AUTH_LOGOUT,
  });

  history.push('/login');
};

const userForgetPassword = (email) => (dispatch) => {
  dispatch({
    type: authConstants.FORGET_PASSWORD_START,
  });
  agent
    .post('/account/forget-password', { email })
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
  agent
    .post('account', body)
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
