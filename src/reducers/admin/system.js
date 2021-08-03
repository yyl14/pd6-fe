import {
  systemConstants,
} from '../../actions/constant';

const initialState = {
  logs: {
    byId: {},
    allIds: [],
  },
  loading: {
    fetchAccessLog: false,
  },
  error: {
    fetchAccessLog: null,
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
};

export default function system(state = initialState, action) {
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
      const { data } = action.payload;
      return {
        ...state,
        logs: {
          byId: data.reduce((acc, item) => ({ ...acc, [item.id]: { ...item, logIds: [] } }), state.logs),
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
      const { error } = action.payload;
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
    default: {
      return state;
    }
  }
}
