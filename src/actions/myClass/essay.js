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
    const addEssaysInfo = await agent.get(`/challenge/${challengeId}/essay`, auth);
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

const editEssay = (token, essayId) => async (dispatch) => {
  dispatch({ type: essayConstants.EDIT_ESSAY_START });
  const auth = {
    headers: {
      'Auth-Token': token,
    },
  };
  try {
    const editEssaysInfo = await agent.get(`/essay/${essayId}`, auth);
    // console.log('editEssaysInfo', editEssaysInfo);
    if (editEssaysInfo.data.success) {
      dispatch({
        type: essayConstants.EDIT_ESSAY_SUCCESS,
        payload: editEssaysInfo.data.data,
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

const deleteEssay = (token, essayId) => (dispatch) => {
  dispatch({ type: essayConstants.DELETE_ESSAY_START });
  const auth = {
    headers: {
      'Auth-Token': token,
    },
  };

  agent
    .delete(`/essay/${essayId}`, auth)
    .then((res) => {
      dispatch({
        type: essayConstants.DELETE_ESSAY_SUCCESS,
      });
      // console.log(res);
    })
    .catch((error) => {
      dispatch({
        type: essayConstants.DELETE_ESSAY_FAIL,
        errors: error,
      });
    });
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
    const uploadEssayInfo = await agent.get(`/essay/${essayId}/essay-submission`, auth);
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
    const reUploadEssayInfo = await agent.get(`/essay-submission/${essaySubmissionId}`, auth);
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
