import { authConstants } from '../actions/user/constants';

const initialState = {
  isAuthenticated: false,
  token: '',
};

export default function auth(state = initialState, action) {
  switch (action.type) {
    case authConstants.AUTH_SUCCESS:
      console.log(action);
      return {
        isAuthenticated: !!action.user,
        token: action.user.token,
      };
    case authConstants.AUTH_LOGOUT:
      return {
        isAuthenticated: false,
        token: '',
      };
    default:
      return state;
  }
}
