import agent from '../agent';
import { essayConstants } from './constant';

const readEssaySubmission = (token, essaySubmissionId) => async (dispatch) => {
  try {
    const config = {
      headers: {
        'auth-token': token,
      },
    };
    dispatch({ type: essayConstants.READ_ESSAY_SUBMISSION_START });
    const res = await agent.get(`/essay-submission/${essaySubmissionId}`, config);
    dispatch({
      type: essayConstants.READ_ESSAY_SUBMISSION_SUCCESS,
      payload: res.data.data,
    });
  } catch (error) {
    dispatch({
      type: essayConstants.READ_ESSAY_SUBMISSION_FAIL,
      error,
    });
  }
};

const uploadEssay = (token, essayId, file) => async (dispatch) => {
  try {
    dispatch({ type: essayConstants.UPLOAD_ESSAY_SUBMISSION_START });
    const config = {
      headers: {
        'auth-token': token,
        'Content-Type': 'multipart/form-data',
      },
    };
    const formData = new FormData();
    formData.append('essay_file', file);

    const res = await agent.post(`/essay/${essayId}/essay-submission`, formData, config);
    dispatch({
      type: essayConstants.UPLOAD_ESSAY_SUBMISSION_SUCCESS,
      payload: res.data.data,
    });
    dispatch(readEssaySubmission(token, res.data.data));
  } catch (error) {
    dispatch({
      type: essayConstants.UPLOAD_ESSAY_SUBMISSION_FAIL,
      error,
    });
  }
};

const reUploadEssay = (token, essaySubmissionId, file) => async (dispatch) => {
  try {
    dispatch({ type: essayConstants.RE_UPLOAD_ESSAY_SUBMISSION_START });
    const config = {
      headers: {
        'auth-token': token,
      },
      'Content-Type': 'multipart/form-data',
    };
    const formData = new FormData();
    formData.append('essay_file', file);

    await agent.put(`/essay-submission/${essaySubmissionId}`, formData, config);
    dispatch(readEssaySubmission(token, essaySubmissionId));
    dispatch({
      type: essayConstants.RE_UPLOAD_ESSAY_SUBMISSION_SUCCESS,
    });
  } catch (error) {
    dispatch({
      type: essayConstants.RE_UPLOAD_ESSAY_SUBMISSION_FAIL,
      error,
    });
  }
};

// CM only
const downloadAllEssaySubmission = (token, essayId, as_attachment) => async (dispatch) => {
  try {
    dispatch({ type: essayConstants.DOWNLOAD_ALL_ESSAY_SUBMISSION_START });
    const config = {
      headers: {
        'auth-token': token,
      },
      params: {
        as_attachment,
      },
    };

    await agent.post(`/essay/${essayId}/all-essay-submission`, {}, config);
    dispatch({ type: essayConstants.DOWNLOAD_ALL_ESSAY_SUBMISSION_SUCCESS });
  } catch (error) {
    dispatch({
      type: essayConstants.DOWNLOAD_ALL_ESSAY_SUBMISSION_FAIL,
      error,
    });
  }
};

const browseEssaySubmission = (essayId, token) => async (dispatch) => {
  try {
    const auth = {
      headers: {
        'Auth-Token': token,
      },
    };
    dispatch({ type: essayConstants.BROWSE_ESSAY_SUBMISSION_START });
    const res = await agent.get(`/essay/${essayId}/essay-submission`, auth);
    dispatch({
      type: essayConstants.BROWSE_ESSAY_SUBMISSION_SUCCESS,
      payload: res.data.data.data,
    });
  } catch (error) {
    dispatch({
      type: essayConstants.BROWSE_ESSAY_SUBMISSION_FAIL,
      error,
    });
  }
};

export {
  uploadEssay, readEssaySubmission, reUploadEssay, downloadAllEssaySubmission, browseEssaySubmission,
};
