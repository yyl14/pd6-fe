import { combineReducers } from 'redux';
import { submissionConstants, problemConstants } from '../actions/myClass/constant';

const byId = (state = {}, action) => {
  switch (action.type) {
    case submissionConstants.FETCH_JUDGEMENT_SUCCESS: {
      const { data } = action.payload;
      return data.reduce((acc, item) => ({ ...acc, [item.id]: { ...item } }), state.judgments);
    }
    case problemConstants.READ_SUBMISSION_JUDGE_SUCCESS: {
      return {
        ...state,
        [action.payload.id]: action.payload,
      };
    }
    default:
      return state;
  }
};

const allIds = (state = [], action) => {
  switch (action.type) {
    case problemConstants.READ_SUBMISSION_JUDGE_SUCCESS: {
      return state.includes(action.payload.id) ? state : state.concat([action.payload.id]);
    }
    case submissionConstants.FETCH_JUDGEMENT_SUCCESS: {
      const { data } = action.payload;
      return data.reduce((acc, item) => ({ ...acc, [item.id]: { ...item } }), state.judgments);
    }
    default:
      return state;
  }
};

export default combineReducers({ byId, allIds });
