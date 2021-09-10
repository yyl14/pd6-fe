import { combineReducers } from 'redux';
import { courseConstants } from '../actions/admin/constant';
import { commonConstants } from '../actions/common/constant';
import {
  gradeConstants, teamConstants, challengeConstants, submissionConstants,
} from '../actions/myClass/constant';

const byId = (state = {}, action) => {
  switch (action.type) {
    case courseConstants.FETCH_CLASSES_SUCCESS:
    case commonConstants.FETCH_ALL_CLASSES_SUCCESS: {
      const { data } = action.payload.data;
      return data.reduce(
        (acc, item) => ({
          ...acc,
          [item.id]: {
            ...item,
            // memberIds of existing classes are unchanged
            memberIds: state[item.id] ? state[item.id].memberIds : [],
            gradeIds: state[item.id] ? state[item.id].gradeIds : [],
            teamIds: state[item.id] ? state[item.id].teamIds : [],
            challengeIds: state[item.id] ? state[item.id].challengeIds : [],
            submissionIds: state[item.id] ? state[item.id].submissionIds : [],
          },
        }),
        state,
      );
    }

    case commonConstants.FETCH_CLASS_SUCCESS: {
      return {
        ...state,
        [action.payload.id]: {
          ...action.payload,
          memberIds: state[action.payload.id] ? state[action.payload.id].memberIds : [],
          gradeIds: state[action.payload.id] ? state[action.payload.id].gradeIds : [],
          teamIds: state[action.payload.id] ? state[action.payload.id].teamIds : [],
          challengeIds: state[action.payload.id] ? state[action.payload.id].challengeIds : [],
          submissionIds: state[action.payload.id] ? state[action.payload.id].submissionIds : [],
        },
      };
    }

    case commonConstants.FETCH_CLASS_MEMBERS_SUCCESS: {
      const { classId, data } = action.payload;
      return {
        ...state,
        [classId]: {
          ...state[classId],
          memberIds: data.map((item) => item.member_id),
          gradeIds: state[classId] ? state[classId].gradeIds : [],
          teamIds: state[classId] ? state[classId].teamIds : [],
          challengeIds: state[classId] ? state[classId].challengeIds : [],
          submissionIds: state[classId] ? state[classId].submissionIds : [],
        },
      };
    }

    case commonConstants.FETCH_CLASS_MEMBER_WITH_ACCOUNT_REFERRAL_SUCCESS: {
      const { classId, data } = action.payload;
      return {
        ...state,
        [classId]: {
          ...state[classId],
          memberIds: data.map((item) => item.member_id),
          gradeIds: state[classId] ? state[classId].gradeIds : [],
          teamIds: state[classId] ? state[classId].teamIds : [],
          challengeIds: state[classId] ? state[classId].challengeIds : [],
          submissionIds: state[classId] ? state[classId].submissionIds : [],
        },
      };
    }

    case gradeConstants.FETCH_CLASS_GRADE_SUCCESS: {
      const { classId, data } = action.payload;
      return {
        ...state,
        [classId]: {
          ...state[classId],
          gradeIds: data.map((item) => item.id),
          memberIds: state[classId] ? state[classId].memberIds : [],
          teamIds: state[classId] ? state[classId].teamIds : [],
          challengeIds: state[classId] ? state[classId].challengeIds : [],
          submissionIds: state[classId] ? state[classId].submissionIds : [],
        },
      };
    }

    case teamConstants.FETCH_TEAMS_SUCCESS: {
      const { classId, data } = action.payload;
      return {
        ...state,
        [classId]: {
          ...state[classId],
          teamIds: data.map((item) => item.id),
          gradeIds: state[classId] ? state[classId].gradeIds : [],
          memberIds: state[classId] ? state[classId].memberIds : [],
          challengeIds: state[classId] ? state[classId].challengeIds : [],
          submissionIds: state[classId] ? state[classId].submissionIds : [],
        },
      };
    }

    case challengeConstants.FETCH_CHALLENGES_SUCCESS: {
      const { classId, data } = action.payload;
      return {
        ...state,
        [classId]: {
          ...state[classId],
          challengeIds: data.map((item) => item.id),
          gradeIds: state[classId] ? state[classId].gradeIds : [],
          memberIds: state[classId] ? state[classId].memberIds : [],
          teamIds: state[classId] ? state[classId].teamIds : [],
          submissionIds: state[classId] ? state[classId].submissionIds : [],
        },
      };
    }

    case commonConstants.FETCH_ALL_CHALLENGES_PROBLEMS_SUCCESS: {
      const { classId, challenges } = action.payload;
      return {
        ...state,
        [classId]: {
          ...state[classId],
          challengeIds: challenges.map((item) => item.id),
          gradeIds: state[classId] ? state[classId].gradeIds : [],
          memberIds: state[classId] ? state[classId].memberIds : [],
          teamIds: state[classId] ? state[classId].teamIds : [],
          submissionIds: state[classId] ? state[classId].submissionIds : [],
        },
      };
    }

    case submissionConstants.FETCH_SUBMISSIONS_SUCCESS: {
      const { classId, data } = action.payload;
      return {
        ...state,
        [classId]: {
          ...state[classId],
          submissionIds: data.map((item) => item.id),
          gradeIds: state[classId] ? state[classId].gradeIds : [],
          memberIds: state[classId] ? state[classId].memberIds : [],
          teamIds: state[classId] ? state[classId].teamIds : [],
          challengeIds: state[classId] ? state[classId].challengeIds : [],
        },
      };
    }

    default:
      return state;
  }
};

const allIds = (state = [], action) => {
  switch (action.type) {
    case courseConstants.FETCH_CLASSES_SUCCESS:
    case commonConstants.FETCH_ALL_CLASSES_SUCCESS: {
      const { data } = action.payload.data;
      return [...new Set([...data.map((item) => item.id), ...state])];
    }
    case commonConstants.FETCH_CLASS_SUCCESS: {
      const { id } = action.payload;
      // console.log(id);
      return [...new Set([id, ...state])];
    }
    default:
      return state;
  }
};

export default combineReducers({ byId, allIds });
