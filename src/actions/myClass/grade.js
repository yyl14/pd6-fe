import agent from '../agent';
import { gradeConstants } from './constant';

export const fetchClassGrade = (token, classId) => async (dispatch) => {
  try {
    const auth = {
      headers: {
        'Auth-Token': token,
      },
    };
    dispatch({ type: gradeConstants.FETCH_CLASS_GRADE_START });
    const res = await agent.get(`/class/${classId}/grade`, auth);
    dispatch({
      type: gradeConstants.FETCH_CLASS_GRADE_SUCCESS,
      payload: { classId, data: res.data.data },
    });
  } catch (err) {
    dispatch({
      type: gradeConstants.FETCH_CLASS_GRADE_FAIL,
      error: err,
    });
  }
};

export const addClassGrade = (token, classId, file) => async (dispatch) => {
  dispatch({ type: gradeConstants.ADD_CLASS_GRADE_START });
  const auth = {
    headers: {
      'Auth-Token': token,
      'Content-Type': 'multipart/form-data',
    },
  };
  const formData = new FormData();
  formData.append('grade_file', file);

  try {
    const res = await agent.post(`/class/${classId}/grade`, formData, auth);
    if (res.data.success) {
      dispatch({
        type: gradeConstants.ADD_CLASS_GRADE_SUCCESS,
      });
    } else {
      dispatch({
        type: gradeConstants.ADD_CLASS_GRADE_FAIL,
        error: res.data.error,
      });
    }
  } catch (err) {
    dispatch({
      type: gradeConstants.ADD_CLASS_GRADE_FAIL,
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
        payload: { accountId, data: res.data.data },
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

export const deleteGrade = (token, gradeId) => (dispatch) => {
  const auth = { headers: { 'auth-token': token } };
  dispatch({ type: gradeConstants.DELETE_GRADE_START });
  agent
    .delete(`/grade/${gradeId}`, auth)
    .then((res) => {
      dispatch({ type: gradeConstants.DELETE_GRADE_SUCCESS });
    })
    .catch((err) => {
      dispatch({
        type: gradeConstants.DELETE_GRADE_FAIL,
        error: err,
      });
    });
};

export const editGrade = (token, gradeId, title, score, comment) => (dispatch) => {
  const auth = { headers: { 'auth-token': token } };
  dispatch({ type: gradeConstants.EDIT_GRADE_START });
  agent
    .patch(`/grade/${gradeId}`, { title, score, comment }, auth)
    .then((res) => {
      console.log(res.data);
      dispatch({ type: gradeConstants.EDIT_GRADE_SUCCESS });
    })
    .catch((err) => {
      dispatch({
        type: gradeConstants.EDIT_GRADE_FAIL,
        error: err,
      });
    });
};
