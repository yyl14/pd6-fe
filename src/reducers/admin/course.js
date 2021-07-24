import { courseConstants } from '../../actions/constant';

const initialState = {
  courses: {
    byId: {},
    allIds: [],
    error: null,
    loading: false,
  },

  classes: {
    byId: {},
    allIds: [],
    error: null,
    loading: false,
  },

  // challenges: {
  //   byId: {},
  //   allIds: {},
  // },

  members: {
    byId: {},
    allIds: [],
    error: null,
    loading: false,
  },

  // teams: {
  //   byId: {},
  //   allIds: {},
  // },

  // grades: {
  //   byId: {},
  //   allIds: {},
  // },
};

export default function course(state = initialState, action) {
  switch (action.type) {
    // Course

    case courseConstants.FETCH_COURSES_START:
      return {
        ...state,
        courses: { ...state.courses, loading: true },
      };

    case courseConstants.FETCH_COURSES_SUCCESS: {
      const { data } = action.payload;
      return {
        ...state,
        courses: {
          byId: data.reduce((acc, item) => ({ ...acc, [item.key]: item }), {}),
          allIds: data.map((item) => item.id),
          error: null,
          loading: false,
        },
      };
    }

    case courseConstants.FETCH_COURSES_FAIL: {
      const { error } = action.payload;
      return {
        ...state,
        courses: {
          byId: {},
          allIds: [],
          error,
          loading: false,
        },
      };
    }

    case courseConstants.FETCH_COURSES_START:
      return {
        ...state,
        courses: { ...state.courses, loading: true },
      };

    case courseConstants.FETCH_COURSES_SUCCESS: {
      const { data } = action.payload;
      return {
        ...state,
        courses: {
          byId: data.reduce((acc, item) => ({ ...acc, [item.key]: item }), {}),
          allIds: data.map((item) => item.id),
          error: null,
          loading: false,
        },
      };
    }

    case courseConstants.FETCH_COURSES_FAIL: {
      const { error } = action.payload;
      return {
        ...state,
        courses: {
          byId: {},
          allIds: [],
          error,
          loading: false,
        },
      };
    }

    default: {
      return state;
    }
  }
}
