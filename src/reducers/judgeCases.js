import { combineReducers } from 'redux';
import { problemConstants } from '../actions/myClass/constant';

const byId = (state = {}, action) => {
  switch (action.type) {
    case problemConstants.BROWSE_JUDGE_CASES_SUCCESS: {
      return action.payload.reduce((acc, item) => ({ ...acc, [item.testcase_id]: { ...item } }), {});
    }
    default:
      return state;
  }
};

const allIds = (state = [], action) => {
  switch (action.type) {
    case problemConstants.BROWSE_JUDGE_CASES_SUCCESS: {
      return action.payload.map((item) => item.testcase_id);
    }
    default:
      return state;
  }
};

export default combineReducers({ byId, allIds });
