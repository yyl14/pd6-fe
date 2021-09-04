import { combineReducers } from 'redux';
import { problemConstants, essayConstants } from '../actions/myClass/constant';

const byId = (state = {}, action) => {
  switch (action.type) {
    case problemConstants.BROWSE_TASKS_UNDER_CHALLENGE_SUCCESS: {
      const { data } = action.payload;
      return data.essay.reduce((acc, item) => ({ ...acc, [item.id]: { ...item } }), {});
    }
    case essayConstants.READ_ESSAY_SUCCESS: {
      const data = action.payload;
      return {
        ...state,
        [data.id]: {
          ...data,
          essaySubmissionId: null,
        },
      };
    }
    case essayConstants.READ_ESSAY_SUBMISSION_SUCCESS: {
      const data = action.payload;
      return {
        ...state,
        [data.essay_id]: {
          ...state[data.essay_id],
          essaySubmissionId: data.id,
        },
      };
    }

    default:
      return state;
  }
};

const allIds = (state = [], action) => {
  switch (action.type) {
    case problemConstants.BROWSE_TASKS_UNDER_CHALLENGE_SUCCESS: {
      const { data } = action.payload;
      return data.essay.map((item) => item.id);
    }
    case essayConstants.READ_ESSAY_SUCCESS:
      return state.includes(action.payload.id) ? state : state.concat([action.payload.id]);
    default:
      return state;
  }
};

export default combineReducers({ byId, allIds });
