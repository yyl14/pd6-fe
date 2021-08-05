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
  loading: {
    fetchAccessLog: false,
    fetchAnnouncement: false,
    editAnnouncement: false,
    addAnnouncement: false,
    deleteAnnouncement: false,
    fetchSubmitLanguage: false,
    editSubmitLanguage: false,
  },
  error: {
    fetchAccessLog: null,
    fetchAnnouncement: null,
    editAnnouncement: null,
    addAnnouncement: null,
    deleteAnnouncement: null,
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
    case systemConstants.EDIT_ANNOUNCEMENT_START: {
      return {
        ...state,
        loading: {
          ...state.loading,
          editAnnouncement: true,
        },
      };
    }
    case systemConstants.EDIT_ANNOUNCEMENT_SUCCESS: {
      return {
        ...state,
        loading: {
          ...state.loading,
          editAnnouncement: false,
        },
        error: {
          ...state.error,
          editAnnouncement: null,
        },
      };
    }
    case systemConstants.EDIT_ANNOUNCEMENT_FAIL: {
      return {
        ...state,
        loading: {
          ...state.loading,
          addAnnouncement: false,
        },
        error: {
          ...state.error,
          addAnnouncement: action.error,
        },
      };
    }
    case systemConstants.ADD_ANNOUNCEMENT_START: {
      return {
        ...state,
        loading: {
          ...state.loading,
          addAnnouncement: true,
        },
      };
    }
    case systemConstants.ADD_ANNOUNCEMENT_SUCCESS: {
      return {
        ...state,
        loading: {
          ...state.loading,
          addAnnouncement: false,
        },
        error: {
          ...state.error,
          addAnnouncement: null,
        },
      };
    }
    case systemConstants.ADD_ANNOUNCEMENT_FAIL: {
      return {
        ...state,
        loading: {
          ...state.loading,
          addAnnouncement: false,
        },
        error: {
          ...state.error,
          addAnnouncement: action.error,
        },
      };
    }
    case systemConstants.DELETE_ANNOUNCEMENT_START: {
      return {
        ...state,
        loading: {
          ...state.loading,
          deleteAnnouncement: true,
        },
      };
    }
    case systemConstants.DELETE_ANNOUNCEMENT_SUCCESS: {
      return {
        ...state,
        loading: {
          ...state.loading,
          deleteAnnouncement: false,
        },
        error: {
          ...state.error,
          deleteAnnouncement: null,
        },
      };
    }
    case systemConstants.DELETE_ANNOUNCEMENT_FAIL: {
      return {
        ...state,
        loading: {
          ...state.loading,
          deleteAnnouncement: false,
        },
        error: {
          ...state.error,
          deleteAnnouncement: action.error,
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
        submitLang: {
          ...state.submitLang,
          byId: { ...state.submitLang.byId, [data.id]: action.payload },
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
