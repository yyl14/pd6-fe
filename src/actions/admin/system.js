import agent from '../agent';
import {
  systemConstants,
} from '../constant';

const fetchAccessLog = (offset, limit, token) => (dispatch) => {
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

const fetchSubmitLanguage = (token) => (dispatch) => {
  const fetch = { headers: { 'auth-token': token } };
  dispatch({
    type: systemConstants.FETCH_SUBMIT_LANGUAGE_START,
  });

  agent.get('submission/language', fetch)
    .then((res) => {
      const { data } = res.data;
      console.log('use api :', data);
      dispatch({
        type: systemConstants.FETCH_SUBMIT_LANGUAGE_SUCCESS,
        payload: { data },
      });
    })
    .catch((err) => {
      dispatch({
        type: systemConstants.FETCH_SUBMIT_LANGUAGE_FAIL,
        payload: { err },
      });
    });
};

const editSubmitLanguage = (token, id, name, version, isDisabled) => (dispatch) => {
  const fetch = { headers: { 'auth-token': token } };
  const body = {
    name,
    version,
    is_disabled: isDisabled,
  };
  dispatch({
    type: systemConstants.EDIT_SUBMIT_LANGUAGE_START,
  });

  agent.patch(`submission/language/${id}`, body, fetch)
    .then((res) => {
      console.log('edit submit language :', body);
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
        payload: { err },
      });
    });
};

export {
  fetchAccessLog,
  fetchAnnouncement,
  fetchSubmitLanguage,
  editSubmitLanguage,
};
