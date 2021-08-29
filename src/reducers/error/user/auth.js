import { authConstants } from '../../../actions/user/constants';

const initialState = {
  auth: null,
  login: null,
  logout: null,
  forgetPassword: null,
  signup: null,
  fetchAccount: null,
};

export default function auth(state = initialState, action) {
  switch (action.type) {
    case authConstants.AUTH_LOGIN_FAIL:
      return {
        ...state,
        login: action.error,
      };
    case authConstants.AUTH_SUCCESS:
      return {
        ...state,
        fetchAccount: null,
      };
    case authConstants.AUTH_FAIL:
      return {
        ...state,
        fetchAccount: action.error,
      };
    case authConstants.AUTH_LOGOUT:
      return {
        login: null,
        logout: null,
        forgetPassword: null,
        signup: null,
        fetchAccount: null,
      };
    case authConstants.FORGET_PASSWORD_SUCCESS:
      return {
        ...state,
        forgetPassword: null,
      };
    case authConstants.FORGET_PASSWORD_FAIL:
      return {
        ...state,
        forgetPassword: action.error,
      };
    case authConstants.SIGNUP_SUCCESS:
      return {
        ...state,
        signup: null,
      };
    case authConstants.SIGNUP_FAIL:
      return {
        ...state,
        signup: action.error,
      };
    case authConstants.API_CALL_ERROR:
      return {
        ...state,
        auth: action.error,
      };
    default: {
      return state;
    }
  }
}
