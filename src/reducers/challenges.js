import { combineReducers } from 'redux';
import { challengeConstants } from '../actions/myClass/constant';

const byId = (state = {}, action) => {
  switch (action.type) {
    case challengeConstants.FETCH_CHALLENGES_SUCCESS: {
      const { data } = action.payload;
      return data.reduce((acc, item) => ({
        ...acc,
        [item.id]: {
          ...item,
          problemIds: state[item.id] ? state[item.id].problemIds : [],
        },
      }), state); // to be tested
    }
    default:
      return state;
  }
};

const allIds = (state = [], action) => {
  switch (action.type) {
    case challengeConstants.FETCH_CHALLENGES_SUCCESS: {
      const { data } = action.payload;
      return data.map((item) => item.id);
    }

    default:
      return state;
  }
};

export default combineReducers(byId, allIds);
