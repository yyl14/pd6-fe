import { userConstants } from '../actions/constant';

const initialState = {
  isAuthenticated: false,
  user: {},
};

export default function auth(state = initialState, action) {
  switch (action.type) {
    case userConstants.AUTH_START:
      return {
        ...state,
        error: null,
        loading: true,
      };
    case userConstants.AUTH_SUCCESS:
      return {
        isAuthenticated: true,
        user: action.payload,
        // token: action.token,
        error: null,
        loading: false,
      };
    case userConstants.AUTH_FAIL:
      return {
        ...state,
        error: action.errors,
        loading: false,
      };
    case userConstants.AUTH_LOGOUT:
      return {
        ...state,
        token: null,
      };
    default:
      return state;
  }
}
