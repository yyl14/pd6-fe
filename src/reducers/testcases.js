import { combineReducers } from 'redux';
import { problemConstants, submissionConstants } from '../actions/myClass/constant';

const byId = (state = {}, action) => {
  switch (action.type) {
    case problemConstants.FETCH_TESTCASE_UNDER_PROBLEM_SUCCESS: {
      const { problemId, testcases } = action.payload;
      return testcases.reduce((acc, item) => ({ ...acc, [item.id]: { ...item } }), state);
    }
    case problemConstants.BROWSE_TESTCASES_SUCCESS: {
      const { testcases } = action.payload;
      return testcases.reduce((acc, item) => ({ ...acc, [item.id]: { ...item } }), state);
    }
    case submissionConstants.BROWSE_TESTCASES_SUCCESS: {
      return action.payload.reduce((acc, item) => ({ ...acc, [item.id]: { ...item } }), state);
    }
    default:
      return state;
  }
};

const allIds = (state = [], action) => {
  switch (action.type) {
    case problemConstants.FETCH_TESTCASE_UNDER_PROBLEM_SUCCESS: {
      const { problemId, testcases } = action.payload;
      return [...new Set([...testcases.map((item) => item.id), ...state])];
    }
    case problemConstants.BROWSE_TESTCASES_SUCCESS: {
      const { testcases } = action.payload;
      return [...new Set([...testcases.map((item) => item.id), ...state])];
    }
    case submissionConstants.BROWSE_TESTCASES_SUCCESS: {
      return [...new Set([...action.payload.map((item) => item.id), ...state])];
    }
    default:
      return state;
  }
};

export default combineReducers({ byId, allIds });
