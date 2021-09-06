import { combineReducers } from 'redux';
import { accountConstants, systemConstants } from '../actions/admin/constant';
import { gradeConstants, submissionConstants } from '../actions/myClass/constant';
import { commonConstants } from '../actions/common/constant';

const byId = (state = {}, action) => {
  switch (action.type) {
    case accountConstants.FETCH_ACCOUNTS_SUCCESS: {
      return action.payload.reduce(
        (acc, item) => ({ ...acc, [item.id]: { ...item, studentCard: [], gradeIds: [] } }),
        {},
      );
    }
    case systemConstants.FETCH_ACCESS_LOG_SUCCESS: {
      const { accounts } = action.payload;
      return accounts.reduce(
        (acc, item) => (item ? { ...acc, [item.id]: { ...item, studentCard: [], gradeIds: [] } } : acc),
        state,
      );
    }

    case commonConstants.FETCH_ACCOUNT_SUCCESS: {
      return {
        ...state,
        [action.payload.id]: { ...action.payload, studentCard: [], gradeIds: [] },
      };
    }

    case accountConstants.FETCH_STUDENT_CARDS_SUCCESS: {
      const { id, data } = action.payload;
      return {
        ...state,
        [id]: {
          ...state[id],
          studentCard: data === null ? [] : data.map((dataItem) => dataItem.id),
        },
      };
    }

    case accountConstants.FETCH_STUDENT_CARDS_FAIL: {
      const { id } = action.payload;
      return { ...state, [id]: { ...state[id], studentCard: [] } };
    }

    case gradeConstants.FETCH_ACCOUNT_GRADE_SUCCESS: {
      const { accountId, data } = action.payload;
      return {
        ...state,
        [accountId]: {
          ...state[accountId],
          gradeIds: data === null ? [] : data.map((item) => item.id),
        },
      };
    }

    case submissionConstants.FETCH_SUBMISSIONS_SUCCESS: {
      const { accounts } = action.payload;
      return accounts.reduce((acc, item) => ({ ...acc, [item.id]: { ...item, studentCard: [], gradeIds: [] } }), state);
    }

    case submissionConstants.GET_ACCOUNT_BATCH_SUCCESS: {
      const { accountId, data } = action.payload;
      return {
        ...state,
        [accountId]: {
          id: data.id,
          real_name: data.real_name,
          student_id: data.student_id,
          username: data.username,
          studentCard: [],
          gradeIds: [],
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
    case systemConstants.FETCH_ACCESS_LOG_SUCCESS: {
      const { accounts } = action.payload;
      return [...new Set([...accounts.filter((item) => !!item).map((item) => item.id), ...state])];
    }

    case commonConstants.FETCH_ACCOUNT_SUCCESS: {
      return state.includes(action.payload.id) ? state : state.concat([action.payload.id]);
    }

    case submissionConstants.FETCH_SUBMISSIONS_SUCCESS: {
      const { accounts } = action.payload;
      return [...new Set([...accounts.map((item) => item.id), ...state])];
    }

    case submissionConstants.GET_ACCOUNT_BATCH_SUCCESS: {
      const { accountId } = action.payload;
      return state.includes(accountId) ? state : state.concat([accountId]);
    }

    default:
      return state;
  }
};

export default combineReducers({ byId, allIds });
