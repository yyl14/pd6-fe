import { combineReducers } from 'redux';
import { submissionConstants, problemConstants } from '../actions/myClass/constant';

const verdictMapping = new Map([
  ['ACCEPTED', 'Accepted'],
  ['WRONG ANSWER', 'Wrong Answer'],
  ['MEMORY LIMIT EXCEED', 'Memory Limit Exceed'],
  ['TIME LIMIT EXCEED', 'Time Limit Exceed'],
  ['RUNTIME ERROR', 'Runtime Error'],
  ['COMPILE ERROR', 'Compile Error'],
  ['CONTACT MANAGER', 'Contact Manager'],
  ['FORBIDDEN ACTION', 'Forbidden Action'],
  ['SYSTEM ERROR', 'System Error'],
]);

const byId = (state = {}, action) => {
  switch (action.type) {
    case submissionConstants.FETCH_JUDGEMENT_SUCCESS: {
      const { data } = action.payload;
      return data.reduce(
        (acc, item) => ({ ...acc, [item.id]: { ...item, verdict: verdictMapping.get(item.verdict) } }),
        state.judgments,
      );
    }
    case problemConstants.READ_SUBMISSION_JUDGE_SUCCESS: {
      return {
        ...state,
        [action.payload.id]: { ...action.payload, verdict: verdictMapping.get(action.payload.verdict) },
      };
    }
    case submissionConstants.READ_SUBMISSION_JUDGE_SUCCESS: {
      return {
        ...state,
        [action.payload.id]: { ...action.payload, verdict: verdictMapping.get(action.payload.verdict) },
      };
    }
    case submissionConstants.FETCH_SUBMISSIONS_SUCCESS: {
      const { judgments } = action.payload;
      return judgments.reduce(
        (acc, item) => ({ ...acc, [item.id]: { ...item, verdict: verdictMapping.get(item.verdict) } }),
        state,
      );
    }
    case problemConstants.VIEW_MY_SUBMISSION_UNDER_PROBLEM_SUCCESS: {
      const { judgments } = action.payload;
      return judgments.reduce((acc, item) => ({ ...acc, [item.id]: { ...item, verdict: verdictMapping.get(item.verdict) } }), state);
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
