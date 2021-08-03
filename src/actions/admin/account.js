import agent from '../agent';
import {
  accountConstants,
} from '../constant';

const getInstitutes = (token) => (dispatch) => {
  const auth = {
    headers: {
      'Auth-Token': token,
    },
  };

  agent.get('/institute', auth)
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
  agent.post('/institute', {
    abbreviated_name: abbreviatedName,
    full_name: fullName,
    email_domain: emailDomain,
    is_disabled: isDisabled,
  }, auth)
    .then((res) => {
      console.log('adding institute suc');
      dispatch({
        type: accountConstants.ADD_INSTITUTE_SUCCESS,
        payload: {
          id: res.data.data.id, abbreviated_name: abbreviatedName, full_name: fullName, email_domain: emailDomain, is_disabled: isDisabled,
        },
      });
    })
    .catch((err) => {
      console.log('adding institute fail');
      dispatch({
        type: accountConstants.ADD_INSTITUTE_FAIL,
        error: err,
      });
    });
};

const editInstitute = (token, id, name, emailDomain, isDisabled) => (dispatch) => {
  const auth = {
    headers: {
      'Auth-Token': token,
    },
  };

  agent.patch(`/institute/${id}`, {
    name,
    email_domain: emailDomain,
    is_disabled: isDisabled,
  }, auth)
    .then((res) => {
      dispatch({
        type: accountConstants.EDIT_INSTITUTE_SUCCESS,
        payload: {
          id, name, email_domain: emailDomain, is_disabled: isDisabled,
        },
      });
    })
    .catch((err) => {
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

  agent.get(`/account/${id}`, auth)
    .then((res) => {
      dispatch({
        type: accountConstants.FETCH_ACCOUNT_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: accountConstants.FETCH_ACCOUNT_FAIL,
        error: err,
      });
    });
};

const editAccount = (token, id, nickname, email) => (dispatch) => {
  const auth = {
    headers: {
      'Auth-Token': token,
    },
  };

  agent.patch(`/account/${id}`, { nickname, alternative_email: email }, auth)
    .then((res) => {
      dispatch({
        type: accountConstants.EDIT_ACCOUNT_SUCCESS,
        payload: {
          nickname, alternative_email: email,
        },
      });
    })
    .catch((err) => {
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

  agent.delete(`/account/${id}`, auth)
    .then((res) => {
      dispatch({
        type: accountConstants.DELETE_ACCOUNT_SUCCESS,
      });
    })
    .catch((err) => {
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

  agent.put(`/account/${id}`, { student_card_id: cardId }, auth)
    .then((res) => {
      dispatch({
        type: accountConstants.MAKE_STUDENT_CARD_DEFAULT_SUCCESS,
        payload: { cardId },
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

  agent.get(`/account/${id}/student-card`, auth)
    .then((res) => {
      dispatch({
        type: accountConstants.FETCH_STUDENT_CARD_SUCCESS,
        payload: res.data.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: accountConstants.FETCH_STUDENT_CARD_FAIL,
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

  agent.post(`/account/${id}/student-card`, {
    institute_id: instituteId,
    institute_email_prefix: emailPrefix,
    department,
    student_id: studentId,
  }, auth)
    .then((res) => {
      dispatch({
        type: accountConstants.ADD_STUDENT_CARD_SUCCESS,
        payload: {
          id: res.data.id, // to be checked
          institute_id: instituteId,
          institute_email_prefix: emailPrefix,
          department,
          student_id: studentId,
        },
      });
    })
    .catch((err) => {
      dispatch({
        type: accountConstants.ADD_STUDENT_CARD_FAIL,
        error: err,
      });
    });
};

// TODO: Fetch all accounts
const fetchAccounts = (token) => (dispatch) => {

};

export {
  getInstitutes, addInstitute, editInstitute, fetchAccounts,
};
