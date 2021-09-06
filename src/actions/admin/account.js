import agent from '../agent';
import { accountConstants } from './constant';

const getInstitute = (token, instituteId) => (dispatch) => {
  const auth = {
    headers: {
      'Auth-Token': token,
    },
  };
  dispatch({ type: accountConstants.FETCH_INSTITUTE_REQUEST });

  agent
    .get(`/institute/${instituteId}`, auth)
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

  agent
    .post(
      '/institute',
      {
        abbreviated_name: abbreviatedName,
        full_name: fullName,
        email_domain: emailDomain,
        is_disabled: isDisabled,
      },
      auth,
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

  agent
    .patch(`/institute/${id}`, body, auth)
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
    .catch((err) => {
      console.log('editing institute fail');
      dispatch({
        type: accountConstants.EDIT_INSTITUTE_FAIL,
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

  agent
    .patch(`/account/${id}`, { real_name: realName, nickname: nickName, alternative_email: email }, auth)
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
  agent
    .delete(`/account/${id}`, auth)
    .then(() => {
      dispatch({
        type: accountConstants.DELETE_ACCOUNT_SUCCESS,
        payload: { id },
      });
    })
    .catch((err) => {
      // console.log(err);
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

  agent
    .put(`/account/${id}/default-student-card`, { student_card_id: cardId }, auth)
    .then(() => {
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

  agent
    .get(`/account/${id}/student-card`, auth)
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
  agent
    .post(
      `/account/${id}/student-card`,
      {
        institute_id: instituteId,
        institute_email_prefix: emailPrefix,
        student_id: studentId,
      },
      auth,
    )
    .then(() => {
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
  agent
    .put(
      `/account/${id}/pass_hash`,
      {
        new_password: newPassword,
      },
      auth,
    )
    .then(() => {
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
  agent
    .get('/account', auth)
    .then((res) => {
      dispatch({
        type: accountConstants.FETCH_ACCOUNTS_SUCCESS,
        payload: res.data.data.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: accountConstants.FETCH_ACCOUNTS_FAIL,
        error: err,
      });
    });
};

const browsePendingStudentCards = (token, accountId) => async (dispatch) => {
  dispatch({ type: accountConstants.BROWSE_PENDING_STUDENT_CARDS_REQUEST });
  try {
    const config = {
      headers: {
        'Auth-Token': token,
      },
    };
    const res = await agent.get(`/account/${accountId}/email-verification`, config);
    dispatch({
      type: accountConstants.BROWSE_PENDING_STUDENT_CARDS_SUCCESS,
      payload: { accountId, data: res.data.data },
    });
  } catch (error) {
    dispatch({
      type: accountConstants.BROWSE_PENDING_STUDENT_CARDS_FAIL,
      error,
    });
  }
};

const resendEmailVerification = (token, emailVerificationId) => async (dispatch) => {
  dispatch({ type: accountConstants.RESEND_EMAIL_VERIFICATION_REQUEST });
  try {
    const config = {
      headers: {
        'Auth-Token': token,
      },
    };
    await agent.post(`/email-verification/${emailVerificationId}/resend`, config);
    dispatch({
      type: accountConstants.RESEND_EMAIL_VERIFICATION_SUCCESS,
    });
  } catch (error) {
    dispatch({
      type: accountConstants.RESEND_EMAIL_VERIFICATION_FAIL,
      error,
    });
  }
};

const deletePendingStudentCard = (token, emailVerificationId) => async (dispatch) => {
  dispatch({ type: accountConstants.DELETE_PENDING_STUDENT_CARD_REQUEST });
  try {
    const config = {
      headers: {
        'Auth-Token': token,
      },
    };
    await agent.delete(`/email-verification/${emailVerificationId}`, config);
    dispatch({
      type: accountConstants.DELETE_PENDING_STUDENT_CARD_SUCCESS,
    });
  } catch (error) {
    dispatch({
      type: accountConstants.DELETE_PENDING_STUDENT_CARD_FAIL,
      error,
    });
  }
};

export {
  getInstitute,
  addInstitute,
  editInstitute,
  editAccount,
  deleteAccount,
  makeStudentCardDefault,
  fetchStudentCard,
  addStudentCard,
  editPassword,
  fetchAccounts,
  browsePendingStudentCards,
  resendEmailVerification,
  deletePendingStudentCard,
};
