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
      const { data, judgments, accounts } = action.payload;
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
      return state.includes(parseInt(submissionId, 10)) ? state : state.concat([parseInt(submissionId, 10)]);
    }
    case submissionConstants.FETCH_SUBMISSIONS_SUCCESS: {
      const { data } = action.payload;
      return data.map((item) => item.id);
    }

    default:
      return state;
  }
};

export default combineReducers({ byId, allIds });
