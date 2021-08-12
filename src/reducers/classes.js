import { combineReducers } from 'redux';
import { courseConstants } from '../actions/constant';
import { gradeConstants, memberConstants, teamConstants, challengeConstants } from '../actions/myClass/constant';

const byId = (state = {}, action) => {
  switch (action.type) {
    case courseConstants.FETCH_CLASSES_SUCCESS: {
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
          },
        }),
        state,
      );
    }

    case courseConstants.FETCH_MEMBERS_SUCCESS: {
      const {
        classId,
        data: { data },
      } = action.payload;
      return { ...state, [classId]: { ...state[classId], memberIds: data.map((item) => item.id) } };
    }

    case memberConstants.FETCH_CLASS_MEMBER_SUCCESS: {
      const { classId, data } = action.payload;
      return { ...state, [classId]: { ...state[classId], memberIds: data.map((item) => item.id) } };
    }

    case gradeConstants.FETCH_CLASS_GRADE_SUCCESS: {
      const { classId, data } = action.payload;
      return { ...state, [classId]: { ...state[classId], gradeIds: data.map((item) => item.id) } };
    }

    case teamConstants.FETCH_TEAMS_SUCCESS: {
      const { classId, data } = action.payload;
      return { ...state, [classId]: { ...state[classId], teamIds: data.map((item) => item.id) } };
    }

    case challengeConstants.FETCH_CHALLENGES_SUCCESS: {
      const { classId, data } = action.payload;
      return { ...state, [classId]: { ...state[classId], challengeIds: data.map((item) => item.id) } };
    }

    default:
      return state;
  }
};

const allIds = (state = [], action) => {
  switch (action.type) {
    case courseConstants.FETCH_CLASSES_SUCCESS: {
      const { data } = action.payload.data;
      return [...new Set([...data.map((item) => item.id), ...state])];
    }
    default:
      return state;
  }
};

export default combineReducers({ byId, allIds });
