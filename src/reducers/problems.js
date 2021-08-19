import { combineReducers } from 'redux';
import { problemConstants } from '../actions/myClass/constant';

const byId = (state = {}, action) => {
  switch (action.type) {
    case problemConstants.READ_PROBLEM_SUCCESS:
      return action.payload;

    case problemConstants.BROWSE_TASKS_UNDER_CHALLENGE_SUCCESS:
      return action.payload.problem.reduce(
        (acc, item) => ({ ...acc, [item.id]: { ...item } }), {},
      );

    default:
      return state;
  }
};

const allIds = (state = [], action) => {
  switch (action.type) {
    case problemConstants.BROWSE_TASKS_UNDER_CHALLENGE_SUCCESS:
      return action.payload.problem.map((item) => item.id);
    default:
      return state;
  }
};

export default combineReducers({ byId, allIds });
