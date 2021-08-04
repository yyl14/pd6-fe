import {
  systemConstants,
} from '../../actions/constant';

const initialState = {
  logs: {
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
    fetchSubmitLang: false,
  },
  error: {
    fetchAccessLog: null,
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
          fetchCourse: true,
        },
      };
    case systemConstants.FETCH_ACCESS_LOG_SUCCESS: {
      const data = Object.values(action.payload);
      return {
        logs: {
          byId: data.map((log) => ({
            id: log.id,
            username: 'shiba',
            studentID: 'B07705002',
            realName: '黃祥祥',
            IP: log.ip,
            resourcePath: log.resource_path,
            requestMethod: log.request_method,
            accessTime: log.access_time,
          })),
          allIds: data.map((log) => log.id),
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
    default: {
      return state;
    }
  }
}
