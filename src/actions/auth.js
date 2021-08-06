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

const editAccount = (token, id, userName, realName, nickName, email) => (dispatch) => {
  const auth = {
    headers: {
      'Auth-Token': token,
    },
  };
  dispatch({ type: userConstants.EDIT_SELF_ACCOUNT_REQUEST });

  agent.patch(`/account/${id}`, { nickName, alternative_email: email }, auth)
    .then((res) => {
      dispatch({
        type: userConstants.EDIT_SELF_ACCOUNT_SUCCESS,
        payload: {
          id,
          nickname: nickName,
          alternative_email: email,
        },
      });
    })
    .catch((err) => {
      dispatch({
        type: userConstants.EDIT_SELF_ACCOUNT_FAIL,
        error: err,
      });
    });
};

const makeStudentCardDefault = (token, id, cardId) => (dispatch) => {
  const auth = {
    headers: {
      'Auth-Token': token,
    },
  };
  dispatch({ type: userConstants.MAKE_SELF_STUDENT_CARD_DEFAULT_REQUEST });
  agent.put(`/account/${id}/default-student-card`, { student_card_id: cardId }, auth)
    .then((res) => {
      dispatch({
        type: userConstants.MAKE_SELF_STUDENT_CARD_DEFAULT_SUCCESS,
        payload: { cardId, id },
      });
    })
    .catch((err) => {
      dispatch({
        type: userConstants.MAKE_SELF_STUDENT_CARD_DEFAULT_FAIL,
        error: err,
      });
    });
};

const fetchStudentCard = (token, id) => (dispatch) => {
  const auth = {
    headers: {
      'Auth-Token': token,
    },
  };
  dispatch({ type: userConstants.GET_SELF_STUDENT_CARD_REQUEST });

  agent.get(`/account/${id}/student-card`, auth)
    .then((res) => {
      dispatch({
        type: userConstants.GET_SELF_STUDENT_CARD_SUCCESS,
        payload: res.data.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: userConstants.GET_SELF_STUDENT_CARD_FAIL,
        error: err,
      });
    });
};

const addStudentCard = (token, id, instituteId, emailPrefix, department, studentId) => (dispatch) => {
  const auth = {
    headers: {
      'Auth-Token': token,
    },
  };
  dispatch({ type: userConstants.ADD_SELF_STUDENT_CARD_REQUEST });

  agent.post(`/account/${id}/student-card`, {
    institute_id: instituteId,
    institute_email_prefix: emailPrefix,
    department,
    student_id: studentId,
  }, auth)
    .then((res) => {
      dispatch({ type: userConstants.ADD_SELF_STUDENT_CARD_SUCCESS });
    })
    .catch((err) => {
      dispatch({
        type: userConstants.ADD_SELF_STUDENT_CARD_FAIL,
        error: err,
      });
    });
};

const editPassword = (token, id, oldPassword, newPassword) => (dispatch) => {
  const auth = {
    headers: {
      'Auth-Token': token,
    },
  };
  dispatch({ type: userConstants.EDIT_SELF_PASSWORD_START });

  agent.put(`/account/${id}/pass_hash`, {
    old_password: oldPassword,
    new_password: newPassword,
  }, auth)
    .then((res) => {
      dispatch({ type: userConstants.EDIT_SELF_PASSWORD_SUCCESS });
    })
    .catch((err) => {
      dispatch({
        type: userConstants.EDIT_SELF_PASSWORD_FAIL,
        error: err,
      });
    });
};

export {
  getUserInfo, userSignIn, userLogout, userForgetPassword, editAccount, makeStudentCardDefault, fetchStudentCard, addStudentCard, editPassword,
};
