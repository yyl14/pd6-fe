import { combineReducers } from 'redux';
import { authConstants, userConstants } from '../actions/user/constants';

const initialState = {
  id: '',
  username: '',
  nickname: '',
  role: '',
  real_name: '',
  alternative_email: '',
  my_class: [],
};

const user = (state = {}, action) => {
  switch (action.type) {
    case authConstants.AUTH_SUCCESS:
      return action.user;
    case authConstants.AUTH_LOGOUT:
      return {};
    case userConstants.EDIT_SELF_ACCOUNT_SUCCESS: {
      return {
        ...state,
        nickname: action.payload.nickname,
        alternative_email:
          action.payload.alternative_email === '' ? action.payload.alternative_email : state.alternative_email,
      };
    }
    default:
      return state;
  }
};

export default user;
