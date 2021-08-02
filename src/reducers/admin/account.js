import { accountConstants } from '../../actions/constant';

const initialState = {
  institutes: {
    byId: {},
    allIds: [],
  },

  accounts: {
    byId: {},
    allIds: [],
  },

  studentCard: {
    byId: {},
    allIds: [],
  },

  loading: {
    fetchInstitute: false,
    addInstitute: false,
    editInstitute: false,

    fetchAccount: false,
    editAccount: false,
    deleteAccount: false,

    fetchStudentCard: false,
    addStudentCard: false,
    makeStudentCardDefault: false,
  },

  error: {
    fetchInstitute: null,
    addInstitute: null,
    editInstitute: null,

    fetchAccount: null,
    editAccount: null,
    deleteAccount: null,

    fetchStudentCard: null,
    addStudentCard: null,
    makeStudentCardDefault: null,
  },
};

export default function account(state = initialState, action) {
  switch (action.type) {
    // institute
    case accountConstants.FETCH_INSTITUTE_REQUEST:
      return {
        ...state,
        loading: {
          ...state.loading,
          fetchInstitute: true,
        },
      };
    case accountConstants.FETCH_INSTITUTE_SUCCESS:
      return {
        ...state,
        institutes: {
          byId: action.payload.reduce((acc, item) => ({ ...acc, [item.id]: { ...item } }), state.institutes),
          allIds: action.payload.map((item) => item.id),
        },
        loading: {
          ...state.loading,
          fetchInstitute: false,
        },
        error: {
          ...state.error,
          fetchInstitute: null,
        },
      };
    case accountConstants.FETCH_INSTITUTE_FAIL:
      return {
        ...state,
        loading: {
          ...state.loading,
          fetchInstitute: false,
        },
        error: {
          ...state.error,
          fetchInstitute: action.error,
        },
      };
    case accountConstants.ADD_INSTITUTE_REQUEST:
      return {
        ...state,
        loading: {
          ...state.loading,
          addInstitute: true,
        },
      };
    case accountConstants.ADD_INSTITUTE_SUCCESS:
      return {
        ...state,
        institutes: {
          ...state.institutes,
          byId: { [action.payload.id]: action.payload },
          allIds: state.institutes.allIds.concat([[action.payload.id]]),
        },
        loading: {
          ...state.loading,
          addInstitute: false,
        },
        error: {
          ...state.error,
          addInstitute: null,
        },
      };
    case accountConstants.ADD_INSTITUTE_FAIL:
      return {
        ...state,
        loading: {
          ...state.loading,
          addInstitute: false,
        },
        error: {
          ...state.error,
          addInstitute: action.error,
        },
      };
    case accountConstants.EDIT_INSTITUTE_REQUEST:
      return {
        ...state,
        loading: {
          ...state.loading,
          editInstitute: true,
        },
      };
    case accountConstants.EDIT_INSTITUTE_SUCCESS:
      return {
        ...state,
        institutes: { ...state.institutes, [action.payload.id]: action.payload },
        loading: {
          ...state.loading,
          editInstitute: false,
        },
        error: {
          ...state.error,
          editInstitute: null,
        },
      };
    case accountConstants.EDIT_INSTITUTE_FAIL:
      return {
        ...state,
        loading: {
          ...state.loading,
          addInstitute: false,
        },
        error: {
          ...state.error,
          addInstitute: action.error,
        },
      };

    // account
    case accountConstants.FETCH_ACCOUNTS_REQUEST:
      return {
        ...state,
        loading: {
          ...state.loading,
          fetchAccount: true,
        },
      };
    case accountConstants.FETCH_ACCOUNTS_SUCCESS:
      return {
        ...state,
        accounts: {
          byId: action.payload.reduce((acc, item) => ({ ...acc, [item.id]: { ...item, studentCard: [] } }), state.institutes),
          allIds: action.payload.map((item) => item.id),
        },
        loading: {
          ...state.loading,
          fetchAccount: false,
        },
        error: {
          ...state.error,
          fetchAccount: null,
        },
      };
    case accountConstants.FETCH_ACCOUNTS_FAIL:
      return {
        ...state,
        loading: {
          ...state.loading,
          fetchAccount: false,
        },
        error: {
          ...state.error,
          fetchAccount: action.error,
        },
      };
    case accountConstants.EDIT_ACCOUNT_REQUEST:
      return {
        ...state,
        loading: {
          ...state.loading,
          editAccount: true,
        },
      };
    case accountConstants.EDIT_ACCOUNT_SUCCESS: {
      const editedAccount = state.account.byId[action.payload.id];
      editedAccount.nickname = action.payload.nickname;
      editedAccount.alternative_email = action.payload.alternative_email;
      return {
        ...state,
        accounts: { ...state.account, [action.payload.id]: editedAccount },
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
    case accountConstants.EDIT_ACCOUNT_FAIL:
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
    case accountConstants.DELETE_ACCOUNT_REQUEST:
      return {
        ...state,
        loading: {
          ...state.loading,
          deleteAccount: true,
        },
      };
    case accountConstants.DELETE_ACCOUNT_SUCCESS: {
      const newById = { ...state.account.byId };
      delete newById[action.payload.id];
      return {
        ...state,
        accounts: {
          ...state.account,
          byId: newById,
          allIds: state.account.allIds.filter((item) => item !== action.payload.id),
        },
        loading: {
          ...state.loading,
          deleteAccount: false,
        },
        error: {
          ...state.error,
          deleteAccount: null,
        },
      };
    }
    case accountConstants.DELETE_ACCOUNT_FAIL:
      return {
        ...state,
        loading: {
          ...state.loading,
          deleteAccount: false,
        },
        error: {
          ...state.error,
          deleteAccount: action.error,
        },
      };

    // student card
    case accountConstants.MAKE_STUDENT_CARD_DEFAULT_REQUEST:
      return {

      };
    case accountConstants.MAKE_STUDENT_CARD_DEFAULT_SUCCESS:
      return {

      };
    case accountConstants.MAKE_STUDENT_CARD_DEFAULT_FAIL:
      return {

      };
    case accountConstants.FETCH_STUDENT_CARD_REQUEST:
      return {

      };
    case accountConstants.FETCH_STUDENT_CARD_SUCCESS:
      return {

      };
    case accountConstants.FETCH_STUDENT_CARD_FAIL:
      return {

      };
    case accountConstants.ADD_STUDENT_CARD_REQUEST:
      return {

      };
    case accountConstants.ADD_STUDENT_CARD_SUCCESS:
      return {

      };
    case accountConstants.ADD_STUDENT_CARD_FAIL:
      return {

      };
    default:
      return state;
  }
}
