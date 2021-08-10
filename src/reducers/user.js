import { combineReducers } from 'redux';
import { authConstants, userConstants } from '../actions/user/constants';

const user = (state = {}, action) => {
  switch (action.type) {
    case authConstants.AUTH_SUCCESS:
      return action.user;
    case authConstants.AUTH_LOGOUT:
      return {};
    case userConstants.EDIT_SELF_ACCOUNT_SUCCESS: {
      const editedAccount = state;
      editedAccount.nickname = action.payload.nickname;
      if (action.payload.alternative_email === '') {
        editedAccount.alternative_email = action.payload.alternative_email;
      }
      return editedAccount;
    }
    default:
      return state;
  }
};

export default user;
