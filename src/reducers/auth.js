import { authConstants } from '../actions/user/constants';

const initialState = {
  isAuthenticated: false,
  user: {},
};

export default function auth(state = initialState, action) {
  switch (action.type) {
    case authConstants.AUTH_SUCCESS:
      return {
        isAuthenticated: !!(action.user),
        user: { ...action.user },
      };
    case authConstants.AUTH_LOGOUT:
      return {
        ...state,
        isAuthenticated: false,
        user: {},
      };
    default:
      return state;
  }
}
