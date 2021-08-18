import agent from '../agent';
import { gradeConstants } from './constant';

export const fetchClassGrade = (token, classId) => (dispatch) => {
  const auth = { headers: { 'auth-token': token } };
  dispatch({ type: gradeConstants.FETCH_CLASS_GRADE_START });
  agent
    .get(`/class/${classId}/grade`, auth)
    .then((res) => {
      dispatch({
        type: gradeConstants.FETCH_CLASS_GRADE_SUCCESS,
        payload: { classId, data: res.data.data },
      });
    })
    .catch((err) => {
      dispatch({
        type: gradeConstants.FETCH_CLASS_GRADE_FAIL,
        error: err,
      });
    });
};

export const addClassGrade = (token, classId, gradeFile) => async (dispatch) => {
  try {
    const auth = {
      headers: {
        'Auth-Token': token,
      },
    };
    dispatch({ type: gradeConstants.ADD_CLASS_GRADE_START });
    const res = await agent.post(`/class/${classId}/grade`, { grade_file: gradeFile }, auth);
    console.log(res);
    dispatch({ type: gradeConstants.ADD_CLASS_GRADE_SUCCESS });
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

export const fetchGradeTemplate = (token) => async (dispatch) => {
  try {
    const auth = {
      headers: {
        'Auth-Token': token,
      },
    };
    dispatch({ type: gradeConstants.FETCH_GRADE_TEMPLATE_START });
    const res = await agent.get('/grade/template', auth);
    dispatch({ type: gradeConstants.FETCH_GRADE_TEMPLATE_SUCCESS, payload: res.data.data });
  } catch (err) {
    dispatch({
      type: gradeConstants.FETCH_GRADE_TEMPLATE_FAIL,
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
