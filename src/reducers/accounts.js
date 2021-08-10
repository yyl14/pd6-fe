import { combineReducers } from 'redux';
import { accountConstants } from '../actions/admin/constants';

const byId = (state = {}, action) => {
  switch (action.type) {
    case accountConstants.FETCH_ACCOUNTS_SUCCESS: {
      const { data } = action.payload;
      return data.reduce((acc, item) => ({ ...acc, [item.id]: { ...item, studentCard: [] } }), state);
    }

    case accountConstants.FETCH_ACCOUNT_SUCCESS: {
      const { data } = action.payload;
      return {
        ...state, [data.id]: { ...data, studentCard: [] },
      };
    }

    case accountConstants.FETCH_STUDENT_CARD_SUCCESS: {
      const { id, data } = action.payload;
      return {
        ...state, [id]: { ...state[id], studentCard: data.map((dataItem) => dataItem.id) },
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
      const { data } = action.payload;
      return data.map((item) => item.id);
    }

    case accountConstants.FETCH_ACCOUNT_SUCCESS: {
      const { data } = action.payload;
      return (state.includes(data.id) ? state : state.concat([data.id]));
    }

    default:
      return state;
  }
};

export default combineReducers(byId, allIds);
