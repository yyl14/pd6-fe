import { combineReducers } from 'redux';
import { submissionConstants, problemConstants } from '../actions/myClass/constant';

const byId = (state = {}, action) => {
  switch (action.type) {
    case submissionConstants.FETCH_JUDGEMENT_SUCCESS: {
      const { data } = action.payload;
      return data.reduce((acc, item) => ({ ...acc, [item.id]: { ...item } }), state.judgments);
    }
    case problemConstants.READ_SUBMISSION_JUDGE_SUCCESS: {
      return action.payload.reduce((acc, item) => ({ ...acc, [item.id]: { ...item } }), state);
    }
    default:
      return state;
  }
};

const allIds = (state = [], action) => {
  switch (action.type) {
    case problemConstants.READ_SUBMISSION_JUDGE_SUCCESS: {
      // return action.payload.map((item) => (state.includes(item.id) ? state : state.concat([item.id])));
      return action.payload.reduce((acc, item) => {
        if (state.includes(item.id)) {
          return [...acc];
        }
        return [...acc, item.id];
      }, state);
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
