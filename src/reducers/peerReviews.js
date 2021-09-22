import { combineReducers } from 'redux';
import { peerReviewConstants, challengeConstants } from '../actions/myClass/constant';

const byId = (state = {}, action) => {
  switch (action.type) {
    case challengeConstants.BROWSE_TASKS_UNDER_CHALLENGE_SUCCESS: {
      const { data } = action.payload;
      return data.peer_review.reduce((acc, item) => ({ ...acc, [item.id]: { ...item } }), state);
    }
    case peerReviewConstants.READ_PEER_REVIEW_SUCCESS: {
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
    case challengeConstants.BROWSE_TASKS_UNDER_CHALLENGE_SUCCESS: {
      const { data } = action.payload;
      return [...new Set([...data.peer_review.map((item) => item.id), ...state])];
    }
    case peerReviewConstants.READ_PEER_REVIEW_SUCCESS: {
      return state.includes(action.payload.id) ? state : state.concat([action.payload.id]);
    }
    default:
      return state;
  }
};

export default combineReducers({ byId, allIds });
