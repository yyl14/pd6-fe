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

const fetchSubmitLang = (token) => (dispatch) => {
  const fetch = { headers: { 'auth-token': token } };
  dispatch({
    type: systemConstants.FETCH_SUBMIT_LANG_START,
  });

  agent.get('/submission/language', fetch)
    .then((res) => {
      const { data } = res.data;
      dispatch({
        type: systemConstants.FETCH_SUBMIT_LANG_SUCCESS,
        payload: {
          ...data,
        },
      });
    })
    .catch((err) => {
      dispatch({
        type: systemConstants.FETCH_SUBMIT_LANG_FAIL,
        payload: err,
      });
    });
};

export {
  fetchAccessLog,
  fetchAnnouncement,
  fetchSubmitLang,
};
