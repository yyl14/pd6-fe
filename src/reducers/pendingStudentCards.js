import { combineReducers } from 'redux';
import { accountConstants } from '../actions/admin/constant';

const byId = (state = {}, action) => {
  switch (action.type) {
    case accountConstants.BROWSE_PENDING_STUDENT_CARDS_SUCCESS: {
      const { data } = action.payload;
      return data.reduce((acc, item) => ({ ...acc, [item.id]: { ...item } }), {});
    }
    default:
      return state;
  }
};

const allIds = (state = [], action) => {
  switch (action.type) {
    case accountConstants.BROWSE_PENDING_STUDENT_CARDS_SUCCESS: {
      const { data } = action.payload;
      return data.map((item) => item.id);
    }
    default:
      return state;
  }
};

export default combineReducers({ byId, allIds });
