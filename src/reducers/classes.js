import { combineReducers } from 'redux';
import { courseConstants } from '../actions/constant';

const byId = (state = {}, action) => {
  switch (action.type) {
    case courseConstants.FETCH_CLASSES_SUCCESS: {
      const { data } = action.payload;
      return data.reduce(
        (acc, item) => ({
          ...acc,
          [item.id]: {
            ...item,
            // memberIds of existing classes are unchanged
            memberIds: state[item.id] ? state[item.id].memberIds : [],
          },
        }),
        {},
      );
    }

    case courseConstants.FETCH_MEMBERS_SUCCESS: {
      const { data } = action.payload;
      return data.reduce((acc, item) => ({ ...acc, [item.id]: item }), {});
    }

    default:
      return state;
  }
};

const allIds = (state = [], action) => {
  switch (action.type) {
    case courseConstants.FETCH_CLASSES_SUCCESS: {
      const { data } = action.payload;
      return data.map((item) => item.id);
    }
    default:
      return state;
  }
};

export default combineReducers(byId, allIds);
