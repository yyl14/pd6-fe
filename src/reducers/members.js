import { combineReducers } from 'redux';
import { courseConstants } from '../actions/constant';

const byId = (state = {}, action) => {
  switch (action.type) {
    case courseConstants.FETCH_MEMBERS_SUCCESS: {
      const { data } = action.payload;
      return data.reduce((acc, item) => ({ ...acc, [item.member_id]: item }), state);
    }
    default:
      return state;
  }
};

const allIds = (state = [], action) => {
  switch (action.type) {
    case courseConstants.FETCH_MEMBERS_SUCCESS: {
      const { data } = action.payload;
      return [...new Set([...data.map((item) => item.id), ...state])];
    }
    default:
      return state;
  }
};

export default combineReducers({ byId, allIds });
