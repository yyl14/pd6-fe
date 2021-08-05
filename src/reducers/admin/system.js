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
//   },

//   announcement: {
//     byId: {
//       1: {
//         id: 1,
//         title: '系統維修A',
//         PostTime: '2021-01-01, 09:21',
//         EndTime: '2021-03-30, 09:21',
//         Content: '1111111111111',
//       },
//       2: {
//         id: 2,
//         title: '系統維修B',
//         PostTime: '2021-04-20, 09:21',
//         EndTime: '2021-08-10, 09:21',
//         Content: '2222222222222222',
//       },
//       3: {
//         id: 3,
//         title: '系統維修C',
//         PostTime: '2021-03-01, 09:21',
//         EndTime: '2021-03-02, 09:21',
//         Content: '3333333333333333',
//       },
//       4: {
//         id: 4,
//         title: 'Robin心情很好',
//         PostTime: '2021-05-01, 09:21',
//         EndTime: '2021-06-01, 09:21',
//         Content: '44444444444444',
//       },
//       5: {
//         id: 5,
//         title: '作業太難',
//         PostTime: '2021-03-01, 09:21',
//         EndTime: '2021-03-19, 09:21',
//         Content: '55555555555555',
//       },
//       6: {
//         id: 6,
//         title: '小傑生日不用寫作業',
//         PostTime: '2021-06-06, 09:21',
//         EndTime: '2021-06-07, 09:21',
//         Content: '6666666666',
//       },
//     },
//     allIds: [1, 2, 3, 4, 5, 6],
//   },
//   submitLang: {
//     byId: {
//       1: {
//         id: 1,
//         name: 'Python',
//         version: '3.8.0',
//         is_disabled: false,
//       },
//       2: {
//         id: 2,
//         name: 'Python',
//         version: '3.8.1',
//         is_disabled: false,
//       },
//       3: {
//         id: 3,
//         name: 'Python',
//         version: '3.8.2',
//         is_disabled: false,
//       },
//       4: {
//         id: 4,
//         name: 'Python',
//         version: '3.8.3',
//         is_disabled: false,
//       },
//       5: {
//         id: 5,
//         name: 'Python',
//         version: '3.8.4',
//         is_disabled: true,
//       },
//       6: {
//         id: 6,
//         name: 'Python',
//         version: '3.8.5',
//         is_disabled: true,
//       },
//     },
//     allIds: [1, 2, 3, 4, 5, 6],
// =======

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
