import { combineReducers } from 'redux';
import { commonConstants } from '../actions/common/constant';
import { viewConstants } from '../actions/api/constant';

const prototype = {
  id: null,
  account_id: null,
  class_id: null,
  role: null,
  institute_abbreviated_name: null,
};

const byId = (state = {}, action) => {
  switch (action.type) {
    case viewConstants.BROWSE_CLASS_MEMBER_SUCCESS: {
      const { classMembers } = action.payload.data;
      return classMembers.reduce(
        (acc, item) => ({
          ...acc,
          [item.id]: {
            ...prototype,
            ...state[item.id],
            ...item,
          },
        }),
        state,
      );
    }
    case commonConstants.FETCH_CLASS_MEMBER_WITH_ACCOUNT_REFERRAL_SUCCESS: {
      const { data } = action.payload;
      return data.reduce(
        (acc, item) => ({
          ...acc,
          [item.member_id]: {
            member_referral: item.member_referral,
            member_role: item.member_role,
            institute_abbreviated_name: state[item.member_id] ? state[item.member_id].institute_abbreviated_name : '',
            member_id: state[item.member_id] ? state[item.member_id].member_id : '',
            real_name: state[item.member_id] ? state[item.member_id].real_name : '',
            role: state[item.member_id] ? state[item.member_id].role : '',
            student_id: state[item.member_id] ? state[item.member_id].student_id : '',
            username: state[item.member_id] ? state[item.member_id].username : '',
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
    case viewConstants.BROWSE_CLASS_MEMBER_SUCCESS: {
      const { classMembers } = action.payload.data;
      return [...new Set([...classMembers.map((item) => item.member_id), ...state])];
    }
    case commonConstants.FETCH_CLASS_MEMBER_WITH_ACCOUNT_REFERRAL_SUCCESS: {
      const { data } = action.payload;
      return [...new Set([...data.map((item) => item.member_id), ...state])];
    }
    default:
      return state;
  }
};

export default combineReducers({ byId, allIds });
