import { combineReducers } from 'redux';
import { commonConstants } from '../actions/common/constant';

const byId = (state = {}, action) => {
  switch (action.type) {
    case commonConstants.FETCH_CLASS_MEMBERS_SUCCESS: {
      const { data } = action.payload;
      return data.reduce(
        (acc, item) => ({
          ...acc,
          [item.member_id]: {
            ...item,
            member_referral: state[item.member_id] ? state[item.member_id].member_referral : '',
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
    case commonConstants.FETCH_CLASS_MEMBERS_SUCCESS: {
      const { data } = action.payload;
      return [...new Set([...data.map((item) => item.member_id), ...state])];
    }
    default:
      return state;
  }
};

export default combineReducers({ byId, allIds });
