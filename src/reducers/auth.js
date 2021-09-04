import { authConstants } from '../actions/user/constants';

const initialState = {
  isAuthenticated: false,
  token: '',
  verificationDone: false,
};

export default function auth(state = initialState, action) {
  switch (action.type) {
    case authConstants.AUTH_SUCCESS:
      return {
        isAuthenticated: !!action.user,
        token: action.user.token,
        verificationDone: false,
      };
    case authConstants.AUTH_LOGOUT:
      return {
        isAuthenticated: false,
        token: '',
        verificationDone: false,
      };
    case authConstants.EMAIL_VERIFICATION_SUCCESS:
      return {
        ...state,
        verificationDone: true,
      };
    case authConstants.EMAIL_VERIFICATION_FAIL:
      return {
        ...state,
        verificationDone: true,
      };
    default:
      return state;
  }
}
