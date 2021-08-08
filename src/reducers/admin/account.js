import { accountConstants } from '../../actions/constant';

const initialState = {
  institutes: {
    byId: {},
    allIds: [],
  },

  accounts: {
    byId: {
      1: {
        id: 1,
        username: 'admin',
        nickname: 'admin123',
        role: 'MANAGER',
        real_name: 'admin',
        alternative_email: null,
        student_id: 'admin',
        studentCard: [],
      },
      2: {
        id: 2,
        username: 'student1',
        nickname: 'student1',
        role: 'NORMAL',
        real_name: 'student1',
        alternative_email: 'student1@gmail.com',
        student_id: 'B10705001',
        studentCard: [],
      },
    },
    allIds: [1, 2],
    // byId: {},
    // allIds: [],
  },

  studentCards: {
    byId: {},
    allIds: [],
  },

  loading: {
    fetchInstitutes: false,
    fetchInstitute: false,
    addInstitute: false,
    editInstitute: false,

    fetchAccounts: false,
    fetchAccount: false,
    editAccount: false,
    deleteAccount: false,

    fetchStudentCard: false,
    addStudentCard: false,
    makeStudentCardDefault: false,
  },

  error: {
    fetchInstitutes: null,
    fetchInstitute: null,
    addInstitute: null,
    editInstitute: null,

    fetchAccounts: null,
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
    case accountConstants.FETCH_INSTITUTES_REQUEST:
      return {
        ...state,
        loading: {
          ...state.loading,
          fetchInstitutes: true,
        },
      };
    case accountConstants.FETCH_INSTITUTES_SUCCESS:
      return {
        ...state,
        institutes: {
          byId: action.payload.reduce((acc, item) => ({ ...acc, [item.id]: { ...item } }), state.institutes),
          allIds: action.payload.map((item) => item.id),
        },
        loading: {
          ...state.loading,
          fetchInstitutes: false,
        },
        error: {
          ...state.error,
          fetchInstitutes: null,
        },
      };
    case accountConstants.FETCH_INSTITUTES_FAIL:
      return {
        ...state,
        loading: {
          ...state.loading,
          fetchInstitutes: false,
        },
        error: {
          ...state.error,
          fetchInstitutes: action.error,
        },
      };
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
          byId: { ...state.institutes.byId, [action.payload.id]: action.payload },
          allId: state.institutes.allIds.includes(action.payload.id) ? state.institutes.allIds : state.institutes.allIds.concat([action.payload.id]),
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
    case accountConstants.ADD_INSTITUTE_SUCCESS: {
      return {
        ...state,
        institutes: {
          ...state.institutes,
          byId: { ...state.institutes.byId, [action.payload.id]: action.payload },
          allIds: state.institutes.allIds.concat([action.payload.id]),
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
    }
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
    case accountConstants.EDIT_INSTITUTE_SUCCESS: {
      return {
        ...state,
        institutes: { ...state.institutes, byId: { ...state.institutes.byId, [action.payload.id]: action.payload } },
        loading: {
          ...state.loading,
          editInstitute: false,
        },
        error: {
          ...state.error,
          editInstitute: null,
        },
      };
    }
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
          fetchAccounts: true,
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
          fetchAccounts: false,
        },
        error: {
          ...state.error,
          fetchAccounts: null,
        },
      };
    case accountConstants.FETCH_ACCOUNTS_FAIL:
      return {
        ...state,
        loading: {
          ...state.loading,
          fetchAccounts: false,
        },
        error: {
          ...state.error,
          fetchAccounts: action.error,
        },
      };
    case accountConstants.FETCH_ACCOUNT_REQUEST:
      return {
        ...state,
        loading: {
          ...state.loading,
          fetchAccount: true,
        },
      };
    case accountConstants.FETCH_ACCOUNT_SUCCESS:
      return {
        ...state,
        accounts: {
          byId: { ...state.accounts.byId, [action.payload.id]: { ...action.payload, studentCard: [] } },
          allIds: state.accounts.allIds.includes(action.payload.id) ? state.accounts.allIds : state.accounts.allIds.concat([action.payload.id]),
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
    case accountConstants.FETCH_ACCOUNT_FAIL:
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
      const editedAccount = state.accounts.byId[action.payload.id];
      editedAccount.nickname = action.payload.nickname;
      editedAccount.alternative_email = action.payload.alternative_email;
      editedAccount.real_name = action.payload.real_name;
      // editedAccount.username = action.payload.username;
      return {
        ...state,
        accounts: {
          ...state.accounts, byId: { ...state.accounts.byId, [action.payload.id]: editedAccount },
        },
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
      const newById = { ...state.accounts.byId };
      delete newById[action.payload.id];
      return {
        ...state,
        accounts: {
          ...state.accounts,
          byId: newById,
          allIds: state.accounts.allIds.filter((item) => item !== action.payload.id),
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
        ...state,
        loading: { ...state.loading, makeStudentCardDefault: true },
      };
    case accountConstants.MAKE_STUDENT_CARD_DEFAULT_SUCCESS: {
      const { cardId, id } = action.payload;
      const newById = state.studentCards.byId;

      state.accounts.byId[id].studentCard.forEach((item) => {
        if (item === cardId) {
          newById[item].is_default = true;
        } else {
          newById[item].is_default = false;
        }
      });
      return {
        ...state,
        studentCards: {
          ...state.studentCards,
          byId: newById,
        },
        loading: { ...state.loading, makeStudentCardDefault: false },
        error: {
          ...state.error,
          makeStudentCardDefault: null,
        },
      };
    }
    case accountConstants.MAKE_STUDENT_CARD_DEFAULT_FAIL:
      return {
        ...state,
        loading: { ...state.loading, makeStudentCardDefault: false },
        error: {
          ...state.error,
          makeStudentCardDefault: action.error,
        },
      };
    case accountConstants.FETCH_STUDENT_CARD_REQUEST:
      return {
        ...state,
        loading: { ...state.loading, fetchStudentCard: true },
      };
    case accountConstants.FETCH_STUDENT_CARD_SUCCESS: {
      const { id, data } = action.payload;
      // console.log(id, data);
      return {
        ...state,

        // add studentCard id to account
        accounts: {
          ...state.accounts,
          byId: { ...state.accounts.byId, [id]: { ...state.accounts.byId[id], studentCard: data.map((dataItem) => dataItem.id) } },
        },
        // add studentCard id
        studentCards: {
          // byId: data.reduce((acc, item) => ({ ...acc, [item.id]: { ...item } }), state.studentCards.byId),
          byId: data,
          // allIds: state.studentCards.allIds.concat(data.map((item) => item.id)),
          allIds: data.map((item) => item.id),
        },

        loading: { ...state.loading, fetchStudentCard: false },
        error: {
          ...state.error,
          fetchStudentCard: null,
        },
      };
    }
    case accountConstants.FETCH_STUDENT_CARD_FAIL: {
      const { id } = action.payload;
      return {
        ...state,

        // clear all student card ids of the account
        accounts: {
          ...state.accounts,
          byId: { ...state.accounts.byId, [id]: { ...state.accounts.byId[id], studentCard: [] } },
        },

        loading: { ...state.loading, fetchStudentCard: false },
        error: {
          ...state.error,
          fetchStudentCard: action.error,
        },
      };
    }
    case accountConstants.ADD_STUDENT_CARD_REQUEST:
      return {
        ...state,
        loading: { ...state.loading, addStudentCard: true },
      };
    case accountConstants.ADD_STUDENT_CARD_SUCCESS: {
      return {
        ...state,
        loading: { ...state.loading, addStudentCard: false },
        error: {
          ...state.error,
          addStudentCard: null,
        },
      };
    }
    case accountConstants.ADD_STUDENT_CARD_FAIL: {
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
