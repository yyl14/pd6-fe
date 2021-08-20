import { combineReducers } from 'redux';
import { problemConstants } from '../actions/myClass/constant';

const byId = (state = {}, action) => {
  switch (action.type) {
    case problemConstants.READ_SUBMISSION_JUDGE_SUCCESS: {
      return action.payload.reduce((acc, item) => ({ ...acc, [item.id]: { ...item } }), state);
    }
    default:
      return state;
  }
};

const allIds = (state = [], action) => {
  switch (action.type) {
    case problemConstants.READ_SUBMISSION_JUDGE_SUCCESS: {
      // return action.payload.map((item) => (state.includes(item.id) ? state : state.concat([item.id])));
      return action.payload.reduce((acc, item) => ([...acc, item.id]), []);
    }
    default:
      return state;
  }
};

export default combineReducers({ byId, allIds });
