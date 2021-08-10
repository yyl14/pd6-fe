import agent from '../agent';
import {
  accountConstants,
} from './constants';

const getInstitutes = (token) => (dispatch) => {
  const auth = {
    headers: {
      'Auth-Token': token,
    },
  };
  dispatch({ type: accountConstants.FETCH_INSTITUTES_REQUEST });

  agent.get('/institute', auth)
    .then((res) => {
      dispatch({
        type: accountConstants.FETCH_INSTITUTES_SUCCESS,
        payload: res.data.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: accountConstants.FETCH_INSTITUTES_FAIL,
        error: err,
      });
    });
};

const getInstitute = (token, instituteId) => (dispatch) => {
  const auth = {
    headers: {
      'Auth-Token': token,
    },
  };
  dispatch({ type: accountConstants.FETCH_INSTITUTE_REQUEST });

  agent.get(`/institute/${instituteId}`, auth)
    .then((res) => {
      dispatch({
        type: accountConstants.FETCH_INSTITUTE_SUCCESS,
        payload: res.data.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: accountConstants.FETCH_INSTITUTE_FAIL,
        error: err,
      });
    });
};

const addInstitute = (token, abbreviatedName, fullName, emailDomain, isDisabled) => (dispatch) => {
  const auth = {
    headers: {
      'Auth-Token': token,
    },
  };
  dispatch({ type: accountConstants.ADD_INSTITUTE_REQUEST });

  agent.post('/institute', {
    abbreviated_name: abbreviatedName,
    full_name: fullName,
    email_domain: emailDomain,
    is_disabled: isDisabled,
  }, auth)
    .then((res) => {
      dispatch({
        type: accountConstants.ADD_INSTITUTE_SUCCESS,
        payload: {
          id: res.data.data.id, abbreviated_name: abbreviatedName, full_name: fullName, email_domain: emailDomain, is_disabled: isDisabled,
        },
      });
    })
    .catch((err) => {
      dispatch({
        type: accountConstants.ADD_INSTITUTE_FAIL,
        error: err,
      });
    });
};

const editInstitute = (token, id, abbreviatedName, fullName, emailDomain, isDisabled) => (dispatch) => {
  const auth = {
    headers: {
      'Auth-Token': token,
    },
  };
  dispatch({ type: accountConstants.EDIT_INSTITUTE_REQUEST });
  const body = {
    abbreviated_name: abbreviatedName,
    full_name: fullName,
    email_domain: emailDomain,
    is_disabled: isDisabled,
  };

  agent.patch(`/institute/${id}`, body, auth)
    .then((res) => {
      console.log('editing institute suc');
      dispatch({
        type: accountConstants.EDIT_INSTITUTE_SUCCESS,
        payload: {
          id: parseInt(id, 10),
          abbreviated_name: abbreviatedName,
          full_name: fullName,
          email_domain: emailDomain,
          is_disabled: isDisabled,
        },
      });
    })
    .catch((err) => {
      console.log('editing institute fail');
      dispatch({
        type: accountConstants.EDIT_INSTITUTE_FAIL,
        error: err,
      });
    });
};

const fetchAccount = (token, id) => (dispatch) => {
  const auth = {
    headers: {
      'Auth-Token': token,
    },
  };
  dispatch({ type: accountConstants.FETCH_ACCOUNT_REQUEST });

  agent.get(`/account/${id}`, auth)
    .then((res) => {
      dispatch({
        type: accountConstants.FETCH_ACCOUNT_SUCCESS,
        payload: res.data.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: accountConstants.FETCH_ACCOUNT_FAIL,
        error: err,
      });
    });
};

