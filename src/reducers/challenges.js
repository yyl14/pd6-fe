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
      return {
        ...state,
        [action.payload.id]: {
          ...action.payload,
          problemIds: state[action.payload.id] ? state[action.payload.id].problemIds : [],
          peerReviewIds: state[action.payload.id] ? state[action.payload.id].peerReviewIds : [],
          specialJudgeIds: state[action.payload.id] ? state[action.payload.id].specialJudgeIds : [],
          essayIds: state[action.payload.id] ? state[action.payload.id].essayIds : [],
        },
      };
    }

    case problemConstants.BROWSE_TASKS_UNDER_CHALLENGE_SUCCESS: {
      const { data, id } = action.payload;
      const problemIds = data.problem.map((item) => item.id);
      return {
        ...state,
        [id]: {
          ...state[id],
          problemIds,
          peerReviewIds: data.peer_review.map((item) => item.id),
          essayIds: data.essay.map((item) => item.id),
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

    case problemConstants.READ_CHALLENGE_SUCCESS: {
      return state.includes(action.payload.id) ? state : state.concat([action.payload.id]);
    }

    default:
      return state;
  }
};

export default combineReducers({ byId, allIds });
