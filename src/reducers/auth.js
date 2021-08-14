import { authConstants } from '../actions/user/constants';

const initialState = {
  isAuthenticated: false,
};

export default function auth(state = initialState, action) {
  switch (action.type) {
    case authConstants.AUTH_SUCCESS:
      return {
        isAuthenticated: !!action.user,
      };
    case authConstants.AUTH_LOGOUT:
      return {
        isAuthenticated: false,
      };
    default:
      return state;
  }
}
