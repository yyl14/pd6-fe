import { userConstants } from '../actions/constant';

const initialState = {
  isAuthenticated: false,
  user: {},
  error: null,
  loading: false,
};

export default function auth(state = initialState, payload) {
  switch (payload.type) {
    case userConstants.AUTH_START:
      return {
        ...state,
        loading: true,
      };
    case userConstants.AUTH_SUCCESS:
      return {
        isAuthenticated: !!(payload.user),
        user: payload.user,
        error: null,
        loading: false,
      };
    case userConstants.AUTH_FAIL:
      return {
        ...state,
        error: payload.errors,
        loading: false,
      };
    case userConstants.AUTH_LOGOUT:
      return {
        ...state,
        isAuthenticated: false,
        user: {},
        error: null,
      };
    default:
      return state;
  }
}
