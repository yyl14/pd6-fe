import agent from '../agent';
import { gradeConstants } from './constant';
import { autoTableConstants } from '../component/constant';
import browseParamsTransForm from '../../function/browseParamsTransform';

export const fetchClassGrade = (token, classId, browseParams, tableId = null) => async (dispatch) => {
  try {
    const config1 = {
      headers: { 'auth-token': token },
      params: browseParamsTransForm(browseParams),
    };
    dispatch({ type: gradeConstants.FETCH_CLASS_GRADE_START });
    const res1 = await agent.get(`/class/${classId}/grade`, config1);
    const { data, total_count } = res1.data.data;
    console.log(data);
    // Batch browse account
    const accountIds = data.map((item) => item.receiver_id);
    let res2 = null;
    if (accountIds.length !== 0) {
      const config2 = {
        headers: { 'auth-token': token },
        params: { account_ids: JSON.stringify(accountIds) },
      };

      res2 = await agent.get('/account-summary/batch', config2);
    }

    dispatch({
      type: gradeConstants.FETCH_CLASS_GRADE_SUCCESS,
      payload: {
        classId,
        data,
        accounts: res2 ? res2.data.data : [],
      },
    });
    dispatch({
      type: autoTableConstants.AUTO_TABLE_UPDATE,
      payload: {
        tableId,
        totalCount: total_count,
        dataIds: data.map((item) => item.receiver_id),
        offset: browseParams.offset,
      },
    });
  } catch (error) {
    dispatch({
      type: gradeConstants.FETCH_CLASS_GRADE_FAIL,
      error,
    });
  }
};

export const fetchGrade = (token, gradeId) => async (dispatch) => {
  try {
    const config1 = { headers: { 'auth-token': token } };
    dispatch({ type: gradeConstants.FETCH_GRADE_START });
    const res1 = await agent.get(`grade/${gradeId}`, config1);
    const { data } = res1.data;

    // Batch browse account
    const config2 = {
      headers: { 'auth-token': token },
      params: { account_ids: JSON.stringify([data.receiver_id]) },
    };
    const res2 = await agent.get('/account-summary/batch', config2);

    const config3 = {
      headers: { 'auth-token': token },
      params: { account_ids: JSON.stringify([data.grader_id]) },
    };
    const res3 = await agent.get('/account-summary/batch', config3);

    dispatch({
      type: gradeConstants.FETCH_GRADE_SUCCESS,
      payload: {
        gradeId,
        data: {
          grade: data,
          receiver: res2.data.data[0],
          grader: res3.data.data[0],
        },
      },
    });
  } catch (error) {
    dispatch({
      type: gradeConstants.FETCH_GRADE_FAIL,
      error,
    });
  }
};

export const addClassGrade = (token, classId, receiverRef, graderRef, title, score, comment) => async (dispatch) => {
  try {
    const config = {
      headers: {
        'Auth-Token': token,
      },
    };
    const body = {
      receiver_referral: receiverRef,
      grader_referral: graderRef,
      title,
      score,
      comment,
    };
    dispatch({ type: gradeConstants.ADD_CLASS_GRADE_START });
    await agent.post(`/class/${classId}/grade`, body, config);
    dispatch({ type: gradeConstants.ADD_CLASS_GRADE_SUCCESS });
  } catch (err) {
    dispatch({
      type: gradeConstants.ADD_CLASS_GRADE_FAIL,
      error: err,
    });
  }
};

export const importClassGrade = (token, classId, title, file) => async (dispatch) => {
  try {
    dispatch({ type: gradeConstants.IMPORT_CLASS_GRADE_START });
    const config = {
      headers: {
        'Auth-Token': token,
        'Content-Type': 'multipart/form-data',
      },
      params: {
        title,
      },
    };
    const formData = new FormData();
    formData.append('grade_file', file);

    await agent.post(`/class/${classId}/grade-import`, formData, config);
    dispatch({ type: gradeConstants.IMPORT_CLASS_GRADE_SUCCESS });
  } catch (err) {
    dispatch({
      type: gradeConstants.IMPORT_CLASS_GRADE_FAIL,
      error: err,
    });
  }
};

export const fetchAccountGrade = (token, accountId) => (dispatch) => {
  const auth = { headers: { 'auth-token': token } };
  dispatch({ type: gradeConstants.FETCH_ACCOUNT_GRADE_START });
  agent
    .get(`/account/${accountId}/grade`, auth)
    .then((res) => {
      dispatch({
        type: gradeConstants.FETCH_ACCOUNT_GRADE_SUCCESS,
        payload: { accountId, data: res.data.data.data },
      });
    })
    .catch((err) => {
      dispatch({
        type: gradeConstants.FETCH_ACCOUNT_GRADE_FAIL,
        error: err,
      });
    });
};

export const downloadGradeFile = (token) => async (dispatch) => {
  try {
    const auth = {
      headers: {
        'Auth-Token': token,
      },
    };
    dispatch({ type: gradeConstants.DOWNLOAD_GRADE_FILE_START });
    const res = await agent.get('/grade/template', auth);
    if (res.data.success) {
      const config = {
        headers: {
          'Auth-Token': token,
        },
        params: {
          filename: res.data.data.filename,
          as_attachment: true,
        },
      };
      try {
        const res2 = await agent.get(`/s3-file/${res.data.data.s3_file_uuid}/url`, config);
        if (res2.data.success) {
          fetch(res2.data.data.url).then((t) => t.blob().then((b) => {
            const a = document.createElement('a');
            a.href = URL.createObjectURL(b);
            a.setAttribute('download', res.data.data.filename);
            a.click();
          }));
          dispatch({
            type: gradeConstants.DOWNLOAD_GRADE_FILE_SUCCESS,
          });
        } else {
          dispatch({
            type: gradeConstants.DOWNLOAD_GRADE_FILE_FAIL,
            error: res2.data.error,
          });
        }
      } catch (err) {
        dispatch({
          type: gradeConstants.DOWNLOAD_GRADE_FILE_FAIL,
          error: err,
        });
      }
    }

    dispatch({
      type: gradeConstants.DOWNLOAD_GRADE_FILE_FAIL,
      error: res.data.error,
    });
  } catch (err) {
    dispatch({
      type: gradeConstants.DOWNLOAD_GRADE_FILE_FAIL,
      error: err,
    });
  }
};

export const deleteGrade = (token, gradeId) => async (dispatch) => {
  try {
    const config = {
      headers: {
        'Auth-Token': token,
      },
    };
    dispatch({ type: gradeConstants.DELETE_GRADE_START });
    await agent.delete(`/grade/${gradeId}`, config);
    dispatch({ type: gradeConstants.DELETE_GRADE_SUCCESS });
  } catch (err) {
    dispatch({
      type: gradeConstants.DELETE_GRADE_FAIL,
      error: err,
    });
  }
};

export const editGrade = (token, gradeId, title, score, comment) => (dispatch) => {
  const auth = { headers: { 'auth-token': token } };
  dispatch({ type: gradeConstants.EDIT_GRADE_START });
  agent
    .patch(`/grade/${gradeId}`, { title, score, comment }, auth)
    .then(() => {
      dispatch({ type: gradeConstants.EDIT_GRADE_SUCCESS });
    })
    .catch((err) => {
      dispatch({
        type: gradeConstants.EDIT_GRADE_FAIL,
        error: err,
      });
    });
};
