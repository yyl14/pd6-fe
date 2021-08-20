import agent from '../agent';
import { essayConstants } from './constant';

const readEssays = (token, essayId) => async (dispatch) => {
  dispatch({ type: essayConstants.READ_ESSAY_START });
  const auth = {
    headers: {
      'Auth-Token': token,
    },
  };
  try {
    const essayInfo = await agent.get(`/essay/${essayId}`, auth);
    if (essayInfo.data.success) {
      dispatch({
        type: essayConstants.READ_ESSAY_SUCCESS,
        payload: essayInfo.data.data,
      });
      console.log('essayInfo', essayInfo);
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

const addEssays = (token, challengeId) => async (dispatch) => {
  dispatch({ type: essayConstants.ADD_ESSAY_START });
  const auth = {
    headers: {
      'Auth-Token': token,
    },
  };
  try {
    const addEssaysInfo = await agent.get('/essay/add', auth);
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

const editEssays = (token, essayId) => async (dispatch) => {
  dispatch({ type: essayConstants.EDIT_ESSAY_START });
  const auth = {
    headers: {
      'Auth-Token': token,
    },
  };
  try {
    const editEssaysInfo = await agent.get(`/essay/${essayId}`, auth);
    if (editEssaysInfo.data.success) {
      dispatch({
        type: essayConstants.EDIT_ESSAY_SUCCESS,
        payload: editEssaysInfo.data.data,
      });
      // console.log('editEssaysInfo', editEssaysInfo);
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

const deleteEssays = (token, essayId) => (dispatch) => {
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
      // console.log();
    })
    .catch((error) => {
      dispatch({
        type: essayConstants.DELETE_ESSAY_FAIL,
        errors: error,
      });
    });
};

export {
  readEssays,
  addEssays,
  editEssays,
  deleteEssays,
};
