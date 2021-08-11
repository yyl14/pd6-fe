import { combineReducers } from 'redux';
import { courseConstants } from '../actions/constant';

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
