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
    .catch((error) => {
      dispatch({
        type: gradeConstants.FETCH_CLASS_GRADE_FAIL,
        error: error,
      });
    });
};

// export const addClassGrade = (token, classId) => (dispatch) => { //need required body
//   const auth = { headers: { 'auth-token': token } };
//   dispatch({ type: gradeConstants.ADD_CLASS_GRADE_START });
//   agent
//     .post(`/class/${classId}/grade`, auth)
//     .then((res) => {
//       dispatch({ type: gradeConstants.ADD_CLASS_GRADE_SUCCESS });
//     })
//     .catch((error) => {
//       dispatch({
//         type: gradeConstants.ADD_CLASS_GRADE_FAIL,
//         payload: error,
//       });
//     });
// };

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
    .catch((error) => {
      dispatch({
        type: gradeConstants.FETCH_ACCOUNT_GRADE_FAIL,
        error: error,
      });
    });
};

export const fetchGrade = (token, gradeId) => (dispatch) => {
  const auth = { headers: { 'auth-token': token } };
  dispatch({ type: gradeConstants.FETCH_GRADE_START });
  agent
    .get(`/grade/${gradeId}`, auth)
    .then((res) => {
      dispatch({
        type: gradeConstants.FETCH_GRADE_SUCCESS,
        payload: res.data.data,
      });
    })
    .catch((error) => {
      dispatch({
        type: gradeConstants.FETCH_GRADE_FAIL,
        error: error,
      });
    });
};

export const deleteGrade = (token, gradeId) => (dispatch) => {
  const auth = { headers: { 'auth-token': token } };
  dispatch({ type: gradeConstants.DELETE_GRADE_START });
  agent
    .delete(`/grade/${gradeId}`, auth)
    .then((res) => {
      dispatch({ type: gradeConstants.DELETE_GRADE_SUCCESS });
    })
    .catch((error) => {
      dispatch({
        type: gradeConstants.DELETE_GRADE_FAIL,
        error: error,
      });
    });
};

export const editGrade = (token, gradeId, title, score, comment) => (dispatch) => {
  const auth = { headers: { 'auth-token': token } };
  dispatch({ type: gradeConstants.EDIT_GRADE_START });
  agent
    .patch(`/grade/${gradeId}`, { title, score, comment }, auth)
    .then((res) => {
      dispatch({ type: gradeConstants.EDIT_GRADE_SUCCESS });
    })
    .catch((error) => {
      dispatch({
        type: gradeConstants.EDIT_GRADE_FAIL,
        error: error,
      });
    });
};
