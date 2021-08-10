import { combineReducers } from 'redux';
import { commonConstants } from '../actions/common/constant';

const byId = (state = {}, action) => {
  switch (action.type) {
    case commonConstants.GET_INSTITUTE_SUCCESS: {
      return action.payload.reduce((acc, item) => ({ ...acc, [item.id]: { ...item } }), {});
    }
    default:
      return state;
  }
};

const allIds = (state = [], action) => {
  switch (action.type) {
    case commonConstants.GET_INSTITUTE_SUCCESS:
      return action.payload.map((item) => item.id);
    default:
      return state;
  }
};

export default combineReducers({ byId, allIds });
