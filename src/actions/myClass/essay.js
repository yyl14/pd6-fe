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

export { readEssay, editEssay, deleteEssay };
