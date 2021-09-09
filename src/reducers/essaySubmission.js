import { combineReducers } from 'redux';
import { essayConstants } from '../actions/myClass/constant';

const byId = (state = {}, action) => {
  switch (action.type) {
    case essayConstants.READ_ESSAY_SUBMISSION_SUCCESS: {
      const data = action.payload;
      return {
        ...state,
        [data.id]: {
          ...data,
        },
      };
    }
    case essayConstants.BROWSE_ESSAY_SUBMISSION_SUCCESS: {
      const data = action.payload;
      return data.reduce(
        (acc, item) => ({
          ...acc,
          [item.id]: {
            ...item,
          },
        }),
        state,
      );
    }

    default:
      return state;
  }
};

const allIds = (state = [], action) => {
  switch (action.type) {
    case essayConstants.READ_ESSAY_SUBMISSION_SUCCESS:
      return state.includes(action.payload.id) ? state : state.concat([action.payload.id]);
    case essayConstants.REUPLOAD_ESSAY_SUBMISSION_SUCCESS:
      return state.includes(action.payload.id) ? state : state.concat([action.payload.id]);
    case essayConstants.UPLOAD_ESSAY_SUBMISSION_SUCCESS:
      return state.includes(action.payload) ? state : state.concat([action.payload]);
    case essayConstants.BROWSE_ESSAY_SUBMISSION_SUCCESS:
      return action.payload.map((item) => item.id);

    default:
      return state;
  }
};

export default combineReducers({ byId, allIds });
