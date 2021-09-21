import { combineReducers } from 'redux';
import { submissionConstants, problemConstants } from '../actions/myClass/constant';

const byId = (state = {}, action) => {
  switch (action.type) {
    // case submissionConstants.FETCH_JUDGEMENT_SUCCESS: {
    //   const { data } = action.payload;
    //   return data.reduce((acc, item) => ({ ...acc, [item.id]: { ...item } }), state);
    // }
    case problemConstants.READ_SUBMISSION_JUDGE_SUCCESS: {
      return {
        ...state,
        [action.payload.id]: action.payload,
      };
    }
    case submissionConstants.READ_SUBMISSION_JUDGE_SUCCESS: {
      return {
        ...state,
        [action.payload.id]: action.payload,
      };
    }
    case submissionConstants.FETCH_SUBMISSIONS_SUCCESS: {
      const { judgments } = action.payload;
      return judgments.reduce((acc, item) => ({ ...acc, [item.id]: { ...item } }), state);
    }
    case problemConstants.VIEW_MY_SUBMISSION_UNDER_PROBLEM_SUCCESS: {
      const { judgments } = action.payload;
      return judgments.reduce((acc, item) => ({ ...acc, [item.id]: { ...item } }), state);
    }
    default:
      return state;
  }
};

const allIds = (state = [], action) => {
  switch (action.type) {
    // case submissionConstants.FETCH_JUDGEMENT_SUCCESS: {
    //   const { data } = action.payload;
    //   return [...new Set([...data.map((item) => item.id), ...state])];
    // }
    case problemConstants.READ_SUBMISSION_JUDGE_SUCCESS: {
      return [...new Set([...action.payload.id, ...state])];
    }
    case submissionConstants.READ_SUBMISSION_JUDGE_SUCCESS: {
      return [...new Set([...action.payload.id, ...state])];
    }
    case submissionConstants.FETCH_SUBMISSIONS_SUCCESS: {
      return [...new Set([...action.payload.judgments.map((item) => item.id), ...state])];
    }
    case problemConstants.VIEW_MY_SUBMISSION_UNDER_PROBLEM_SUCCESS: {
      return [...new Set([...action.payload.judgments.map((item) => item.id), ...state])];
    }
    default:
      return state;
  }
};

export default combineReducers({ byId, allIds });
