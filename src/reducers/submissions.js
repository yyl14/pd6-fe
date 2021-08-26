import { combineReducers } from 'redux';
import { submissionConstants, problemConstants } from '../actions/myClass/constant';

const byId = (state = {}, action) => {
  switch (action.type) {
    case submissionConstants.FETCH_ALL_SUBMISSIONS_SUCCESS: {
      const { data } = action.payload;
      return data.reduce((acc, item) => ({ ...acc, [item.id]: { ...item } }), state.submissions);
    }
    case submissionConstants.FETCH_SUBMISSION_SUCCESS: {
      const { submissionId, data } = action.payload;
      return {
        ...state,
        [submissionId]: data,
      };
    }
    case problemConstants.READ_SUBMISSION_SUCCESS: {
      return action.payload.reduce((acc, item) => ({ ...acc, [item.id]: { ...item } }), {});
    }

    case submissionConstants.FETCH_SUBMISSIONS_SUCCESS: {
      const { data } = action.payload;
      return data.reduce((acc, item) => ({ ...acc, [item.id]: { ...item } }), state);
    }
    default:
      return state;
  }
};

const allIds = (state = [], action) => {
  switch (action.type) {
    case problemConstants.READ_SUBMISSION_SUCCESS: {
      return action.payload.map((item) => item.id);
    }
    case submissionConstants.FETCH_ALL_SUBMISSIONS_SUCCESS: {
      const { data } = action.payload;
      return data.map((item) => item.id);
    }
    case submissionConstants.FETCH_SUBMISSION_SUCCESS: {
      const { submissionId, data } = action.payload;
      return state.includes(submissionId) ? state : state.concat([submissionId]);
    }
    case submissionConstants.FETCH_SUBMISSIONS_SUCCESS: {
      const { data } = action.payload;
      return [...new Set([...data.map((item) => item.id), ...state])];
    }
    // case problemConstants.READ_SUBMISSION_SUCCESS:
    //   return state.includes(action.payload.id) ? state : state.concat([action.payload.id]);

    default:
      return state;
  }
};

export default combineReducers({ byId, allIds });
