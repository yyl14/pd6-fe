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
};

export default function system(state = initialState, action) {
  switch (action.type) {
    /* Access Logs */
    case 'FETCH_ACCESS_LOG_START':
      return {
        ...state,
        loading: {
          ...state.loading,
          fetchCourse: true,
        },
      };
    case 'FETCH_ACCESS_LOG_SUCCESS': {
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
    case 'FETCH_ACCESS_LOG_FAIL': {
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
