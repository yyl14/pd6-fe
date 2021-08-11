import { combineReducers } from 'redux';
import { accountConstants } from '../actions/admin/constants';

const byId = (state = {}, action) => {
  switch (action.type) {
    case accountConstants.FETCH_ACCOUNTS_SUCCESS: {
      return action.payload.reduce((acc, item) => ({ ...acc, [item.id]: { ...item, studentCard: [] } }), state);
    }

    case accountConstants.FETCH_ACCOUNT_SUCCESS: {
      return {
        ...state, [action.payload.id]: { ...action.payload, studentCard: [] },
      };
    }

    case accountConstants.FETCH_STUDENT_CARD_SUCCESS: {
      const { id, data } = action.payload;
      return {
        ...state,
        [id]: {
          ...state[id],
          studentCard: (data === null ? [] : data.map((dataItem) => dataItem.id)),
        },
      };
    }

    case accountConstants.FETCH_STUDENT_CARD_FAIL: {
      const { id } = action.payload;
      return { ...state, [id]: { ...state[id], studentCard: [] } };
    }

    default:
      return state;
  }
};

const allIds = (state = [], action) => {
  switch (action.type) {
    case accountConstants.FETCH_ACCOUNTS_SUCCESS: {
      return action.payload.map((item) => item.id);
    }

    case accountConstants.FETCH_ACCOUNT_SUCCESS: {
      return (state.includes(action.payload.id) ? state : state.concat([action.payload.id]));
    }

    default:
      return state;
  }
};

export default combineReducers({ byId, allIds });
