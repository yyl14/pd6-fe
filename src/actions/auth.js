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

const editAccount = (token, id, userName, realName, nickName, email) => (dispatch) => {
  const auth = {
    headers: {
      'Auth-Token': token,
    },
  };
  dispatch({ type: userConstants.EDIT_SELF_ACCOUNT_REQUEST });

  agent.patch(`/account/${id}`, { nickname: nickName, alternative_email: email }, auth)
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

const addStudentCard = (token, id, instituteId, emailPrefix, studentId) => (dispatch) => {
  const auth = {
    headers: {
      'Auth-Token': token,
    },
  };
  dispatch({ type: userConstants.ADD_SELF_STUDENT_CARD_REQUEST });

  agent.post(`/account/${id}/student-card`, {
    institute_id: instituteId,
    institute_email_prefix: emailPrefix,
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
  getUserInfo, editAccount, makeStudentCardDefault, fetchStudentCard, addStudentCard, editPassword,
};
