import { combineReducers } from 'redux';
import { problemConstants, essayConstants } from '../actions/myClass/constant';

const byId = (state = {}, action) => {
  switch (action.type) {
    case problemConstants.BROWSE_TASKS_UNDER_CHALLENGE_SUCCESS: {
      const { data } = action.payload;
      console.log('data1:', data);
      return data.essay.reduce(
        (acc, item) => ({ ...acc, [item.id]: { ...item } }), {},
      );
    }
    case essayConstants.READ_ESSAY_SUCCESS: {
      const data = action.payload;
      console.log('data2:', data);
      return {
        ...state,
        [data.id]: {
          ...data,
        },
      };
    }

    default:
      return state;
  }
};

const allIds = (state = [], action) => {
  switch (action.type) {
    case problemConstants.BROWSE_TASKS_UNDER_CHALLENGE_SUCCESS: {
      const { data } = action.payload;
      console.log('data3', data);
      return data.essay.map((item) => item.id);
    }
    case essayConstants.READ_ESSAY_SUCCESS:
      return state.includes(action.payload.id) ? state : state.concat([action.payload.id]);
    default:
      return state;
  }
};

export default combineReducers({ byId, allIds });
