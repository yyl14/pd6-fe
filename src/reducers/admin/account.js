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
        studentCard: [1, 2],
      },
    },
    allIds: [1, 2],
  },

  studentCards: {
    byId: {
      1: {
        id: 1,
        institute_id: 1,
        department: 'IM',
        student_id: 'B10705001',
        email: 'B10705001@ntu.edu.tw',
        is_default: true,
      },
      2: {
        id: 2,
        institute_id: 1,
        department: 'IM',
        student_id: 'R10705001',
        email: 'R10705001@ntu.edu.tw',
        is_default: false,
      },
    },
    allIds: [1, 2],
  },

  loading: {
    fetchInstitutes: false,
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
    fetchInstitutes: null,
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
        ...state,
        loading: { ...state.loading, makeStudentCardDefault: true },
      };
    case accountConstants.MAKE_STUDENT_CARD_DEFAULT_SUCCESS: {
      const { cardId, data } = action.payload;
      return {
        ...state,

        studentCards: state.studentCards.map((item) => (item.id === cardId ? { ...item, default: true } : item)),

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
          makeStudentCardDefault: action.payload.error,
        },
      };
    case accountConstants.FETCH_STUDENT_CARD_REQUEST:
      return {
        ...state,
        loading: { ...state.loading, FETCH_STUDENT_CARD_REQUEST: true },
      };
    case accountConstants.FETCH_STUDENT_CARD_SUCCESS: {
      const { id, data } = action.payload;
      return {
        ...state,

        // add studentCard id to account
        accounts: state.accounts.byId.filter((item) => (item.id === id ? { ...item, studentCard: data.map((dataItem) => dataItem.id) } : item)),

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
    case accountConstants.FETCH_STUDENT_CARD_FAIL: {
      const { id, error } = action.payload;
      return {
        ...state,

        // clear all student card ids of the account
        accounts: state.accounts.map((item) => (item.id === id ? { ...item, studentCard: [] } : item)),

        loading: { ...state.loading, fetchStudentCard: false },
        error: {
          ...state.error,
          fetchStudentCard: error,
        },
      };
    }
    case accountConstants.ADD_STUDENT_CARD_REQUEST:
      return {
        ...state,
        loading: { ...state.loading, addStudentCard: true },
      };
    case accountConstants.ADD_STUDENT_CARD_SUCCESS: {
      const { accountId, data } = action.payload;
      return {
        ...state,

        // add to account
        accounts: state.accounts.byId.filter((item) => (item.id === data.id ? { ...item, studentCard: item.studentCard.concat([[data.id]]) } : item)),

        // add to student card
        studentCards: {
          ...state.studentCards,
          byId: { [data.id]: data },
          allIds: state.studentCards.allIds.concat([data.id]),
        },

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
