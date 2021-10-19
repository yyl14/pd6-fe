import { combineReducers } from 'redux';
import { judgementConstants } from '../actions/api/constant';

const prototype = {
  id: null,
  judgement_id: null,
  testcase_id: null,
  verdict: null,
  time_lapse: null,
  peak_memory: null,
  score: null,
};

const byId = (state = {}, action) => {
  switch (action.type) {
    case judgementConstants.BROWSE_ALL_JUDGEMENT_JUDGE_CASE_SUCCESS: {
      const { judgeCases } = action.payload.data;
      console.log(judgeCases);
      return judgeCases.reduce(
        (acc, item) => ({
          ...acc,
          [item.id]: {
            ...prototype,
            ...state[item.id],
            ...item,
          },
        }),
        state,
      );
    }
    // case problemConstants.BROWSE_JUDGE_CASES_SUCCESS: {
    //   const { data } = action.payload;
    //   return data.reduce(
    //     (acc, item) => ({
    //       ...acc,
    //       [item.id]: {
    //         ...prototype,
    //         ...state[item.id],
    //         verdict: verdictMapping.get(item.verdict),
    //       },
    //     }),
    //     state,
    //   );
    // }
    // case submissionConstants.BROWSE_JUDGE_CASES_SUCCESS: {
    //   const { data } = action.payload;
    //   return data.reduce(
    //     (acc, item) => ({
    //       ...acc,
    //       [item.id]: {
    //         ...prototype,
    //         ...state[item.id],
    //         verdict: verdictMapping.get(item.verdict),
    //       },
    //     }),
    //     state,
    //   );
    // }
    default:
      return state;
  }
};

const allIds = (state = [], action) => {
  switch (action.type) {
    case judgementConstants.BROWSE_ALL_JUDGEMENT_JUDGE_CASE_SUCCESS: {
      const { judgeCases } = action.payload;
      return [...new Set([...state, ...judgeCases.map((item) => item.id)])];
    }
    // case problemConstants.BROWSE_JUDGE_CASES_SUCCESS: {
    //   const { data } = action.payload;
    //   return [...new Set([...state, ...data.map((item) => item.id)])];
    // }
    // case submissionConstants.BROWSE_JUDGE_CASES_SUCCESS: {
    //   const { data } = action.payload;
    //   return [...new Set([...state, ...data.map((item) => item.id)])];
    // }
    default:
      return state;
  }
};

export default combineReducers({ byId, allIds });
