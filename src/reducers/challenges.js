import { combineReducers } from 'redux';
import { challengeConstants } from '../actions/myClass/constant';
import { commonConstants } from '../actions/common/constant';

const emptyStatistics = {
  summary: [],
  memberSubmission: [],
};

const byId = (state = {}, action) => {
  switch (action.type) {
    case challengeConstants.FETCH_CHALLENGES_SUCCESS: {
      const { data } = action.payload;
      return data.reduce(
        (acc, item) => ({
          ...acc,
          [item.id]: {
            ...item,
            problemIds: state[item.id] ? state[item.id].problemIds : [],
            peerReviewIds: state[item.id] ? state[item.id].peerReviewIds : [],
            specialJudgeIds: state[item.id] ? state[item.id].specialJudgeIds : [],
            essayIds: state[item.id] ? state[item.id].essayIds : [],
            statistics: state[item.id] ? state[item.id].statistics : emptyStatistics,
          },
        }),
        state,
      );
    }
    case challengeConstants.BROWSE_TASKS_UNDER_CHALLENGE_SUCCESS: {
      const { data, id } = action.payload;
      return {
        ...state,
        [id]: {
          ...state[id],
          problemIds: data.problem.map((item) => item.id),
          peerReviewIds: data.peer_review.map((item) => item.id),
          essayIds: data.essay.map((item) => item.id),
        },
      };
    }
    case commonConstants.READ_CHALLENGE_SUCCESS: {
      const data = action.payload;
      return {
        ...state,
        [data.id]: {
          ...data,
          problemIds: state[data.id] ? state[data.id].problemIds : [],
          peerReviewIds: state[data.id] ? state[data.id].peerReviewIds : [],
          specialJudgeIds: state[data.id] ? state[data.id].specialJudgeIds : [],
          essayIds: state[data.id] ? state[data.id].essayIds : [],
          statistics: state[data.id] ? state[data.id].statistics : emptyStatistics,
        },
      };
    }
    case challengeConstants.FETCH_CHALLENGE_SUMMARY_SUCCESS: {
      const { challengeId, data } = action.payload;
      return {
        ...state,
        [challengeId]: {
          ...state[challengeId],
          statistics: {
            ...state[challengeId].statistics,
            summary: data,
          },
        },
      };
    }
    case challengeConstants.FETCH_CHALLENGE_MEMBER_SUBMISSION_SUCCESS: {
      const { challengeId, data } = action.payload;

      return {
        ...state,
        [challengeId]: {
          ...state[challengeId],
          statistics: {
            ...state[challengeId].statistics,
            memberSubmission: data,
          },
        },
      };
    }

    case commonConstants.FETCH_ALL_CHALLENGES_PROBLEMS_SUCCESS: {
      const { challenges } = action.payload;
      return challenges.reduce(
        (acc, item) => ({
          ...acc,
          [item.id]: {
            ...item,
            problemIds: state[item.id] ? state[item.id].problemIds : [],
            peerReviewIds: state[item.id] ? state[item.id].peerReviewIds : [],
            specialJudgeIds: state[item.id] ? state[item.id].specialJudgeIds : [],
            essayIds: state[item.id] ? state[item.id].essayIds : [],
            statistics: state[item.id] ? state[item.id].statistics : emptyStatistics,
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
    case challengeConstants.FETCH_CHALLENGES_SUCCESS: {
      const { data } = action.payload;
      return [...new Set([...data.map((item) => item.id), ...state])];
    }
    case commonConstants.READ_CHALLENGE_SUCCESS: {
      return state.includes(action.payload.id) ? state : state.concat([action.payload.id]);
    }
    case commonConstants.FETCH_ALL_CHALLENGES_PROBLEMS_SUCCESS: {
      const { challenges } = action.payload;
      return [...new Set([...challenges.map((item) => item.id), ...state])];
    }

    default:
      return state;
  }
};

export default combineReducers({ byId, allIds });
