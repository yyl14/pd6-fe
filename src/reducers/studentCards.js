import { combineReducers } from 'redux';
import { accountConstants } from '../actions/admin/constants';
import { userConstants } from '../actions/user/constants';

const byId = (state = {}, action) => {
  switch (action.type) {
    case accountConstants.FETCH_STUDENT_CARD_SUCCESS: {
      const { id, data } = action.payload;
      return data;
    }
    case userConstants.MAKE_SELF_STUDENT_CARD_DEFAULT_SUCCESS: {
      const { cardId, id } = action.payload;
      const newArray = [];
      state.forEach((item) => {
        const newItem = item;
        newItem.is_default = false;
        newArray.push(item);
      });
      newArray[cardId].is_default = true;
      return newArray;
    }
    case userConstants.GET_SELF_STUDENT_CARD_SUCCESS:
      return action.payload.reduce((acc, item) => ({ ...acc, [item.id]: { ...item } }), {});
    case userConstants.GET_SELF_STUDENT_CARD_FAIL:
      return {};
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
    case userConstants.GET_SELF_STUDENT_CARD_SUCCESS:
      return action.payload.map((item) => item.id);
    case userConstants.GET_SELF_STUDENT_CARD_FAIL:
      return [];
    default:
      return state;
  }
};

export default combineReducers(byId, allIds);
