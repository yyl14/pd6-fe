import { combineReducers } from 'redux';
import { problemConstants } from '../actions/myClass/constant';

const byId = (state = {}, action) => {
  switch (action.type) {
    case problemConstants.READ_SUBMISSION_SUCCESS: {
      return action.payload.reduce((acc, item) => ({ ...acc, [item.id]: { ...item } }), {});
    }
    default:
      return state;
  }
};

const allIds = (state = [], action) => {
  switch (action.type) {
    case problemConstants.READ_SUBMISSION_SUCCESS: {
      return action.payload.map((item) => item.id);
    }

    default:
      return state;
  }
};

export default combineReducers({ byId, allIds });
