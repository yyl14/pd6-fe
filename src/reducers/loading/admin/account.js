import { accountConstants } from '../../../actions/admin/constant';

const initialState = {
  fetchInstitutes: false,
  fetchInstitute: false,
  addInstitute: false,
  editInstitute: false,

  fetchAccounts: false,
  fetchAccount: false,
  editAccount: false,
  deleteAccount: false,
  editPassword: false,

  fetchStudentCard: false,
  addStudentCard: false,
  makeStudentCardDefault: false,
};

export default function account(state = initialState, action) {
  switch (action.type) {
    case accountConstants.FETCH_INSTITUTES_REQUEST: {
      return {
        ...state,
        fetchInstitutes: true,
      };
    }
    case accountConstants.FETCH_INSTITUTES_SUCCESS: {
      return {
        ...state,
        fetchInstitutes: false,
      };
    }
    case accountConstants.FETCH_INSTITUTES_FAIL: {
      return {
        ...state,
        fetchInstitutes: false,
      };
    }

    case accountConstants.FETCH_INSTITUTE_REQUEST: {
      return {
        ...state,
        fetchInstitute: true,
      };
    }
    case accountConstants.FETCH_INSTITUTE_SUCCESS: {
      return {
        ...state,
        fetchInstitute: false,
      };
    }
    case accountConstants.FETCH_INSTITUTE_FAIL: {
      return {
        ...state,
        fetchInstitute: false,
      };
    }

    case accountConstants.ADD_INSTITUTE_REQUEST: {
      return {
        ...state,
        addInstitute: true,
      };
    }
    case accountConstants.ADD_INSTITUTE_SUCCESS: {
      return {
        ...state,
        addInstitute: false,
      };
    }
    case accountConstants.ADD_INSTITUTE_FAIL: {
      return {
        ...state,
        addInstitute: false,
      };
    }
    case accountConstants.EDIT_INSTITUTE_REQUEST: {
      return {
        ...state,
        editInstitute: true,
      };
    }
    case accountConstants.EDIT_INSTITUTE_SUCCESS: {
      return {
        ...state,
        editInstitute: false,
      };
    }
    case accountConstants.EDIT_INSTITUTE_FAIL: {
      return {
        ...state,
        editInstitute: false,
      };
    }

    case accountConstants.FETCH_ACCOUNTS_REQUEST: {
      return {
        ...state,
        fetchAccounts: true,
      };
    }
    case accountConstants.FETCH_ACCOUNTS_SUCCESS: {
      return {
        ...state,
        fetchAccounts: false,
      };
    }
    case accountConstants.FETCH_ACCOUNTS_FAIL: {
      return {
        ...state,
        fetchAccounts: false,
      };
    }

    case accountConstants.FETCH_ACCOUNT_REQUEST: {
      return {
        ...state,
        fetchAccount: true,
      };
    }
    case accountConstants.FETCH_ACCOUNT_SUCCESS: {
      return {
        ...state,
        fetchAccount: false,
      };
    }
    case accountConstants.FETCH_ACCOUNT_FAIL: {
      return {
        ...state,
        fetchAccount: false,
      };
    }

    case accountConstants.EDIT_ACCOUNT_REQUEST: {
      return {
        ...state,
        editAccount: true,
      };
    }
    case accountConstants.EDIT_ACCOUNT_SUCCESS: {
      return {
        ...state,
        editAccount: false,
      };
    }
    case accountConstants.EDIT_ACCOUNT_FAIL: {
      return {
        ...state,
        editAccount: false,
      };
    }

    case accountConstants.DELETE_ACCOUNT_REQUEST: {
      return {
        ...state,
        deleteAccount: true,
      };
    }
    case accountConstants.DELETE_ACCOUNT_SUCCESS: {
      return {
        ...state,
        deleteAccount: false,
      };
    }
    case accountConstants.DELETE_ACCOUNT_FAIL: {
      return {
        ...state,
        deleteAccount: false,
      };
    }

    case accountConstants.EDIT_PASSWORD_REQUEST: {
      return {
        ...state,
        editPassword: true,
      };
    }
    case accountConstants.EDIT_PASSWORD_SUCCESS: {
      return {
        ...state,
        editPassword: false,
      };
    }
    case accountConstants.EDIT_PASSWORD_FAIL: {
      return {
        ...state,
        editPassword: false,
      };
    }

    case accountConstants.FETCH_STUDENT_CARD_REQUEST: {
      return {
        ...state,
        fetchStudentCard: true,
      };
    }
    case accountConstants.FETCH_STUDENT_CARD_SUCCESS: {
      return {
        ...state,
        fetchStudentCard: false,
      };
    }
    case accountConstants.FETCH_STUDENT_CARD_FAIL: {
      return {
        ...state,
        fetchStudentCard: false,
      };
    }

    case accountConstants.ADD_STUDENT_CARD_REQUEST: {
      return {
        ...state,
        addStudentCard: true,
      };
    }
    case accountConstants.ADD_STUDENT_CARD_SUCCESS: {
      return {
        ...state,
        addStudentCard: false,
      };
    }
    case accountConstants.ADD_STUDENT_CARD_FAIL: {
      return {
        ...state,
        addStudentCard: false,
      };
    }

    case accountConstants.MAKE_STUDENT_CARD_DEFAULT_REQUEST: {
      return {
        ...state,
        makeStudentCardDefault: true,
      };
    }
    case accountConstants.MAKE_STUDENT_CARD_DEFAULT_SUCCESS: {
      return {
        ...state,
        makeStudentCardDefault: false,
      };
    }
    case accountConstants.MAKE_STUDENT_CARD_DEFAULT_FAIL: {
      return {
        ...state,
        makeStudentCardDefault: false,
      };
    }

    default: {
      return state;
    }
  }
}
