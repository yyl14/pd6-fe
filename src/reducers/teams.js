import { combineReducers } from 'redux';
import { teamConstants } from '../actions/myClass/constant';

const byId = (state = {}, action) => {
  switch (action.type) {
    default:
      return state;
  }
};

const allIds = (state = [], action) => {
  switch (action.type) {
    default:
      return state;
  }
};

export default combineReducers({ byId, allIds });
