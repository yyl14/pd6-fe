import { combineReducers } from 'redux';
import { commonConstants } from '../actions/common/constant';
import { accountConstants } from '../actions/admin/constants';

const byId = (state = {}, action) => {
  switch (action.type) {
    case commonConstants.GET_INSTITUTE_SUCCESS: {
      return action.payload.reduce((acc, item) => ({ ...acc, [item.id]: { ...item } }), {});
    }
    case accountConstants.FETCH_INSTITUTES_SUCCESS: {
      return action.payload.reduce((acc, item) => ({ ...acc, [item.id]: { ...item } }), state.institutes);
    }
    case accountConstants.FETCH_INSTITUTE_SUCCESS: {
      return { ...state.institutes.byId, [action.payload.id]: action.payload };
    }
    default:
      return state;
  }
};

const allIds = (state = [], action) => {
  switch (action.type) {
    case commonConstants.GET_INSTITUTE_SUCCESS:
      return action.payload.map((item) => item.id);

    case accountConstants.FETCH_INSTITUTES_SUCCESS:
      return action.payload.map((item) => item.id);

    case accountConstants.FETCH_INSTITUTE_SUCCESS:
      return state.institutes.allIds.includes(action.payload.id) ? state.institutes.allIds : state.institutes.allIds.concat([action.payload.id]);

    default:
      return state;
  }
};

export default combineReducers({ byId, allIds });
