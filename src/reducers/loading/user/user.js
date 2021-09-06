import { userConstants } from '../../../actions/user/constants';

const initialState = {
  editAccount: false,
  fetchStudentCards: false,
  addStudentCard: false,
  makeStudentCardDefault: false,
  resetPassword: false,
  editPassword: false,
};

export default function user(state = initialState, action) {
  switch (action.type) {
    case userConstants.EDIT_SELF_ACCOUNT_START:
      return {
        ...state,
        editAccount: true,
      };
    case userConstants.EDIT_SELF_ACCOUNT_SUCCESS:
      return {
        ...state,
        editAccount: false,
      };
    case userConstants.EDIT_SELF_ACCOUNT_FAIL:
      return {
        ...state,
        editAccount: false,
      };
    case userConstants.MAKE_SELF_STUDENT_CARD_DEFAULT_START:
      return {
        ...state,
        makeStudentCardDefault: true,
      };
    case userConstants.MAKE_SELF_STUDENT_CARD_DEFAULT_SUCCESS:
      return {
        ...state,
        makeStudentCardDefault: false,
      };
    case userConstants.MAKE_SELF_STUDENT_CARD_DEFAULT_FAIL:
      return {
        ...state,
        makeStudentCardDefault: false,
      };
    case userConstants.GET_SELF_STUDENT_CARD_START:
      return {
        ...state,
        fetchStudentCards: true,
      };
    case userConstants.GET_SELF_STUDENT_CARD_SUCCESS: {
      return {
        ...state,
        fetchStudentCards: false,
      };
    }
    case userConstants.GET_SELF_STUDENT_CARD_FAIL: {
      return {
        ...state,
        fetchStudentCards: false,
      };
    }
    case userConstants.ADD_SELF_STUDENT_CARD_START:
      return {
        ...state,
        addStudentCard: true,
      };
    case userConstants.ADD_SELF_STUDENT_CARD_SUCCESS: {
      return {
        ...state,
        addStudentCard: false,
      };
    }
    case userConstants.ADD_SELF_STUDENT_CARD_FAIL: {
      return {
        ...state,
        addStudentCard: false,
      };
    }
    case userConstants.EDIT_SELF_PASSWORD_START:
      return {
        ...state,
        editPassword: true,
      };
    case userConstants.EDIT_SELF_PASSWORD_SUCCESS: {
      return {
        ...state,
        editPassword: false,
      };
    }
    case userConstants.EDIT_SELF_PASSWORD_FAIL: {
      return {
        ...state,
        editPassword: false,
      };
    }
    default: {
      return state;
    }
  }
}
