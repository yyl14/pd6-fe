import { combineReducers } from 'redux';
import { accountConstants } from '../actions/admin/constants';

const byId = (state = {}, action) => {
  switch (action.type) {
    case accountConstants.FETCH_STUDENT_CARD_SUCCESS: {
      const { id, data } = action.payload;
      return data;
    }

    default:
      return state;
  }
};

const allIds = (state = [], action) => {
  switch (action.type) {
    case accountConstants.FETCH_STUDENT_CARD_SUCCESS: {
      const { id, data } = action.payload;
      return data.map((item) => item.id);
    }

    default:
      return state;
  }
};

export default combineReducers(byId, allIds);
