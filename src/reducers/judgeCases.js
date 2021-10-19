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
  [null, null],
]);

const byId = (state = {}, action) => {
  switch (action.type) {
    case problemConstants.BROWSE_JUDGE_CASES_SUCCESS: {
      const { data } = action.payload;
      return data.reduce(
        (acc, item) => ({ ...acc, [item.testcase_id]: { ...item, verdict: verdictMapping.get(item.verdict) } }),
        state,
      );
    }
    case submissionConstants.BROWSE_JUDGE_CASES_SUCCESS: {
      const { data } = action.payload;
      return data.reduce(
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
      const { data } = action.payload;
      return [...new Set([...state, ...data.map((item) => item.testcase_id)])];
    }
    case submissionConstants.BROWSE_JUDGE_CASES_SUCCESS: {
      const { data } = action.payload;
      return [...new Set([...state, ...data.map((item) => item.testcase_id)])];
    }
    default:
      return state;
  }
};

export default combineReducers({ byId, allIds });
