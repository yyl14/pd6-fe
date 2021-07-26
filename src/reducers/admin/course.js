import { courseConstants } from '../../actions/constant';

const initialState = {
  courses: {
    byId: {},
    allIds: [],
    error: null,
    loading: false,
    addLoading: false,
    editLoading: false,
    deleteLoading: false,
  },

  classes: {
    byId: {},
    allIds: [],
    error: null,
    loading: false,
  },

  members: {
    byId: {},
    allIds: [],
    error: null,
    loading: false,
  },
};

export default function course(state = initialState, action) {
  switch (action.type) {
    /* Courses */
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
          byId: data.reduce((acc, item) => ({ ...acc, [item.id]: { ...item, classIds: [] } }), state.courses),
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

    case courseConstants.ADD_COURSE_START: {
      return {
        ...state,
        courses: { ...state.courses, addLoading: true },
      };
    }
    case courseConstants.ADD_COURSE_SUCCESS: {
      const { courseId, data } = action.payload;
      return {
        ...state,
        courses: {
          ...state.courses,
          byId: { [courseId]: data },
          allIds: state.course.allIds.concat([[courseId]]),
          addLoading: false,
        },
      };
    }
    case courseConstants.ADD_COURSE_FAIL: {
      const { error } = action.payload;
      return {
        ...state,
        courses: {
          ...state.courses,
          addLoading: false,
          error,
        },
      };
    }

    case courseConstants.EDIT_COURSE_START: {
      return {
        ...state,
        courses: { ...state.courses, editLoading: true },
      };
    }
    case courseConstants.EDIT_COURSE_SUCCESS: {
      const { courseId, data } = action.payload;
      return {
        ...state,
        courses: {
          ...state.courses,
          byId: { [courseId]: data },
          editLoading: false,
        },
      };
    }
    case courseConstants.EDIT_COURSE_FAIL: {
      const { error } = action.payload;
      return {
        ...state,
        courses: {
          ...state.courses,
          editLoading: false,
          error,
        },
      };
    }

    case courseConstants.DELETE_COURSE_START: {
      return {
        ...state,
        courses: { ...state.courses, deleteLoading: true },
      };
    }
    case courseConstants.DELETE_COURSE_SUCCESS: {
      const { courseId } = action.payload;
      const newById = state.courses.byId;
      delete newById[courseId];
      return {
        ...state,
        courses: {
          ...state.courses,
          byId: newById,
          allIds: state.courses.allIds.filter((item) => item !== courseId),
          deleteLoading: false,
        },
      };
    }
    case courseConstants.DELETE_COURSE_FAIL: {
      const { error } = action.payload;
      return {
        ...state,
        courses: {
          ...state.courses,
          deleteLoading: false,
          error,
        },
      };
    }

    /* Classes */
    case courseConstants.FETCH_CLASSES_START:
      return {
        ...state,
        classes: { ...state.classes, loading: true },
      };

    case courseConstants.FETCH_CLASSES_SUCCESS: {
      const { courseId, data } = action.payload;
      return {
        ...state,

        // add class ids to course
        courses: state.courses.byId.filter((item) => (item.id === courseId ? { ...item, classIds: data.map((dataItem) => dataItem.id) } : item)),

        // add class data
        classes: {
          byId: data.reduce((acc, item) => ({ ...acc, [item.id]: { ...item, memberIds: [] } }), state.classes),
          allIds: data.map((item) => item.id),
          error: null,
          loading: false,
        },
      };
    }

    case courseConstants.FETCH_CLASSES_FAIL: {
      const { courseId, error } = action.payload;
      return {
        ...state,

        // clear all class ids of the course
        courses: state.courses.map((item) => (item.id === courseId ? { ...item, classIds: [] } : item)),

        // class data will NOT be cleared
        classes: {
          ...state.classes,
          error,
          loading: false,
        },
      };
    }

    /* Members */
    case courseConstants.FETCH_MEMBERS_START: {
      return {
        ...state,
        members: {
          ...state.members,
          loading: true,
        },
      };
    }
    case courseConstants.FETCH_MEMBERS_SUCCESS: {
      const { classId, data } = action.payload;
      return {
        ...state,
        // add member ids to class
        classes: state.classes.byId.filter((item) => (item.id === classId ? { ...item, memberIds: data.map((dataItem) => dataItem.id) } : item)),

        // add member data
        members: {
          byId: data.reduce((acc, item) => ({ ...acc, [item.id]: item }), state.members),
          allIds: data.map((item) => item.id),
          error: null,
          loading: false,
        },
      };
    }

    case courseConstants.FETCH_MEMBERS_FAIL: {
      const { classId, error } = action.payload;
      return {
        ...state,

        // clear all members ids of the class
        classes: state.courses.map((item) => (item.id === classId ? { ...item, memberIds: [] } : item)),

        // member data will NOT be cleared
        members: {
          ...state.members,
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