const editAccount = (token, id, userName, realName, nickName, email) => (dispatch) => {
  const auth = {
    headers: {
      'Auth-Token': token,
    },
  };
  dispatch({ type: accountConstants.EDIT_ACCOUNT_REQUEST });

  const body = {
    username: userName,
    real_name: realName,
    nickname: nickName,
    alternative_email: email,
  };

  agent.patch(`/account/${id}`, { real_name: realName, nickname: nickName, alternative_email: email }, auth)
    .then((res) => {
      dispatch({
        type: accountConstants.EDIT_ACCOUNT_SUCCESS,
        payload: {
          id,
          real_name: realName,
          nickname: nickName,
          alternative_email: email,
        },
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: accountConstants.EDIT_ACCOUNT_FAIL,
        error: err,
      });
    });
};

const deleteAccount = (token, id) => (dispatch) => {
  const auth = {
    headers: {
      'Auth-Token': token,
    },
  };
  dispatch({ type: accountConstants.DELETE_ACCOUNT_REQUEST });
  agent.delete(`/account/${id}`, auth)
    .then((res) => {
      dispatch({
        type: accountConstants.DELETE_ACCOUNT_SUCCESS,
        payload: { id },
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: accountConstants.DELETE_ACCOUNT_FAIL,
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
  dispatch({ type: accountConstants.MAKE_STUDENT_CARD_DEFAULT_REQUEST });
  agent.put(`/account/${id}/default-student-card`, { student_card_id: cardId }, auth)
    .then((res) => {
      dispatch({
        type: accountConstants.MAKE_STUDENT_CARD_DEFAULT_SUCCESS,
        payload: { cardId, id },
      });
    })
    .catch((err) => {
      dispatch({
        type: accountConstants.MAKE_STUDENT_CARD_DEFAULT_FAIL,
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
  dispatch({ type: accountConstants.FETCH_STUDENT_CARD_REQUEST });

  agent.get(`/account/${id}/student-card`, auth)
    .then((res) => {
      dispatch({
        type: accountConstants.FETCH_STUDENT_CARD_SUCCESS,
        payload: { id, data: res.data.data },
      });
    })
    .catch((err) => {
      dispatch({
        type: accountConstants.FETCH_STUDENT_CARD_FAIL,
        payload: id,
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
  dispatch({ type: accountConstants.ADD_STUDENT_CARD_REQUEST });
  agent.post(`/account/${id}/student-card`, {
    institute_id: instituteId,
    institute_email_prefix: emailPrefix,
    student_id: studentId,
  }, auth)
    .then((res) => {
      dispatch({ type: accountConstants.ADD_STUDENT_CARD_SUCCESS });
    })
    .catch((err) => {
      dispatch({
        type: accountConstants.ADD_STUDENT_CARD_FAIL,
        error: err,
      });
    });
};

const editPassword = (token, id, newPassword) => (dispatch) => {
  const auth = {
    headers: {
      'Auth-Token': token,
    },
  };
  dispatch({ type: accountConstants.EDIT_PASSWORD_REQUEST });
  agent.put(`/account/${id}/pass_hash`, {
    new_password: newPassword,
  }, auth)
    .then((res) => {
      dispatch({ type: accountConstants.EDIT_PASSWORD_SUCCESS });
    })
    .catch((err) => {
      dispatch({
        type: accountConstants.EDIT_PASSWORD_FAIL,
        error: err,
      });
    });
};

const fetchAccounts = (token) => (dispatch) => {
  const auth = {
    headers: {
      'Auth-Token': token,
    },
  };
  dispatch({ type: accountConstants.FETCH_ACCOUNTS_REQUEST });
  agent.get('/account', auth)
    .then((res) => {
      dispatch({ type: accountConstants.FETCH_ACCOUNTS_SUCCESS, payload: res.data.data });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: accountConstants.FETCH_ACCOUNTS_FAIL,
        error: err,
      });
    });
};

export {
  getInstitutes, getInstitute, addInstitute, editInstitute, fetchAccount, editAccount, deleteAccount, makeStudentCardDefault, fetchStudentCard, addStudentCard, editPassword, fetchAccounts,
};
