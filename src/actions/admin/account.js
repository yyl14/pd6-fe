import agent from '../agent';
import { accountConstants } from './constant';

const getInstitute = (token, instituteId) => (dispatch) => {
  const config = {
    headers: {
      'auth-token': token,
    },
  };
  dispatch({ type: accountConstants.FETCH_INSTITUTE_START });

  agent
    .get(`/institute/${instituteId}`, config)
    .then((res) => {
      dispatch({
        type: accountConstants.FETCH_INSTITUTE_SUCCESS,
        payload: res.data.data,
      });
    })
    .catch((error) => {
      dispatch({
        type: accountConstants.FETCH_INSTITUTE_FAIL,
        error,
      });
    });
};

const addInstitute = (token, abbreviatedName, fullName, emailDomain, isDisabled) => (dispatch) => {
  const config = {
    headers: {
      'auth-token': token,
    },
  };
  dispatch({ type: accountConstants.ADD_INSTITUTE_START });

  agent
    .post(
      '/institute',
      {
        abbreviated_name: abbreviatedName,
        full_name: fullName,
        email_domain: emailDomain,
        is_disabled: isDisabled,
      },
      config,
    )
    .then((res) => {
      dispatch({
        type: accountConstants.ADD_INSTITUTE_SUCCESS,
        payload: {
          id: res.data.data.id,
          abbreviated_name: abbreviatedName,
          full_name: fullName,
          email_domain: emailDomain,
          is_disabled: isDisabled,
        },
      });
    })
    .catch((error) => {
      dispatch({
        type: accountConstants.ADD_INSTITUTE_FAIL,
        error,
      });
    });
};

const editInstitute = (token, id, abbreviatedName, fullName, emailDomain, isDisabled) => (dispatch) => {
  const config = {
    headers: {
      'auth-token': token,
    },
  };
  dispatch({ type: accountConstants.EDIT_INSTITUTE_START });
  const body = {
    abbreviated_name: abbreviatedName,
    full_name: fullName,
    email_domain: emailDomain,
    is_disabled: isDisabled,
  };

  agent
    .patch(`/institute/${id}`, body, config)
    .then(() => {
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
    .catch((error) => {
      // console.log('editing institute fail');
      dispatch({
        type: accountConstants.EDIT_INSTITUTE_FAIL,
        error,
      });
    });
};

// SM: edit any account
const editAccount = (token, id, userName, realName, nickName, email) => (dispatch) => {
  const config = {
    headers: {
      'auth-token': token,
    },
  };
  dispatch({ type: accountConstants.EDIT_ACCOUNT_START });

  agent
    .patch(`/account/${id}`, { real_name: realName, nickname: nickName, alternative_email: email }, config)
    .then(() => {
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
    .catch((error) => {
      dispatch({
        type: accountConstants.EDIT_ACCOUNT_FAIL,
        error,
      });
    });
};

// SM: delete any account
const deleteAccount = (token, id) => (dispatch) => {
  const config = {
    headers: {
      'auth-token': token,
    },
  };
  dispatch({ type: accountConstants.DELETE_ACCOUNT_START });
  agent
    .delete(`/account/${id}`, config)
    .then(() => {
      dispatch({
        type: accountConstants.DELETE_ACCOUNT_SUCCESS,
        payload: { id },
      });
    })
    .catch((error) => {
      dispatch({
        type: accountConstants.DELETE_ACCOUNT_FAIL,
        error,
      });
    });
};

// SM: edit any account
const makeStudentCardDefault = (token, id, cardId) => (dispatch) => {
  const config = {
    headers: {
      'auth-token': token,
    },
  };
  dispatch({ type: accountConstants.MAKE_STUDENT_CARD_DEFAULT_START });
  agent
    .put(`/account/${id}/default-student-card`, { student_card_id: cardId }, config)
    .then(() => {
      dispatch({
        type: accountConstants.MAKE_STUDENT_CARD_DEFAULT_SUCCESS,
        payload: { cardId, id },
      });
    })
    .catch((error) => {
      dispatch({
        type: accountConstants.MAKE_STUDENT_CARD_DEFAULT_FAIL,
        error,
      });
    });
};

// SM: edit any account
const fetchStudentCards = (token, id) => (dispatch) => {
  const config = {
    headers: {
      'auth-token': token,
    },
  };
  dispatch({ type: accountConstants.FETCH_STUDENT_CARDS_START });

  agent
    .get(`/account/${id}/student-card`, config)
    .then((res) => {
      dispatch({
        type: accountConstants.FETCH_STUDENT_CARDS_SUCCESS,
        payload: { id, data: res.data.data },
      });
    })
    .catch((error) => {
      dispatch({
        type: accountConstants.FETCH_STUDENT_CARDS_FAIL,
        payload: id,
        error,
      });
    });
};

// SM: edit any account
const addStudentCard = (token, id, instituteId, emailPrefix, studentId) => (dispatch) => {
  const config = {
    headers: {
      'auth-token': token,
    },
  };
  dispatch({ type: accountConstants.ADD_STUDENT_CARD_START });
  agent
    .post(
      `/account/${id}/student-card`,
      {
        institute_id: instituteId,
        institute_email_prefix: emailPrefix,
        student_id: studentId,
      },
      config,
    )
    .then(() => {
      dispatch({ type: accountConstants.ADD_STUDENT_CARD_SUCCESS });
    })
    .catch((error) => {
      dispatch({
        type: accountConstants.ADD_STUDENT_CARD_FAIL,
        error,
      });
    });
};

// SM: edit any account
const editPassword = (token, id, newPassword) => (dispatch) => {
  const config = {
    headers: {
      'auth-token': token,
    },
  };
  dispatch({ type: accountConstants.EDIT_PASSWORD_START });
  agent
    .put(
      `/account/${id}/pass_hash`,
      {
        new_password: newPassword,
      },
      config,
    )
    .then(() => {
      dispatch({ type: accountConstants.EDIT_PASSWORD_SUCCESS });
    })
    .catch((error) => {
      dispatch({
        type: accountConstants.EDIT_PASSWORD_FAIL,
        error,
      });
    });
};

// SM: fetch all accounts
// WITH BROWSE API
const fetchAccounts = (token) => (dispatch) => {
  const config = {
    headers: {
      'auth-token': token,
    },
  };
  dispatch({ type: accountConstants.FETCH_ACCOUNTS_START });
  agent
    .get('/account', config)
    .then((res) => {
      dispatch({
        type: accountConstants.FETCH_ACCOUNTS_SUCCESS,
        payload: res.data.data.data,
      });
    })
    .catch((error) => {
      dispatch({
        type: accountConstants.FETCH_ACCOUNTS_FAIL,
        error,
      });
    });
};

export {
  getInstitute,
  addInstitute,
  editInstitute,
  editAccount,
  deleteAccount,
  makeStudentCardDefault,
  fetchStudentCards,
  addStudentCard,
  editPassword,
  fetchAccounts,
};
