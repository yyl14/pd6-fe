import { combineReducers } from 'redux';
import { systemConstants } from '../actions/admin/constant';

const byId = (state = {}, action) => {
  switch (action.type) {
    case systemConstants.FETCH_ACCESS_LOG_SUCCESS: {
      const { data } = action.payload;
      console.log(data);
      return data.reduce((acc, item) => ({ ...acc, [item.id]: { ...item } }), state);
    }
    default:
      return state;
  }
};

const allIds = (state = [], action) => {
  switch (action.type) {
    case systemConstants.FETCH_ACCESS_LOG_SUCCESS: {
      const { data } = action.payload;
      return [...new Set([...data.map((item) => item.id), ...state])];
    }
    default:
      return state;
  }
};

export default combineReducers({ byId, allIds });
