import { authConstants, userConstants } from '../actions/user/constants';

const initialState = {
  id: '',
  username: '',
  nickname: '',
  role: '',
  real_name: '',
  alternative_email: '',
  classes: [],
  studentCards: [],
  notifications: [],
};

const user = (state = initialState, action) => {
  switch (action.type) {
    case authConstants.AUTH_SUCCESS:
      return {
        ...action.user,
        studentCards: [],
        notifications: [],
      };
    case authConstants.AUTH_LOGOUT:
      return initialState;
    case userConstants.EDIT_SELF_ACCOUNT_SUCCESS: {
      return {
        ...state,
        nickname: action.payload.nickname,
        alternative_email:
          action.payload.alternative_email === '' ? action.payload.alternative_email : state.alternative_email,
      };
    }
    case userConstants.GET_SELF_STUDENT_CARD_SUCCESS:
      return { ...state, studentCards: action.payload.map((item) => item.id) };
    case userConstants.USER_GET_NOTIFY:
      return {
        ...state,
        notifications: action.payload,
      };
    default:
      return state;
  }
};

export default user;
