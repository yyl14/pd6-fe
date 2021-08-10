import { combineReducers } from 'redux';
import { accountConstants } from '../actions/constant';
// import { publicConstants } from '../actions/constant';

const byId = (state = {}, action) => {
  switch (action.type) {
    case accountConstants.FETCH_ACCOUNTS_SUCCESS: {
      const { data } = action.payload;
      return data.reduce((acc, item) => ({ ...acc, [item.id]: { ...item } }), state.institutes);
    }
    case accountConstants.FETCH_INSTITUTE_SUCCESS: {
      const { data } = action.payload;
      return { ...state.institutes.byId, [data.id]: data };
    }
    default:
    return state;
  }
};

const allIds = (state = [], action) => {
  switch (action.payload) {
    case accountConstants.FETCH_INSTITUTES_SUCCESS: {
      const { data } = action.payload;
      return data.map((item) => item.id);
    }
    case accountConstants.FETCH_INSTITUTE_SUCCESS: {
      const { data } = action.payload;
      return state.institutes.allIds.includes(data.id) ? state.institutes.allIds : state.institutes.allIds.concat([data.id]);
    }
    default:
    return state;
  }
};

export default combineReducers({ byId, allIds });

// export default function institutes(state = initialState, action) {
//   switch (action.type) {
//     case publicConstants.GET_INSTITUTE_START:
//       return {
//         ...state,
//         loading: true,
//       };
//     case publicConstants.GET_INSTITUTE_SUCCESS:
//       return {
//         institutes: {
//           byId: action.payload.reduce((acc, item) => ({ ...acc, [item.id]: { ...item } }), state.institutes),
//           allIds: action.payload.map((item) => item.id),
//         },
//         error: null,
//         loading: false,
//       };
//     case publicConstants.GET_INSTITUTE_FAIL:
//       return {
//         ...state,
//         error: action.payload.error,
//         loading: false,
//       };
//     default:
//       return state;
//   }
// }
