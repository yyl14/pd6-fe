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
    // Courses
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

    // Classes
    case courseConstants.FETCH_CLASSES_START:
      return {
        ...state,
        classes: { ...state.classes, loading: true },
      };
    case courseConstants.FETCH_CLASSES_SUCCESS: {
      const { data } = action.payload;
      return {
        ...state,
        classes: {
          byId: data.reduce((acc, item) => ({ ...acc, [item.key]: item }), {}),
          allIds: data.map((item) => item.id),
          error: null,
          loading: false,
        },
      };
    }
    case courseConstants.FETCH_CLASSES_FAIL: {
      const { error } = action.payload;
      return {
        ...state,
        classes: {
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
