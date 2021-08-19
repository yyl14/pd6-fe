import { combineReducers } from 'redux';
<<<<<<< HEAD
import { submissionConstants } from '../actions/myClass/constant';

const byId = (state = {}, action) => {
  switch (action.type) {
    case submissionConstants.FETCH_ALL_SUBMISSIONS_SUCCESS: {
      const { data } = action.payload;
      return data.reduce((acc, item) => ({ ...acc, [item.id]: { ...item } }), state.submissions);
    }
    case submissionConstants.FETCH_SUBMISSION_SUCCESS: {
      const { data } = action.payload;
      return data.reduce((acc, item) => ({ ...acc, [item.id]: { ...item } }), state.submissions);
=======
import { problemConstants } from '../actions/myClass/constant';

const byId = (state = {}, action) => {
  switch (action.type) {
    case problemConstants.READ_SUBMISSION_SUCCESS: {
      return {
        ...state,
        [action.payload.id]: action.payload,
      };
>>>>>>> 77-page-problem-coding-problem
    }
    default:
      return state;
  }
};

const allIds = (state = [], action) => {
  switch (action.type) {
<<<<<<< HEAD
    case submissionConstants.FETCH_ALL_SUBMISSIONS_SUCCESS: {
      const { data } = action.payload;
      return data.map((item) => item.id);
    }
    case submissionConstants.FETCH_SUBMISSION_SUCCESS: {
      const { data } = action.payload;
      return data.map((item) => item.id);
    }
=======
    case problemConstants.READ_SUBMISSION_SUCCESS:
      return state.includes(action.payload.id) ? state : state.concat([action.payload.id]);
>>>>>>> 77-page-problem-coding-problem
    default:
      return state;
  }
};

export default combineReducers({ byId, allIds });
