import { combineReducers } from 'redux';
import { problemConstants, submissionConstants } from '../actions/myClass/constant';

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
    case problemConstants.BROWSE_JUDGE_CASES_SUCCESS: {
      return action.payload.reduce(
        (acc, item) => ({ ...acc, [item.testcase_id]: { ...item, verdict: verdictMapping.get(item.verdict) } }),
        state,
      );
    }
    case submissionConstants.BROWSE_JUDGE_CASES_SUCCESS: {
      return action.payload.reduce(
        (acc, item) => ({ ...acc, [item.testcase_id]: { ...item, verdict: verdictMapping.get(item.verdict) } }),
        state,
      );
    }
    default:
      return state;
  }
};

const allIds = (state = [], action) => {
  switch (action.type) {
    case problemConstants.BROWSE_JUDGE_CASES_SUCCESS: {
      return [...new Set(...state, ...action.payload.map((item) => item.testcase_id))];
    }
    case submissionConstants.BROWSE_JUDGE_CASES_SUCCESS: {
      return [...new Set(...state, ...action.payload.map((item) => item.testcase_id))];
    }
    default:
      return state;
  }
};

export default combineReducers({ byId, allIds });
