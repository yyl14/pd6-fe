import agent from '../agent';
import { systemConstants } from './constant';
import { autoTableConstants } from '../component/constant';
import browseParamsTransForm from '../../function/browseParamsTransform';

// Access log
// WITH BROWSE PARAMS
// const fetchAccessLog = (token, browseParams, tableId = null) => async (dispatch) => {
//   try {
//     dispatch({
//       type: systemConstants.FETCH_ACCESS_LOG_START,
//     });
//     const config1 = {
//       headers: { 'auth-token': token },
//       params: browseParamsTransForm(browseParams),
//     };
//     const res1 = await agent.get('/access-log', config1);
//     const { data: logs, total_count } = res1.data.data;

//     // Batch browse account
//     const accountIds = logs.map((item) => Number(item.account_id));
//     const config2 = {
//       headers: { 'auth-token': token },
//       params: { account_ids: JSON.stringify(accountIds) },
//     };

//     const res2 = await agent.get('/account-summary/batch', config2);
//     const { data: accounts } = res2.data;

//     dispatch({
//       type: systemConstants.FETCH_ACCESS_LOG_SUCCESS,
//       payload: { data: logs, accounts: accounts.filter((item) => item !== null) },
//     });

//     dispatch({
//       type: autoTableConstants.AUTO_TABLE_UPDATE,
//       payload: {
//         tableId,
//         totalCount: total_count,
//         dataIds: logs.map((item) => item.id),
//         offset: browseParams.offset,
//       },
//     });
//   } catch (error) {
//     dispatch({
//       type: systemConstants.FETCH_ACCESS_LOG_FAIL,
//       error,
//     });
//   }
// };
// Announcement
const fetchAnnouncement = (token, browseParams, tableId = null) => async (dispatch) => {
  try {
    dispatch({
      type: systemConstants.FETCH_ANNOUNCEMENT_START,
    });

    const config = {
      headers: { 'auth-token': token },
      params: browseParamsTransForm(browseParams),
    };
    const res = await agent.get('/announcement', config);
    const { data: announcements, total_count } = res.data.data;
    // console.log('fetchAnnouncement :', announcements);
    dispatch({
      type: systemConstants.FETCH_ANNOUNCEMENT_SUCCESS,
      payload: {
        data: announcements,
      },
    });

    dispatch({
      type: autoTableConstants.AUTO_TABLE_UPDATE,
      payload: {
        tableId,
        totalCount: total_count,
        dataIds: announcements.map((item) => item.id),
        offset: browseParams.offset,
      },
    });
  } catch (error) {
    dispatch({
      type: systemConstants.FETCH_ANNOUNCEMENT_FAIL,
      error,
    });
  }
};

// read only one announcement by its id
const readAnnouncement = (token, announcementId) => async (dispatch) => {
  try {
    dispatch({
      type: systemConstants.FETCH_ANNOUNCEMENT_START,
    });

    const config = {
      headers: { 'auth-token': token },
    };
    const res = await agent.get(`/announcement/${announcementId}`, config);
    const { data } = res.data;
    dispatch({
      type: systemConstants.FETCH_ANNOUNCEMENT_SUCCESS,
      payload: {
        data: [data],
      },
    });
  } catch (error) {
    dispatch({
      type: systemConstants.FETCH_ANNOUNCEMENT_FAIL,
      error,
    });
  }
};

const editAnnouncement = (token, id, body) => (dispatch) => {
  const config = { headers: { 'auth-token': token } };
  dispatch({
    type: systemConstants.EDIT_ANNOUNCEMENT_START,
  });

  agent
    .patch(`/announcement/${id}`, body, config)
    .then(() => {
      dispatch({
        type: systemConstants.EDIT_ANNOUNCEMENT_SUCCESS,
      });
    })
    .catch((error) => {
      dispatch({
        type: systemConstants.EDIT_ANNOUNCEMENT_FAIL,
        error,
      });
    });
};

const addAnnouncement = (token, body) => (dispatch) => {
  const config = { headers: { 'auth-token': token } };
  dispatch({
    type: systemConstants.ADD_ANNOUNCEMENT_START,
  });
  agent
    .post('/announcement', body, config)
    .then(() => {
      dispatch({
        type: systemConstants.ADD_ANNOUNCEMENT_SUCCESS,
      });
    })
    .catch((error) => {
      dispatch({
        type: systemConstants.ADD_ANNOUNCEMENT_FAIL,
        error,
      });
    });
};

const deleteAnnouncement = (token, id) => (dispatch) => {
  const config = { headers: { 'auth-token': token } };
  dispatch({
    type: systemConstants.DELETE_ANNOUNCEMENT_START,
  });

  agent
    .delete(`/announcement/${id}`, config)
    .then(() => {
      dispatch({
        type: systemConstants.DELETE_ANNOUNCEMENT_SUCCESS,
      });
    })
    .catch((error) => {
      dispatch({
        type: systemConstants.DELETE_ANNOUNCEMENT_FAIL,
        error,
      });
    });
};

// Submit language
const fetchSubmitLanguage = (token) => (dispatch) => {
  const config = { headers: { 'auth-token': token } };
  dispatch({
    type: systemConstants.FETCH_SUBMIT_LANGUAGE_START,
  });

  agent
    .get('submission/language', config)
    .then((res) => {
      const { data } = res.data;
      dispatch({
        type: systemConstants.FETCH_SUBMIT_LANGUAGE_SUCCESS,
        payload: { data },
      });
    })
    .catch((error) => {
      dispatch({
        type: systemConstants.FETCH_SUBMIT_LANGUAGE_FAIL,
        error,
      });
    });
};

const editSubmitLanguage = (token, id, name, version, isDisabled) => (dispatch) => {
  const config = { headers: { 'auth-token': token } };
  dispatch({
    type: systemConstants.EDIT_SUBMIT_LANGUAGE_START,
  });
  const body = {
    name,
    version,
    is_disabled: isDisabled,
  };

  agent
    .patch(`submission/language/${id}`, body, config)
    .then(() => {
      dispatch({
        type: systemConstants.EDIT_SUBMIT_LANGUAGE_SUCCESS,
        payload: {
          language_id: Number(id),
          name,
          version,
          is_disabled: isDisabled,
        },
      });
    })
    .catch((error) => {
      dispatch({
        type: systemConstants.EDIT_SUBMIT_LANGUAGE_FAIL,
        error,
      });
    });
};

export {
  // fetchAccessLog,
  fetchAnnouncement,
  readAnnouncement,
  editAnnouncement,
  addAnnouncement,
  deleteAnnouncement,
  fetchSubmitLanguage,
  editSubmitLanguage,
};
