import { accountConstants } from '../../actions/constant';

const initialState = {
  // institutes: {
  //   byId: {
  //     1111: {
  //       id: 1111,
  //       abbreviated_name: 'NTU',
  //       full_name: 'National Taiwan University',
  //       email_domain: 'ntu.edu.tw',
  //       is_disabled: false,
  //     },
  //     1112: {
  //       id: 1112,
  //       abbreviated_name: 'NTNU',
  //       full_name: 'National Taiwan Normal University',
  //       email_domain: 'ntnu.edu.tw',
  //       is_disabled: true,
  //     },
  //     1113: {
  //       id: 1113,
  //       abbreviated_name: 'NTUST',
  //       full_name: 'National Taiwan University of Science and Technology',
  //       email_domain: 'ntust.edu.tw',
  //       is_disabled: false,
  //     },
  //   },
  //   allIds: [1111, 1112, 1113],
  // },

  institutes: {
    byId: {},
    allIds: [],
  },

  accounts: {
    byId: {
      1111: {
        id: 1111,
        username: 'shiba',
        nickname: 'shiba',
        role: 'manager',
        real_name: '陳以潼',
        student_id: 'b08705080',
        alternative_email: 'sdf@ergh',
        studentCard: [11111, 11112],
      },
      1112: {
        id: 1112,
        username: 'banana',
        nickname: 'banana',
        role: 'manager',
        real_name: '陳以潼',
        student_id: 'b08705080',
        alternative_email: 'sdf@ergh',
        studentCard: [11121],
      },
      1113: {
        id: 1113,
        username: 'fredred',
        nickname: 'fredred',
        role: 'manager',
        real_name: '祝浩文',
        student_id: 'b08705080',
        alternative_email: 'sdf@ergh',
        studentCard: [11131],
      },
    },
    allIds: [1111, 1112, 1113],
  },

  studentCards: {
    byId: {
      11111: {
        id: 11111,
        institute_id: 0,
        department: 'string',
        student_id: 'b08705080',
        email: 'b08705080@ntu.edu.tw',
        is_default: true,
      },
      11112: {
        id: 11112,
        institute_id: 0,
        department: 'string',
        student_id: 'b08705081',
        email: 'b08705081@ntu.edu.tw',
        is_default: false,
      },
      11121: {
        id: 11121,
        institute_id: 0,
        department: 'string',
        student_id: 'b08705082',
        email: 'b08705082@ntu.edu.tw',
        is_default: true,
      },
      11131: {
        id: 11131,
        institute_id: 0,
        department: 'string',
        student_id: 'b08705083',
        email: 'b08705083@ntu.edu.tw',
        is_default: true,
      },
    },
    allIds: [11111, 11112, 11121, 11131],
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
          allIds: state.studentCards.allIds.concat([[data.id]]),
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
