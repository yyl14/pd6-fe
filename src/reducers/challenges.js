import { combineReducers } from 'redux';
import { challengeConstants, problemConstants } from '../actions/myClass/constant';

const byId = (state = {}, action) => {
  switch (action.type) {
    case challengeConstants.FETCH_CHALLENGES_SUCCESS: {
      const { data } = action.payload;
      return data.reduce((acc, item) => ({
        ...acc,
        [item.id]: {
          ...item,
          problemIds: state[item.id] ? state[item.id].problemIds : [],
          peerReviewIds: state[item.id] ? state[item.id].peerReviewIds : [],
          specialJudgeIds: state[item.id] ? state[item.id].specialJudgeIds : [],
          essayIds: state[item.id] ? state[item.id].essayIds : [],
        },
      }), state);
    }
    case problemConstants.READ_CHALLENGE_SUCCESS: {
      const data = action.payload;
      return {
        ...state,
        [data.id]: {
          ...data,
          problemIds: state[data.id] ? state[data.id].problemIds : [],
          peerReviewIds: state[data.id] ? state[data.id].peerReviewIds : [],
          specialJudgeIds: state[data.id] ? state[data.id].specialJudgeIds : [],
          essayIds: state[data.id] ? state[data.id].essayIds : [],
        },
      };
    }
    default:
      return state;
  }
};

const allIds = (state = [], action) => {
  switch (action.type) {
    case challengeConstants.FETCH_CHALLENGES_SUCCESS: {
      const { data } = action.payload;
      return data.map((item) => item.id);
    }
    case problemConstants.READ_CHALLENGE_SUCCESS:
      return state.includes(action.payload.id) ? state : state.concat([action.payload.id]);
    default:
      return state;
  }
};

export default combineReducers({ byId, allIds });
