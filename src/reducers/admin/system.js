import {
  systemConstants,
} from '../../actions/constant';

const initialState = {
  logs: {
    byId: null,
    allIds: null,
  },
  accounts: {
    byId: null,
    allIds: null,
  },
  announcements: {
    byId: null,
    allIds: null,
  },
  submitLang: {
    byId: null,
    allIds: null,
  },
  loading: {
    fetchAccessLog: false,
    fetchAccount: false,
    fetchAnnouncement: false,
    editAnnouncement: false,
    addAnnouncement: false,
    deleteAnnouncement: false,
    fetchSubmitLanguage: false,
    editSubmitLanguage: false,
  },
  error: {
    fetchAccessLog: null,
    fetchAccount: null,
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
      const newData = data.map((item) => (
        {
          id: item.id,
          access_time: new Date(item.access_time),
          request_method: item.request_method,
          resource_path: item.resource_path,
          ip: item.ip,
          account_id: item.account_id,
        }
      ));
      return {
        ...state,
        logs: {
          byId: newData.reduce((acc, item) => ({ ...acc, [item.id]: { ...item } }), state.logs),
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
    case systemConstants.FETCH_LOG_ACCOUNTS_START:
      return {
        ...state,
        loading: {
          ...state.loading,
          fetchAccount: true,
        },
      };
    case systemConstants.FETCH_LOG_ACCOUNTS_SUCCESS: {
      const data = Object.values(action.payload);
      return {
        ...state,
        accounts: {
          byId: data.reduce((acc, item) => ({ ...acc, [item.id]: { ...item } }), state.accounts),
          allIds: data.map((item) => item.id),
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
    }
    case systemConstants.FETCH_LOG_ACCOUNTS_FAIL: {
      const error = action.payload;
      return {
        ...state,
        accounts: {
          byId: {},
          allIds: [],
        },
        loading: {
          ...state.loading,
          fetchAccount: false,
        },
        error: {
          ...state.error,
          fetchAccount: error,
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
      const newData = data.map((item) => (
        {
          id: item.id,
          title: item.title,
          content: item.content,
          author_id: item.author_id,
          post_time: new Date(item.post_time),
          expire_time: new Date(item.expire_time),
          is_deleted: item.is_deleted,
        }
      ));
      return {
        ...state,
        announcements: {
          byId: newData.reduce((acc, item) => ({ ...acc, [item.id]: { ...item } }), state.announcements),
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
      // console.log('edit api response', action.payload);
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
      // console.log('add success : ', action.payload);
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
      // console.log('delete api response', action.payload);
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
