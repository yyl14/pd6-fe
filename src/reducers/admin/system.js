import {
  systemConstants,
} from '../../actions/constant';

const initialState = {
  logs: {
    byId: {},
    allIds: [],
  },
  announcements: {
    byId: {},
    allIds: [],
  },
  submitLang: {
    byId: {},
    allIds: [],
  },
  // submitLang: {
  //   byId: {
  //     1: {
  //       id: 1,
  //       name: 'Python',
  //       version: '3.8.0',
  //       is_disabled: false,
  //     },
  //     2: {
  //       id: 2,
  //       name: 'Python',
  //       version: '3.8.1',
  //       is_disabled: false,
  //     },
  //     3: {
  //       id: 3,
  //       name: 'Python',
  //       version: '3.8.2',
  //       is_disabled: false,
  //     },
  //     4: {
  //       id: 4,
  //       name: 'Python',
  //       version: '3.8.3',
  //       is_disabled: false,
  //     },
  //     5: {
  //       id: 5,
  //       name: 'Python',
  //       version: '3.8.4',
  //       is_disabled: true,
  //     },
  //     6: {
  //       id: 6,
  //       name: 'Python',
  //       version: '3.8.5',
  //       is_disabled: true,
  //     },
  //   },
  //   allIds: [1, 2, 3, 4, 5, 6],
  // },
  loading: {
    fetchAccessLog: false,
    fetchAnnouncement: false,
    fetchSubmitLanguage: false,
    editSubmitLanguage: false,
  },
  error: {
    fetchAccessLog: null,
    fetchAnnouncement: null,
    fetchSubmitLanguage: null,
    editSubmitLanguage: null,
  },
};

export default function system(state = initialState, action) {
  // console.log('system reducer is called! :', action.type);
  switch (action.type) {
    /* Access Logs */
    case systemConstants.FETCH_ACCESS_LOG_START:
      return {
        ...state,
        loading: {
          ...state.loading,
          fetchAccessLog: true,
        },
      };
    case systemConstants.FETCH_ACCESS_LOG_SUCCESS: {
      const data = Object.values(action.payload);
      return {
        ...state,
        logs: {
          byId: data,
          allIds: data.map((item) => item.id),
        },
        loading: {
          ...state.loading,
          fetchAccessLog: false,
        },
        error: {
          ...state.error,
          fetchAccessLog: null,
        },
      };
    }
    case systemConstants.FETCH_ACCESS_LOG_FAIL: {
      const error = action.payload;
      return {
        ...state,
        logs: {
          byId: {},
          allIds: [],
        },
        loading: {
          ...state.loading,
          fetchAccessLog: false,
        },
        error: {
          ...state.error,
          fetchAccessLog: error,
        },
      };
    }
    /* Announcement */
    case systemConstants.FETCH_ANNOUNCEMENT_START:
      return {
        ...state,
        loading: {
          ...state.loading,
          fetchAnnouncement: true,
        },
      };
    case systemConstants.FETCH_ANNOUNCEMENT_SUCCESS: {
      const data = Object.values(action.payload);
      return {
        ...state,
        announcements: {
          byId: data,
          allIds: data.map((item) => item.id),
        },
        loading: {
          ...state.loading,
          fetchAnnouncement: false,
        },
        error: {
          ...state.error,
          fetchAnnouncement: null,
        },
      };
    }
    case systemConstants.FETCH_ANNOUNCEMENT_FAIL: {
      const error = action.payload;
      return {
        ...state,
        announcements: {
          byId: {},
          allIds: [],
        },
        loading: {
          ...state.loading,
          fetchAnnouncement: false,
        },
        error: {
          ...state.error,
          fetchAnnouncement: error,
        },
      };
    }
    /* SubmitLang */
    case systemConstants.FETCH_SUBMIT_LANGUAGE_START: {
      return {
        ...state,
        loading: {
          ...state.loading,
          fetchSubmitLanguage: true,
        },
      };
    }
    case systemConstants.FETCH_SUBMIT_LANGUAGE_SUCCESS: {
      const { data } = action.payload;
      return {
        ...state,
        submitLang: {
          byId: data.reduce((acc, item) => ({ ...acc, [item.id]: { ...item } }), state.submitLang),
          allIds: data.map((item) => item.id),
        },
        loading: {
          ...state.loading,
          fetchSubmitLanguage: false,
        },
        error: {
          ...state.error,
          fetchSubmitLanguage: null,
        },
      };
    }
    case systemConstants.FETCH_SUBMIT_LANGUAGE_FAIL: {
      return {
        ...state,
        loading: {
          ...state.loading,
          fetchSubmitLanguage: false,
        },
        error: {
          ...state.error,
          fetchSubmitLanguage: action.error,
        },
      };
    }
    case systemConstants.EDIT_SUBMIT_LANGUAGE_START: {
      return {
        ...state,
        loading: {
          ...state.loading,
          editSubmitLanguage: true,
        },
      };
    }
    case systemConstants.EDIT_SUBMIT_LANGUAGE_SUCCESS: {
      const { data } = action.payload;
      return {
        ...state,
        logs: {
          ...state.logs,
          byId: { ...state.logs.byId, [data.id]: action.payload },
        },
        loading: {
          ...state.loading,
          editSubmitLanguage: false,
        },
        error: {
          ...state.error,
          editSubmitLanguage: null,
        },
      };
    }
    case systemConstants.EDIT_SUBMIT_LANGUAGE_FAIL: {
      return {
        ...state,
        loading: {
          ...state.loading,
          editSubmitLanguage: false,
        },
        error: {
          ...state.error,
          editSubmitLanguage: action.error,
        },
      };
    }
    default: {
      return state;
    }
  }
}
