import agent from '../agent';
import {
  systemConstants,
} from '../constant';

// Access log
const fetchAccessLog = (token, offset, limit) => (dispatch) => {
  const fetch = { headers: { 'auth-token': token } };
  dispatch({
    type: systemConstants.FETCH_ACCESS_LOG_START,
  });

  agent.get(`/access-log?offset=${offset}&limit=${limit}`, fetch)
    .then((res) => {
      const { data } = res.data;
      dispatch({
        type: systemConstants.FETCH_ACCESS_LOG_SUCCESS,
        payload: {
          ...data,
        },
      });
    })
    .catch((err) => {
      dispatch({
        type: systemConstants.FETCH_ACCESS_LOG_FAIL,
        payload: err,
      });
    });
};
const fetchAccounts = (token, ids) => async (dispatch) => {
  const fetch = { headers: { 'auth-token': token } };
  dispatch({
    type: systemConstants.FETCH_LOG_ACCOUNTS_START,
  });

  let error = null;
  const accounts = await Promise.all(ids.map(async (id) => {
    let response = null;
    await agent.get(`/account/${id}`, fetch)
      .then((res) => {
        const { data } = res.data;
        // console.log('account :', id, data);
        response = data;
      })
      .catch((err) => {
        error = err;
        response = null;
      });
    return response;
  }));

  // console.log('payload : ', accounts);
  if (error === null) {
    dispatch({
      type: systemConstants.FETCH_LOG_ACCOUNTS_SUCCESS,
      payload: {
        ...accounts,
      },
    });
  } else {
    dispatch({
      type: systemConstants.FETCH_LOG_ACCOUNTS_FAIL,
      payload: {
        error,
      },
    });
  }
};
// Announcement
const fetchAnnouncement = (token) => (dispatch) => {
  const fetch = { headers: { 'auth-token': token } };
  dispatch({
    type: systemConstants.FETCH_ANNOUNCEMENT_START,
  });

  agent.get('/announcement', fetch)
    .then((res) => {
      const { data } = res.data;
      dispatch({
        type: systemConstants.FETCH_ANNOUNCEMENT_SUCCESS,
        payload: {
          ...data,
        },
      });
    })
    .catch((err) => {
      dispatch({
        type: systemConstants.FETCH_ANNOUNCEMENT_FAIL,
        payload: err,
      });
    });
};

const editAnnouncement = (token, id, body) => (dispatch) => {
  const fetch = { headers: { 'auth-token': token } };
  dispatch({
    type: systemConstants.EDIT_ANNOUNCEMENT_START,
  });

  agent.patch(`/announcement/${id}`, body, fetch)
    .then((res) => {
      const { success } = res.data;
      dispatch({
        type: systemConstants.EDIT_ANNOUNCEMENT_SUCCESS,
        payload: success,
      });
    })
    .catch((err) => {
      dispatch({
        type: systemConstants.EDIT_ANNOUNCEMENT_FAIL,
        payload: err,
      });
    });
};

const addAnnouncement = (token, body) => (dispatch) => {
  const fetch = { headers: { 'auth-token': token } };
  dispatch({
    type: systemConstants.ADD_ANNOUNCEMENT_START,
  });
  agent.post('/announcement', body, fetch)
    .then((res) => {
      const { success } = res.data;
      dispatch({
        type: systemConstants.ADD_ANNOUNCEMENT_SUCCESS,
        payload: success,
      });
    })
    .catch((err) => {
      dispatch({
        type: systemConstants.ADD_ANNOUNCEMENT_FAIL,
        payload: err,
      });
    });
};

const deleteAnnouncement = (token, id) => (dispatch) => {
  const fetch = { headers: { 'auth-token': token } };
  dispatch({
    type: systemConstants.DELETE_ANNOUNCEMENT_START,
  });

  agent.delete(`/announcement/${id}`, fetch)
    .then((res) => {
      const { success } = res.data;
      dispatch({
        type: systemConstants.DELETE_ANNOUNCEMENT_SUCCESS,
        payload: success,
      });
    })
    .catch((err) => {
      dispatch({
        type: systemConstants.DELETE_ANNOUNCEMENT_FAIL,
        payload: err,
      });
    });
};

// Submit language
const fetchSubmitLanguage = (token) => (dispatch) => {
  const fetch = { headers: { 'auth-token': token } };
  dispatch({
    type: systemConstants.FETCH_SUBMIT_LANGUAGE_START,
  });

  agent.get('submission/language', fetch)
    .then((res) => {
      const { data } = res.data;
      // console.log('use api :', data);
      dispatch({
        type: systemConstants.FETCH_SUBMIT_LANGUAGE_SUCCESS,
        payload: { data },
      });
    })
    .catch((err) => {
      dispatch({
        type: systemConstants.FETCH_SUBMIT_LANGUAGE_FAIL,
        payload: err,
      });
    });
};

const editSubmitLanguage = (token, id, name, version, isDisabled) => (dispatch) => {
  const fetch = { headers: { 'auth-token': token } };
  dispatch({
    type: systemConstants.EDIT_SUBMIT_LANGUAGE_START,
  });
  const body = {
    name,
    version,
    is_disabled: isDisabled,
  };

  agent.patch(`submission/language/${id}`, body, fetch)
    .then((res) => {
      // console.log('edit submit language :', body);
      dispatch({
        type: systemConstants.EDIT_SUBMIT_LANGUAGE_SUCCESS,
        payload: {
          language_id: parseInt(id, 10),
          name,
          version,
          is_disabled: isDisabled,
        },
      });
    })
    .catch((err) => {
      dispatch({
        type: systemConstants.EDIT_SUBMIT_LANGUAGE_FAIL,
        payload: err,
      });
    });
};

export {
  fetchAccessLog,
  fetchAccounts,
  fetchAnnouncement,
  editAnnouncement,
  addAnnouncement,
  deleteAnnouncement,
  fetchSubmitLanguage,
  editSubmitLanguage,
};
