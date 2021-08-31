import agent from '../agent';
import { essayConstants } from './constant';

const browseEssaySubmission = (token, essayId) => async (dispatch) => {
  dispatch({ type: essayConstants.BROWSE_ESSAY_SUBMISSION_START });
  const auth = {
    headers: {
      'Auth-Token': token,
    },
  };
  try {
    const res = await agent.get(`/essay/${essayId}/essay-submission`, auth);
    console.log('res:', res);
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
  };
  const formData = new FormData();
  formData.append('essay_file', file);

  try {
    const res = await agent.post(`/essay/${essayId}/essay-submission`, formData, config);
    console.log('upload:', res);
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

const downloadAllEssaySubmission = (essayId, as_attachment, token) => async (dispatch) => {
  dispatch({ type: essayConstants.DOWNLOAD_ALL_ESSAY_SUBMISSION_START });
  const auth = {
    headers: {
      'Auth-Token': token,
    },
  };

  try {
    const res = await agent.post(`/essay/${essayId}/all-essay-submission`, auth);
    console.log('downloadFile', res);
    if (res.data.success) {
      dispatch({
        type: essayConstants.DOWNLOAD_ALL_ESSAY_SUBMISSION_SUCCESS,
        payload: res.data.data,
      });
    } else {
      dispatch({
        type: essayConstants.DOWNLOAD_ALL_ESSAY_SUBMISSION_FAIL,
        errors: res.data.errors,
      });
    }
  } catch (err) {
    dispatch({
      type: essayConstants.DOWNLOAD_ALL_ESSAY_SUBMISSION_FAIL,
      errors: err,
    });
  }
};

export {
  browseEssaySubmission, uploadEssay, readEssaySubmission, reUploadEssay, downloadAllEssaySubmission,
};
