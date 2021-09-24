import { combineReducers } from 'redux';
import { submissionConstants, problemConstants } from '../actions/myClass/constant';
import { viewConstants } from '../actions/api/constant';

const byId = (state = {}, action) => {
  switch (action.type) {
    case viewConstants.BROWSE_SUBMISSION_UNDER_CLASS_SUCCESS: {
      const { data } = action.payload;
      return data.submissions.reduce((acc, item) => ({ ...acc, [item.id]: { ...item } }), state);
    }
    case submissionConstants.FETCH_SUBMISSION_SUCCESS: {
      const { submissionId, data } = action.payload;
      return {
        ...state,
        [Number(submissionId)]: data,
      };
    }
    case problemConstants.READ_SUBMISSION_SUCCESS: {
      return action.payload.reduce((acc, item) => ({ ...acc, [item.id]: { ...item } }), {});
    }

    default:
      return state;
  }
};

const allIds = (state = [], action) => {
  switch (action.type) {
    case viewConstants.BROWSE_SUBMISSION_UNDER_CLASS_SUCCESS: {
      const { data } = action.payload;
      return [...new Set([...data.submissions.map((item) => item.id), ...state])];
    }
    case problemConstants.READ_SUBMISSION_SUCCESS: {
      return action.payload.map((item) => item.id);
    }
    case submissionConstants.FETCH_SUBMISSION_SUCCESS: {
      const { submissionId } = action.payload;
      return state.includes(Number(submissionId)) ? state : state.concat([Number(submissionId)]);
    }

    default:
      return state;
  }
};

export default combineReducers({ byId, allIds });
