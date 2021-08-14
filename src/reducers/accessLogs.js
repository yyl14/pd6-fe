import { combineReducers } from 'redux';
import { systemConstants } from '../actions/admin/constant';

const byId = (state = {}, action) => {
  switch (action.type) {
    case systemConstants.FETCH_ACCESS_LOG_SUCCESS: {
      const data = Object.values(action.payload);
      return data.reduce((acc, item) => ({ ...acc, [item.id]: { ...item } }), state.logs);
    }
    default:
      return state;
  }
};

const allIds = (state = [], action) => {
  switch (action.type) {
    case systemConstants.FETCH_ACCESS_LOG_SUCCESS: {
      const data = Object.values(action.payload);
      return data.map((item) => item.id);
    }
    default:
      return state;
  }
};

export default combineReducers({ byId, allIds });
