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
    byId: {
      1: {
        id: 1,
        language: 'Python',
        version: '3.8.0',
        is_disabled: false,
      },
      2: {
        id: 2,
        language: 'Python',
        version: '3.8.1',
        is_disabled: false,
      },
      3: {
        id: 3,
        language: 'Python',
        version: '3.8.2',
        is_disabled: false,
      },
      4: {
        id: 4,
        language: 'Python',
        version: '3.8.3',
        is_disabled: false,
      },
      5: {
        id: 5,
        language: 'Python',
        version: '3.8.4',
        is_disabled: true,
      },
      6: {
        id: 6,
        language: 'Python',
        version: '3.8.5',
        is_disabled: true,
      },
    },
    allIds: [1, 2, 3, 4, 5, 6],
  },
  loading: {
    fetchAccessLog: false,
    fetchAnnouncement: false,
    fetchSubmitLang: false,
  },
  error: {
    fetchAccessLog: null,
    fetchAnnouncement: null,
    fetchSubmitLang: null,
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
    case systemConstants.FETCH_SUBMIT_LANG_START:
      return {
        ...state,
        loading: {
          ...state.loading,
          fetchSubmitLang: true,
        },
      };
    case systemConstants.FETCH_SUBMIT_LANG_SUCCESS: {
      const data = Object.values(action.payload);
      return {
        ...state,
        submitLang: {
          byId: data,
          allIds: data.map((item) => item.id),
        },
        loading: {
          ...state.loading,
          fetchSubmitLang: false,
        },
        error: {
          ...state.error,
          fetchSubmitLang: null,
        },
      };
    }
    case systemConstants.FETCH_SUBMIT_LANG_FAIL: {
      const error = action.payload;
      return {
        ...state,
        submitLang: {
          byId: {},
          allIds: [],
        },
        loading: {
          ...state.loading,
          fetchSubmitLang: false,
        },
        error: {
          ...state.error,
          fetchSubmitLang: error,
        },
      };
    }
    default: {
      return state;
    }
  }
}
