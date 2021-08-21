import { combineReducers } from 'redux';
import { gradeConstants } from '../actions/myClass/constant';

const byId = (state = {}, action) => {
  switch (action.type) {
    case gradeConstants.FETCH_CLASS_GRADE_SUCCESS: {
      const { data } = action.payload;
      return data.reduce((acc, item) => ({ ...acc, [item.id]: { ...item } }), state);
    }

    case gradeConstants.FETCH_ACCOUNT_GRADE_SUCCESS: {
      const { data } = action.payload;
      return data.reduce((acc, item) => ({ ...acc, [item.id]: { ...item } }), state);
    }

    default:
      return state;
  }
};

// [1, 2, 3]
// allIds: [...new Set([..state, ...data])]
// displayedIds: [
//   [0]: ,
//   [1]: ,
//   [2]: 1,
//   [3]: 2,
//   [4]: 3,
//   [5]: 5,
//   [6]: 4,
//   [7]: 0,
// ]

const allIds = (state = [], action) => {
  switch (action.type) {
    case gradeConstants.FETCH_CLASS_GRADE_SUCCESS: {
      const { data } = action.payload;
      return data.map((item) => item.id);
    }

    case gradeConstants.FETCH_ACCOUNT_GRADE_SUCCESS: {
      const { data } = action.payload;
      return data.map((item) => item.id);
    }

    case gradeConstants.FETCH_GRADE_SUCCESS: {
      return action.payload.map((item) => item.id);
    }

    default:
      return state;
  }
};

export default combineReducers({ byId, allIds });
