import { accountConstants } from '../../../actions/admin/constants';

const initialState = {
  etchInstitutes: null,
  fetchInstitute: null,
  addInstitute: null,
  editInstitute: null,

  fetchAccounts: null,
  fetchAccount: null,
  editAccount: null,
  deleteAccount: null,
  editPassword: null,

  fetchStudentCard: null,
  addStudentCard: null,
  makeStudentCardDefault: null,
};

export default function account(state = initialState, action) {
  switch (action.type) {
    case accountConstants.FETCH_ACCOUNTS_SUCCESS: {
      return {
        ...state,
        fetchAccounts: null,
      };
    }
    case accountConstants.FETCH_ACCOUNTS_FAIL: {
      return {
        ...state,
        fetchAccounts: action.error,
      };
    }
    case accountConstants.FETCH_ACCOUNT_SUCCESS: {
      return {
        ...state,
        fetchAccount: null,
      };
    }
    case accountConstants.FETCH_ACCOUNT_FAIL: {
      return {
        ...state,
        fetchAccount: action.error,
      };
    }
    case accountConstants.EDIT_ACCOUNT_SUCCESS: {
      return {
        ...state,
        editAccount: null,
      };
    }
    case accountConstants.EDIT_ACCOUNT_FAIL: {
      return {
        ...state,
        editAccount: action.error,
      };
    }
    case accountConstants.DELETE_ACCOUNT_SUCCESS: {
      return {
        ...state,
        deleteAccount: null,
      };
    }
    case accountConstants.DELETE_ACCOUNT_FAIL: {
      return {
        ...state,
        deleteAccount: action.error,
      };
    }
    case accountConstants.EDIT_PASSWORD_SUCCESS: {
      return {
        ...state,
        editPassword: null,
      };
    }
    case accountConstants.EDIT_PASSWORD_FAIL: {
      return {
        ...state,
        editPassword: action.error,
      };
    }
    case accountConstants.FETCH_STUDENT_CARD_SUCCESS: {
      return {
        ...state,
        fetchStudentCard: null,
      };
    }
    case accountConstants.FETCH_STUDENT_CARD_FAIL: {
      return {
        ...state,
        fetchStudentCard: action.error,
      };
    }
    case accountConstants.ADD_STUDENT_CARD_SUCCESS: {
      return {
        ...state,
        addStudentCard: null,
      };
    }
    case accountConstants.ADD_STUDENT_CARD_FAIL: {
      return {
        ...state,
        addStudentCard: action.error,
      };
    }
    case accountConstants.MAKE_STUDENT_CARD_DEFAULT_SUCCESS: {
      return {
        ...state,
        makeStudentCardDefault: null,
      };
    }
    case accountConstants.MAKE_STUDENT_CARD_DEFAULT_FAIL: {
      return {
        ...state,
        makeStudentCardDefault: action.error,
      };
    }
    default:
      return state;
  }
}
