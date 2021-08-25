import agent from '../agent';
import { systemConstants, accountConstants } from './constant';
import { autoTableConstants } from '../component/constant';
import browseParamsTransForm from '../../function/browseParamsTransform';

// Access log
<<<<<<< HEAD
const fetchAccessLog = (token, browseParams, tableId = null) => async (dispatch) => {
  try {
    console.log(browseParams);
    const config1 = {
      headers: { 'auth-token': token },
      params: browseParamsTransForm(browseParams),
      // paramsSerializer: (params) => qs.stringify(params, { arrayFormat: 'repeat' }),
    };
    dispatch({
      type: systemConstants.FETCH_ACCESS_LOG_START,
    });
    // console.log(config1);

    const res1 = await agent.get('/access-log', config1);

    const { data, total_count } = res1.data.data;
    console.log(res1);

    // TODO: Batch browse account
    const config2 = {
      headers: { 'auth-token': token },
    };

    const accounts = await Promise.all(
      data.map(async ({ account_id }) => agent
        .get(`/account/${account_id}`, config2)
        .then((res2) => res2.data.data)
        .catch((err) => {
          dispatch({
            type: systemConstants.FETCH_ACCESS_LOG_FAIL,
            payload: err,
          });
        })),
    );

    dispatch({
      type: systemConstants.FETCH_ACCESS_LOG_SUCCESS,
      payload: { data, accounts: accounts.filter((item) => item !== null) },
    });
    dispatch({
      type: autoTableConstants.AUTO_TABLE_UPDATE,
      payload: {
        tableId,
        totalCount: total_count,
        dataIds: data.map((item) => item.id),
        offset: browseParams.offset,
      },
    });
  } catch (error) {
    dispatch({
      type: systemConstants.FETCH_ACCESS_LOG_FAIL,
      payload: error,
=======
const fetchAccessLog = (token, offset, limit) => (dispatch) => {
  const fetch = { headers: { 'auth-token': token } };
  dispatch({
    type: systemConstants.FETCH_ACCESS_LOG_START,
  });
  agent
    .get(`/access-log?offset=${offset}&limit=${limit}`, fetch)
    .then(async (response) => {
      const { data } = response.data;
      const ids = data.map((item) => item.account_id);
      const accounts = await Promise.all(
        ids.map(async (id) => {
          let account = null;
          await agent
            .get(`/account/${id}`, fetch)
            .then((res) => {
              account = res.data.data;
            })
            .catch((err) => {
              dispatch({
                type: systemConstants.FETCH_ACCESS_LOG_FAIL,
                payload: err,
              });
            });
          return account;
        }),
      );

      const newData = data.map((item) => {
        let account = accounts[item.account_id];
        if (account === undefined) {
          account = {
            username: '',
            real_name: '',
          };
        }
        return ({
          id: item.id,
          access_time: item.access_time,
          request_method: item.request_method,
          resource_path: item.resource_path,
          ip: item.ip,
          account_id: item.account_id,
          username: account.username,
          real_name: account.real_name,
        });
      });
      dispatch({
        type: systemConstants.FETCH_ACCESS_LOG_SUCCESS,
        payload: {
          ...newData,
        },
      });
    })
    .catch((err) => {
      // console.log('response :', err);
      dispatch({
        type: systemConstants.FETCH_ACCESS_LOG_FAIL,
        payload: err,
      });
>>>>>>> 77-page-problem-coding-problem
    });
  }
};
// Announcement
const fetchAnnouncement = (token) => (dispatch) => {
  const fetch = { headers: { 'auth-token': token } };
  dispatch({
    type: systemConstants.FETCH_ANNOUNCEMENT_START,
  });

  agent
    .get('/announcement', fetch)
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

  agent
    .patch(`/announcement/${id}`, body, fetch)
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
  agent
    .post('/announcement', body, fetch)
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

  agent
    .delete(`/announcement/${id}`, fetch)
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

  agent
    .get('submission/language', fetch)
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

  agent
    .patch(`submission/language/${id}`, body, fetch)
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
  fetchAnnouncement,
  editAnnouncement,
  addAnnouncement,
  deleteAnnouncement,
  fetchSubmitLanguage,
  editSubmitLanguage,
};
