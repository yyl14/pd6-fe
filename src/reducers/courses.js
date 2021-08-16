import { combineReducers } from 'redux';
import { courseConstants } from '../actions/admin/constant';
import { commonConstants } from '../actions/common/constant';

const byId = (state = {}, action) => {
  switch (action.type) {
    case courseConstants.FETCH_COURSES_SUCCESS: {
      const { data } = action.payload;
      return data.reduce(
        (acc, item) => ({
          ...acc,
          // classIds of existing courses are unchanged
          [item.id]: { ...item, classIds: state[item.id] ? state[item.id].classIds : [] },
        }),
        {},
      );
    }
    case commonConstants.FETCH_COURSE_SUCCESS: {
      console.log(action.payload);
      return {
        ...state,
        [action.payload.id]: {
          ...action.payload,
          classIds: state[action.payload.id] ? state[action.payload.id].classIds : [],
        },
      };
    }
    case courseConstants.FETCH_CLASSES_SUCCESS: {
      const {
        courseId,
        data: { data },
      } = action.payload;
      return {
        ...state,
        [courseId]: { ...state[courseId], classIds: data.map((item) => item.id) },
      };
    }
    default:
      return state;
  }
};

const allIds = (state = [], action) => {
  switch (action.type) {
    case courseConstants.FETCH_COURSES_SUCCESS: {
      const { data } = action.payload;
      return data.map((item) => item.id);
    }
    default:
      return state;
  }
};

export default combineReducers({ byId, allIds });
