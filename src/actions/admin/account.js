import institute from '../../containers/admin/account/institute';
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

const addInstitute = (token, name, emailDomain, isDisabled) => (dispatch) => {
  const auth = {
    headers: {
      'Auth-Token': token,
    },
  };

  agent.post('/institute', auth, { name, emailDomain, isDisabled })
    .then((res) => {
      dispatch({
        type: accountConstants.ADD_INSTITUTE_SUCCESS,
        payload: {
          id: res.data.data.id, name, email_domain: emailDomain, is_disabled: isDisabled,
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

const editInstitute = (token, id, name, emailDomain, isDisabled) => (dispatch) => {
  const auth = {
    headers: {
      'Auth-Token': token,
    },
  };

  agent.patch(`/institute/${id}`, auth)
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

const editAccount = (token, id, nickname, email) => (dispatch) => {
  const auth = {
    headers: {
      'Auth-Token': token,
    },
  };

  agent.patch(`/account/${id}`, auth, { nickname, alternative_email: email })
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

  agent.put(`/account/${id}`, auth, { student_card_id: cardId })
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

  agent.post(`/account/${id}/student-card`, auth, {
    institute_id: instituteId, institute_email_prefix: emailPrefix, department, student_id: studentId,
  })
    .then((res) => {
      dispatch({
        type: accountConstants.ADD_STUDENT_CARD_SUCCESS,
        payload: {
          institute_id: instituteId, institute_email_prefix: emailPrefix, department, student_id: studentId,
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
