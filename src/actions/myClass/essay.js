import agent from '../agent';
import { essayConstants } from './constant';

const readEssay = (token, essayId) => async (dispatch) => {
  dispatch({ type: essayConstants.READ_ESSAY_START });
  const auth = {
    headers: {
      'Auth-Token': token,
    },
  };
  try {
    const res = await agent.get(`/essay/${essayId}`, auth);
    console.log('res1', res);
    if (res.data.success) {
      dispatch({
        type: essayConstants.READ_ESSAY_SUCCESS,
        payload: res.data.data,
      });
    } else {
      dispatch({
        type: essayConstants.READ_ESSAY_FAIL,
        errors: res.data.errors,
      });
    }
  } catch (err) {
    dispatch({
      type: essayConstants.READ_ESSAY_FAIL,
      errors: err,
    });
  }
};

const editEssay = (token, essayId, label, title, description) => async (dispatch) => {
  dispatch({ type: essayConstants.EDIT_ESSAY_START });
  console.log('editEssay', editEssay);
  const auth = {
    headers: {
      'Auth-Token': token,
    },
  };
  const body = {
    challenge_label: label,
    title,
    description,
  };
  try {
    const res = await agent.patch(`/essay/${essayId}`, body, auth);
    console.log('editRes', res);
    if (res.data.success) {
      dispatch({
        type: essayConstants.EDIT_ESSAY_SUCCESS,
        payload: { essayId, content: body },
      });
    } else {
      dispatch({
        type: essayConstants.EDIT_ESSAY_FAIL,
        errors: res.data.errors,
      });
    }
  } catch (err) {
    dispatch({
      type: essayConstants.EDIT_ESSAY_FAIL,
      errors: err,
    });
  }
};

const deleteEssay = (token, essayId) => async (dispatch) => {
  dispatch({ type: essayConstants.DELETE_ESSAY_START });
  const auth = {
    headers: {
      'Auth-Token': token,
    },
  };
  try {
    const res = await agent.delete(`/essay/${essayId}`, auth);
    console.log('res2:', res);
    if (res.data.success) {
      dispatch({
        type: essayConstants.DELETE_ESSAY_SUCCESS,
        payload: essayId,
      });
    } else {
      dispatch({
        type: essayConstants.DELETE_ESSAY_FAIL,
        errors: res.data.error,
      });
    }
  } catch (err) {
    dispatch({
      type: essayConstants.DELETE_ESSAY_FAIL,
      errors: err,
    });
  }
};

const browseEssaySubmission = (token, essayId) => async (dispatch) => {
  dispatch({ type: essayConstants.BROWSE_ESSAY_SUBMISSION_START });
  const auth = {
    headers: {
      'Auth-Token': token,
    },
  };
  try {
    const res = await agent.get(`/essay/${essayId}/essay-submission`, auth);
    // console.log('res', res);
    if (res.data.success) {
      dispatch({
        type: essayConstants.BROWSE_ESSAY_SUBMISSION_SUCCESS,
        payload: res.data.data.data,
      });
    } else {
      dispatch({
        type: essayConstants.BROWSE_ESSAY_SUBMISSION_FAIL,
        errors: res.data.errors,
      });
    }
  } catch (err) {
    dispatch({
      type: essayConstants.BROWSE_ESSAY_SUBMISSION_FAIL,
      errors: err,
    });
  }
};

const uploadEssay = (token, essayId, file) => async (dispatch) => {
  dispatch({ type: essayConstants.UPLOAD_ESSAY_SUBMISSION_START });
  const config = {
    headers: {
      'Auth-Token': token,
      'Content-Type': 'multipart/form-data',
    },
    params: {
      essay_Id: essayId,
    },
  };
  const blob = new Blob([file]);
  const formData = new FormData();
  formData.append('essay_file', blob);

  try {
    const res = await agent.post(`/essay/${essayId}/essay-submission`, formData, config);
    // console.log('res', res);
    if (res.data.success) {
      dispatch({
        type: essayConstants.UPLOAD_ESSAY_SUBMISSION_SUCCESS,
        payload: res.data.data,
      });
    } else {
      dispatch({
        type: essayConstants.UPLOAD_ESSAY_SUBMISSION_FAIL,
        errors: res.data.errors,
      });
    }
  } catch (err) {
    dispatch({
      type: essayConstants.UPLOAD_ESSAY_SUBMISSION_FAIL,
      errors: err,
    });
  }
};

const readEssaySubmission = (token, essaySubmissionId) => async (dispatch) => {
  dispatch({ type: essayConstants.READ_ESSAY_SUBMISSION_START });
  const auth = {
    headers: {
      'Auth-Token': token,
    },
  };
  try {
    const res = await agent.get(`/essay-submission/${essaySubmissionId}`, auth);
    // console.log('res', res);
    if (res.data.success) {
      dispatch({
        type: essayConstants.READ_ESSAY_SUBMISSION_SUCCESS,
        payload: res.data.data,
      });
    } else {
      dispatch({
        type: essayConstants.READ_ESSAY_SUBMISSION_FAIL,
        errors: res.data.errors,
      });
    }
  } catch (err) {
    dispatch({
      type: essayConstants.READ_ESSAY_SUBMISSION_FAIL,
      errors: err,
    });
  }
};

const reUploadEssay = (token, essaySubmissionId, file) => async (dispatch) => {
  dispatch({ type: essayConstants.REUPLOAD_ESSAY_SUBMISSION_START });
  const auth = {
    headers: {
      'Auth-Token': token,
    },
    'Content-Type': 'multipart/form-data',
  };
  const blob = new Blob([file]);
  const formData = new FormData();
  formData.append('essay_file', blob);

  try {
    const res = await agent.put(`/essay-submission/${essaySubmissionId}`, formData, auth);
    if (res.data.success) {
      dispatch({
        type: essayConstants.REUPLOAD_ESSAY_SUBMISSION_SUCCESS,
      });
    } else {
      dispatch({
        type: essayConstants.REUPLOAD_ESSAY_SUBMISSION_FAIL,
        errors: res.data.errors,
      });
    }
  } catch (err) {
    dispatch({
      type: essayConstants.REUPLOAD_ESSAY_SUBMISSION_FAIL,
      errors: err,
    });
  }
};

export {
  readEssay, editEssay, deleteEssay, browseEssaySubmission, uploadEssay, readEssaySubmission, reUploadEssay,
};
