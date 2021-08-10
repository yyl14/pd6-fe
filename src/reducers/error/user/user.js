import { userConstants } from '../../../actions/user/constants';

const initialState = {
  editAccount: null,
  fetchStudentCard: null,
  addStudentCard: null,
  makeStudentCardDefault: null,
  resetPassword: null,
  editPassword: null,
};

export default function user(state = initialState, action) {
  switch (action.type) {
    case userConstants.EDIT_SELF_ACCOUNT_SUCCESS: {
      return {
        ...state,
        editAccount: null,
      };
    }
    case userConstants.EDIT_SELF_ACCOUNT_FAIL:
      return {
        ...state,
        editAccount: action.error,
      };
    case userConstants.MAKE_SELF_STUDENT_CARD_DEFAULT_SUCCESS: {
      return {
        ...state,
        makeStudentCardDefault: null,
      };
    }
    case userConstants.MAKE_SELF_STUDENT_CARD_DEFAULT_FAIL:
      return {
        ...state,
        makeStudentCardDefault: action.error,
      };
    case userConstants.GET_SELF_STUDENT_CARD_SUCCESS: {
      return {
        ...state,
        fetchStudentCard: null,
      };
    }
    case userConstants.GET_SELF_STUDENT_CARD_FAIL: {
      return {
        ...state,
        fetchStudentCard: action.error,
      };
    }
    case userConstants.ADD_SELF_STUDENT_CARD_SUCCESS: {
      return {
        ...state,
        addStudentCard: null,
      };
    }
    case userConstants.ADD_SELF_STUDENT_CARD_FAIL: {
      return {
        ...state,
        addStudentCard: action.error,
      };
    }
    case userConstants.EDIT_SELF_PASSWORD_SUCCESS: {
      return {
        ...state,
        editPassword: null,
      };
    }
    case userConstants.EDIT_SELF_PASSWORD_FAIL: {
      return {
        ...state,
        editPassword: action.error,
      };
    }
    default: {
      return state;
    }
  }
}
