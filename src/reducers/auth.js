import { userConstants } from '../actions/constant';

const initialState = {
  isAuthenticated: false,
  account: {},
  studentCards: {
    byId: {},
    allIds: [],
  },
  user: {},
  loading: {
    login: false,
    logout: false,
    forgetPassword: false,
    signup: false,
    fetchAccount: false,
    editAccount: false,
    fetchStudentCard: false,
    addStudentCard: false,
    makeStudentCardDefault: false,
    resetPassword: false,
  },
  error: {
    login: null,
    logout: null,
    forgetPassword: null,
    signup: null,
    fetchAccount: null,
    editAccount: null,
    fetchStudentCard: null,
    addStudentCard: null,
    makeStudentCardDefault: null,
    resetPassword: null,
  },
};

export default function auth(state = initialState, payload) {
  switch (payload.type) {
    case userConstants.AUTH_START:
      return {
        ...state,
        loading: {
          ...state.loading,
          login: true,
        },
      };
    case userConstants.AUTH_SUCCESS:
      return {
        isAuthenticated: !!(payload.user),
        user: payload.user,
        error: {
          ...state.error,
          login: null,
        },
        loading: {
          ...state.loading,
          login: false,
        },
      };
    case userConstants.AUTH_FAIL:
      return {
        ...state,
        error: {
          ...state.error,
          login: payload.errors,
        },
        loading: {
          ...state.loading,
          login: false,
        },
      };
    case userConstants.AUTH_LOGOUT:
      return {
        ...state,
        isAuthenticated: false,
        user: {},
        error: {
          login: null,
          logout: null,
          forgetPassword: null,
          signup: null,
          fetchAccount: null,
          editAccount: null,
          fetchStudentCard: null,
          addStudentCard: null,
          makeStudentCardDefault: null,
          resetPassword: null,
        },
      };
    case userConstants.FORGET_PASSWORD_SUCCESS:
      return {
        ...state,
      };
    case userConstants.FORGET_PASSWORD_FAIL:
      return {
        ...state,
        error: null,
      };
    case userConstants.SIGNUP_SUCCESS:
      return {
        ...state,
      };
    case userConstants.SIGNUP_FAIL:
      return {
        ...state,
        error: payload.errors,
      };
    default:
      return state;
  }
}
