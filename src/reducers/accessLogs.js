import { combineReducers } from 'redux';

import { viewConstants } from '../actions/api/constant';

const byId = (state = {}, action) => {
  switch (action.type) {
    case viewConstants.BROWSE_ACCESS_LOG_SUCCESS: {
      const { data } = action.payload;
      return data.reduce((acc, item) => ({ ...acc, [item.id]: { ...item } }), state);
    }
    default:
      return state;
  }
};

const allIds = (state = [], action) => {
  switch (action.type) {
    case viewConstants.BROWSE_ACCESS_LOG_SUCCESS: {
      const { data } = action.payload;
      return [...new Set([...data.map((item) => item.id), ...state])];
    }
    default:
      return state;
  }
};

export default combineReducers({ byId, allIds });
