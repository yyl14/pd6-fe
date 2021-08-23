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
    const essayInfo = await agent.get(`/essay/${essayId}`, auth);
    console.log('essayInfo', essayInfo);
    if (essayInfo.data.success) {
      dispatch({
        type: essayConstants.READ_ESSAY_SUCCESS,
        payload: essayInfo.data.data,
      });
    } else {
      dispatch({
        type: essayConstants.READ_ESSAY_FAIL,
        errors: essayInfo.data.errors,
      });
    }
  } catch (err) {
    dispatch({
      type: essayConstants.READ_ESSAY_FAIL,
      errors: err,
    });
  }
};

const addEssay = (token, challengeId) => async (dispatch) => {
  dispatch({ type: essayConstants.ADD_ESSAY_START });
  const auth = {
    headers: {
      'Auth-Token': token,
    },
  };
  try {
    const addEssaysInfo = await agent.post(`/challenge/${challengeId}/essay`, auth);
    if (addEssaysInfo.data.success) {
      dispatch({
        type: essayConstants.ADD_ESSAY_SUCCESS,
        payload: addEssaysInfo.data.data,
      });
      // console.log('addEssaysInfo', addEssaysInfo);
    } else {
      dispatch({
        type: essayConstants.ADD_ESSAY_FAIL,
        errors: addEssaysInfo.data.errors,
      });
    }
  } catch (err) {
    dispatch({
      type: essayConstants.ADD_ESSAY_FAIL,
      errors: err,
    });
  }
};

const editEssay = (token, essayId, label, title, description) => async (dispatch) => {
  dispatch({ type: essayConstants.EDIT_ESSAY_START });
  // console.log('editEssay', editEssay);
  const auth = {
    headers: {
      'Auth-Token': token,
    },
  };
  const body = {
    label,
    title,
    description,
  };
  try {
    const editEssaysInfo = await agent.patch(`/essay/${essayId}`, body, auth);
    // console.log('editEssaysInfo', editEssaysInfo);
    if (editEssaysInfo.data.success) {
      dispatch({
        type: essayConstants.EDIT_ESSAY_SUCCESS,
        payload: { essayId, content: body },
      });
    } else {
      dispatch({
        type: essayConstants.EDIT_ESSAY_FAIL,
        errors: editEssaysInfo.data.errors,
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
    const browseEssaySubmissionInfo = await agent.get(`/essay/${essayId}/essay-submission`, auth);
    console.log('browseEssaySubmissionInfo', browseEssaySubmissionInfo);
    if (browseEssaySubmissionInfo.data.success) {
      dispatch({
        type: essayConstants.BROWSE_ESSAY_SUBMISSION_SUCCESS,
        payload: browseEssaySubmissionInfo.data.data,
      });
    } else {
      dispatch({
        type: essayConstants.BROWSE_ESSAY_SUBMISSION_FAIL,
        errors: browseEssaySubmissionInfo.data.errors,
      });
    }
  } catch (err) {
    dispatch({
      type: essayConstants.BROWSE_ESSAY_SUBMISSION_FAIL,
      errors: err,
    });
  }
};

const uploadEssay = (token, essayId) => async (dispatch) => {
  dispatch({ type: essayConstants.UPLOAD_ESSAY_SUBMISSION_START });
  const auth = {
    headers: {
      'Auth-Token': token,
    },
  };
  try {
    const uploadEssayInfo = await agent.post(`/essay/${essayId}/essay-submission`, auth);
    console.log('uploadEssayInfo', uploadEssayInfo);
    if (uploadEssayInfo.data.success) {
      dispatch({
        type: essayConstants.UPLOAD_ESSAY_SUBMISSION_SUCCESS,
        payload: uploadEssayInfo.data.data,
      });
    } else {
      dispatch({
        type: essayConstants.UPLOAD_ESSAY_SUBMISSION_FAIL,
        errors: uploadEssayInfo.data.errors,
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
    const readEssaySubmissionInfo = await agent.get(`/essay-submission/${essaySubmissionId}`, auth);
    console.log('readEssaySubmissionInfo', readEssaySubmissionInfo);
    if (readEssaySubmissionInfo.data.success) {
      dispatch({
        type: essayConstants.READ_ESSAY_SUBMISSION_SUCCESS,
        payload: readEssaySubmissionInfo.data.data,
      });
    } else {
      dispatch({
        type: essayConstants.READ_ESSAY_SUBMISSION_FAIL,
        errors: readEssaySubmissionInfo.data.errors,
      });
    }
  } catch (err) {
    dispatch({
      type: essayConstants.READ_ESSAY_SUBMISSION_FAIL,
      errors: err,
    });
  }
};

const reUploadEssay = (token, essaySubmissionId) => async (dispatch) => {
  dispatch({ type: essayConstants.REUPLOAD_ESSAY_SUBMISSION_START });
  const auth = {
    headers: {
      'Auth-Token': token,
    },
  };
  try {
    const reUploadEssayInfo = await agent.put(`/essay-submission/${essaySubmissionId}`, auth);
    if (reUploadEssayInfo.data.success) {
      dispatch({
        type: essayConstants.REUPLOAD_ESSAY_SUBMISSION_SUCCESS,
        payload: reUploadEssayInfo.data.data,
      });
    } else {
      dispatch({
        type: essayConstants.REUPLOAD_ESSAY_SUBMISSION_FAIL,
        errors: reUploadEssayInfo.data.errors,
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
  readEssay,
  addEssay,
  editEssay,
  deleteEssay,
  browseEssaySubmission,
  uploadEssay,
  readEssaySubmission,
  reUploadEssay,
};
