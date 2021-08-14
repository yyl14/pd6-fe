import { combineReducers } from 'redux';
import { commonConstants } from '../actions/common/constant';

const byId = (state = {}, action) => {
  switch (action.type) {
    case commonConstants.FETCH_CLASS_MEMBERS_SUCCESS: {
      console.log('fetch member success');
      const { data } = action.payload;
      return data.reduce((acc, item) => ({ ...acc, [item.member_id]: item }), state);
    }
    default:
      return state;
  }
};

const allIds = (state = [], action) => {
  switch (action.type) {
    case commonConstants.FETCH_CLASS_MEMBERS_SUCCESS: {
      const { data } = action.payload;
      return [...new Set([...data.map((item) => item.member_id), ...state])];
    }
    default:
      return state;
  }
};

export default combineReducers({ byId, allIds });
