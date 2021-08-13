import { combineReducers } from 'redux';
import { accountConstants } from '../actions/admin/constants';
import { gradeConstants } from '../actions/myClass/constant';

const byId = (state = {}, action) => {
  switch (action.type) {
    case accountConstants.FETCH_ACCOUNTS_SUCCESS: {
      return action.payload.reduce(
        (acc, item) => ({ ...acc, [item.id]: { ...item, studentCard: [], gradeIds: [] } }),
        state,
      );
    }

    case accountConstants.FETCH_ACCOUNT_SUCCESS: {
      return {
        ...state,
        [action.payload.id]: { ...action.payload, studentCard: [], gradeIds: [] },
      };
    }

    case accountConstants.FETCH_STUDENT_CARD_SUCCESS: {
      const { id, data } = action.payload;
      return {
        ...state,
        [id]: {
          ...state[id],
          studentCard: data === null ? [] : data.map((dataItem) => dataItem.id),
        },
      };
    }

    case accountConstants.FETCH_STUDENT_CARD_FAIL: {
      const { id } = action.payload;
      return { ...state, [id]: { ...state[id], studentCard: [] } };
    }

    case gradeConstants.FETCH_ACCOUNT_GRADE_SUCCESS: {
      const { accountId, data } = action.payload;
      return {
        ...state,
        [accountId]: {
          ...state[accountId],
          gradeIds: (data === null ? [] : data.map((item) => item.id)),
        },
      };
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
      return state.includes(action.payload.id) ? state : state.concat([action.payload.id]);
    }

    default:
      return state;
  }
};

export default combineReducers({ byId, allIds });
