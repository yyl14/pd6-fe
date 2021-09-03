import agent from '../agent';
import { userConstants } from './constants';

const editAccount = (token, id, userName, realName, nickName, email) => (dispatch) => {
  const auth = {
    headers: {
      'Auth-Token': token,
    },
  };
  dispatch({ type: userConstants.EDIT_SELF_ACCOUNT_START });

  agent.patch(`/account/${id}`, { nickname: nickName, alternative_email: email }, auth)
    .then(() => {
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
  dispatch({ type: userConstants.MAKE_SELF_STUDENT_CARD_DEFAULT_START });
  agent.put(`/account/${id}/default-student-card`, { student_card_id: cardId }, auth)
    .then(() => {
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
  dispatch({ type: userConstants.GET_SELF_STUDENT_CARD_START });

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
  dispatch({ type: userConstants.ADD_SELF_STUDENT_CARD_START });

  agent.post(`/account/${id}/student-card`, {
    institute_id: instituteId,
    institute_email_prefix: emailPrefix,
    student_id: studentId,
  }, auth)
    .then(() => {
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
    .then(() => {
      dispatch({ type: userConstants.EDIT_SELF_PASSWORD_SUCCESS });
    })
    .catch((err) => {
      dispatch({
        type: userConstants.EDIT_SELF_PASSWORD_FAIL,
        error: err,
      });
    });
};

const userGetNotify = (authToken) => async (dispatch) => {
  const config = {
    headers: {
      'Auth-Token': authToken,
    },
  };

  try {
    const notifyRes = await agent.get('/announcement', config);
    dispatch({
      type: userConstants.USER_GET_NOTIFY,
      payload: notifyRes.data.data.data,
    });
  } catch (err) {
    dispatch({
      type: userConstants.USER_GET_NOTIFY_FAIL,
      error: err,
    });
  }
};

const userReadNotify = (authToken, notifyId) => async (dispatch) => {
  const config = {
    headers: {
      'Auth-Token': authToken,
    },
  };

  try {
    const notifyReadRes = await agent.get(`/announcement/${notifyId}`, config);
    const notifyRes = await agent.get('/announcement', config);
    dispatch({
      type: userConstants.USER_GET_NOTIFY,
      payload: notifyRes.data.data.data,
    });
    // console.log(notifyRes.data);
  } catch (err) {
    dispatch({
      type: userConstants.USER_READ_NOTIFY_FAIL,
      error: err,
    });
  }
};

export {
  editAccount,
  makeStudentCardDefault,
  fetchStudentCard,
  addStudentCard,
  editPassword,
  userGetNotify,
  userReadNotify,
};
