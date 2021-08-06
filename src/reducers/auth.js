import { userConstants } from '../actions/constant';

const initialState = {
  isAuthenticated: false,
  studentCards: {
    byId: {},
    allIds: [],
  },
  user: {},
  loading: {
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

export default function auth(state = initialState, action) {
  switch (action.type) {
    case userConstants.AUTH_START:
      return {
        ...state,
        loading: {
          ...state.loading,
          fetchAccount: true,
        },
      };
    case userConstants.AUTH_SUCCESS:
      return {
        isAuthenticated: !!(action.user),
        user: { ...action.user, studentCard: [] },
        error: {
          ...state.error,
          fetchAccount: null,
        },
        loading: {
          ...state.loading,
          fetchAccount: false,
        },
      };
    case userConstants.AUTH_FAIL:
      return {
        ...state,
        error: {
          ...state.error,
          fetchAccount: action.errors,
        },
        loading: {
          ...state.loading,
          fetchAccount: false,
        },
      };
    case userConstants.AUTH_LOGOUT:
      return {
        ...state,
        isAuthenticated: false,
        user: {},
        error: {
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
        error: action.errors,
      };
    case userConstants.EDIT_SELF_ACCOUNT_REQUEST:
      return {
        ...state,
        loading: {
          ...state.loading,
          editAccount: true,
        },
      };
    case userConstants.EDIT_SELF_ACCOUNT_SUCCESS: {
      const editedAccount = state.user;
      editedAccount.nickname = action.payload.nickname;
      editedAccount.alternative_email = action.payload.alternative_email;
      // editedAccount.real_name = action.payload.real_name;
      // editedAccount.username = action.payload.username;
      return {
        ...state,
        user: editedAccount,
        loading: {
          ...state.loading,
          editAccount: false,
        },
        error: {
          ...state.error,
          editAccount: null,
        },
      };
    }
    case userConstants.EDIT_SELF_ACCOUNT_FAIL:
      return {
        ...state,
        loading: {
          ...state.loading,
          editAccount: false,
        },
        error: {
          ...state.error,
          editAccount: action.error,
        },
      };

    // student card
    case userConstants.MAKE_SELF_STUDENT_CARD_DEFAULT_REQUEST:
      return {
        ...state,
        loading: { ...state.loading, makeStudentCardDefault: true },
      };
    case userConstants.MAKE_SELF_STUDENT_CARD_DEFAULT_SUCCESS: {
      const { cardId, id } = action.payload;
      const newArray = [];
      state.studentCards.forEach((item) => {
        const newItem = item;
        newItem.is_default = false;
        newArray.push(item);
      });
      newArray[cardId].is_default = true;
      return {
        ...state,
        studentCards: {
          ...state.studentCards,
          byId: newArray,
        },

        loading: { ...state.loading, makeStudentCardDefault: false },
        error: {
          ...state.error,
          makeStudentCardDefault: null,
        },
      };
    }
    case userConstants.MAKE_SELF_STUDENT_CARD_DEFAULT_FAIL:
      return {
        ...state,
        loading: { ...state.loading, makeStudentCardDefault: false },
        error: {
          ...state.error,
          makeStudentCardDefault: action.error,
        },
      };
    case userConstants.GET_SELF_STUDENT_CARD_REQUEST:
      return {
        ...state,
        loading: { ...state.loading, fetchStudentCard: true },
      };
    case userConstants.GET_SELF_STUDENT_CARD_SUCCESS: {
      const { data } = action.payload;
      return {
        ...state,

        user: {
          ...state.user,
          studentCard: data.map((item) => item.id),
        },

        // add studentCard id
        studentCards: {
          byId: data.reduce((acc, item) => ({ ...acc, [item.id]: { ...item } }), state.studentCards),
          allIds: data.map((item) => item.id),
        },

        loading: { ...state.loading, fetchStudentCard: false },
        error: {
          ...state.error,
          fetchStudentCard: null,
        },
      };
    }
    case userConstants.GET_SELF_STUDENT_CARD_FAIL: {
      return {
        ...state,

        // clear all student card ids of the account
        user: {
          ...state.user,
          studentCard: [],
        },

        studentCards: {
          byId: {},
          allIds: [],
        },

        loading: { ...state.loading, fetchStudentCard: false },
        error: {
          ...state.error,
          fetchStudentCard: action.error,
        },
      };
    }
    case userConstants.ADD_SELF_STUDENT_CARD_REQUEST:
      return {
        ...state,
        loading: { ...state.loading, addStudentCard: true },
      };
    case userConstants.ADD_SELF_STUDENT_CARD_SUCCESS: {
      const { accountId, data } = action.payload;
      return {
        ...state,
        loading: { ...state.loading, addStudentCard: false },
        error: {
          ...state.error,
          addStudentCard: null,
        },
      };
    }
    case userConstants.ADD_SELF_STUDENT_CARD_FAIL: {
      const { id, error } = action.payload;
      return {
        ...state,
        loading: { ...state.loading, addStudentCard: false },
        error: {
          ...state.error,
          addStudentCard: error,
        },
      };
    }
    default:
      return state;
  }
}
