import { combineReducers } from 'redux';
import { problemConstants } from '../actions/myClass/constant';

const byId = (state = {}, action) => {
  switch (action.type) {
    case problemConstants.FETCH_TESTCASE_UNDER_PROBLEM_SUCCESS: {
      const { problemId, testcases } = action.payload;
      return testcases.reduce((acc, item) => ({ ...acc, [item.id]: { ...item } }), state);
    }
    case problemConstants.READ_TESTCASE_SUCCESS: {
      return {
        ...state,
        [action.payload.id]: action.payload,
      };
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
    case problemConstants.READ_TESTCASE_SUCCESS: {
      return state.includes(action.payload.id) ? state : state.concat([action.payload.id]);
    }
    default:
      return state;
  }
};

export default combineReducers({ byId, allIds });
