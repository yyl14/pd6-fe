import { courseConstants } from '../../actions/constant';

const initialState = {
  courses: {
    byId: {},
    allIds: [],
  },

  classes: {
    byId: {},
    allIds: [],
    loading: false,
  },

  members: {
    byId: {},
    allIds: [],
    loading: false,
  },

  loading: {
    fetchCourse: false,
    addCourse: false,
    renameCourse: false,
    deleteCourse: false,

    fetchClasses: false,
    addClass: false,
    renameClass: false,
    deleteClass: false,

    fetchMembers: false,
    editMembers: false,
  },

  error: {
    fetchCourse: null,
    addCourse: null,
    editCourse: null,
    deleteCourse: null,

    fetchClasses: null,
    addClass: null,
    renameClass: null,
    deleteClass: null,

    fetchMembers: null,
    editMembers: null,
  },
};

export default function course(state = initialState, action) {
  switch (action.type) {
    /* Courses */
    case courseConstants.FETCH_COURSES_START:
      return {
        ...state,
        loading: {
          ...state.loading,
          fetchCourse: true,
        },
      };
    case courseConstants.FETCH_COURSES_SUCCESS: {
      const { data } = action.payload;
      return {
        ...state,
        courses: {
          byId: data.reduce((acc, item) => ({ ...acc, [item.id]: { ...item, classIds: [] } }), state.courses),
          allIds: data.map((item) => item.id),
        },
        loading: {
          ...state.loading,
          fetchCourse: false,
        },
        error: {
          ...state.error,
          fetchCourse: null,
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
        },
        loading: {
          ...state.loading,
          fetchCourse: false,
        },
        error: {
          ...state.error,
          fetchCourse: error,
        },
      };
    }

    case courseConstants.ADD_COURSE_START: {
      return {
        ...state,
        loading: { ...state.loading, addCourse: true },
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
        },
        loading: {
          ...state.loading,
          addCourse: false,
        },
        error: {
          ...state.error,
          addCourse: null,
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
        loading: {
          ...state.loading,
          addCourse: false,
        },
        error: {
          ...state.error,
          addCourse: error,
        },
      };
    }

    case courseConstants.RENAME_COURSE_START: {
      return {
        ...state,
        loading: { ...state.loading, renameCourse: true },
      };
    }
    case courseConstants.RENAME_COURSE_SUCCESS: {
      const { courseId, newName } = action.payload;
      return {
        ...state,
        courses: {
          ...state.courses,
          byId: { [courseId]: { ...state.courses.byId[courseId] }, name: newName },
        },
        loading: { ...state.loading, renameCourse: false },
        error: { ...state.error, renameCourse: null },
      };
    }
    case courseConstants.RENAME_COURSE_FAIL: {
      const { error } = action.payload;
      return {
        ...state,
        loading: { ...state.loading, renameCourse: false },
        error: { ...state.error, renameCourse: error },
      };
    }

    case courseConstants.DELETE_COURSE_START: {
      return {
        ...state,
        loading: {
          ...state.loading,
          deleteCourse: true,
        },
      };
    }
    case courseConstants.DELETE_COURSE_SUCCESS: {
      const { courseId } = action.payload;
      const newById = { ...state.courses.byId };
      delete newById[courseId];
      return {
        ...state,
        courses: {
          ...state.courses,
          byId: newById,
          allIds: state.courses.allIds.filter((item) => item !== courseId),
        },
        loading: {
          ...state.loading,
          deleteCourse: true,
        },
        error: {
          ...state.error,
          deleteCourse: null,
        },
      };
    }
    case courseConstants.DELETE_COURSE_FAIL: {
      const { error } = action.payload;
      return {
        ...state,
        courses: {
          ...state.courses,
        },
        loading: {
          ...state.loading,
          deleteCourse: true,
        },
        error: {
          ...state.error,
          deleteCourse: error,
        },
      };
    }

    /* Classes */
    case courseConstants.FETCH_CLASSES_START:
      return {
        ...state,
        loading: { ...state.loading, fetchClasses: true },
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
        },

        loading: { ...state.loading, fetchClasses: false },
        error: {
          ...state.error,
          fetchClasses: null,
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

        loading: { ...state.loading, fetchClasses: false },
        error: {
          ...state.error,
          fetchClasses: error,
        },
      };
    }

    case courseConstants.ADD_CLASS_START: {
      return {
        ...state,
        loading: { ...state.loading, addClass: true },
      };
    }
    case courseConstants.ADD_CLASS_SUCCESS: {
      const { classId, data } = action.payload;
      return {
        ...state,
        classes: {
          ...state.classes,
          byId: { [classId]: data },
          allIds: state.course.allIds.concat([[classId]]),
        },
        loading: {
          ...state.loading,
          addClass: false,
        },
        error: {
          ...state.error,
          addClass: null,
        },
      };
    }
    case courseConstants.ADD_CLASS_FAIL: {
      const { error } = action.payload;
      return {
        ...state,

        loading: {
          ...state.loading,
          addClass: false,
        },
        error: {
          ...state.error,
          addClass: error,
        },
      };
    }

    case courseConstants.RENAME_CLASS_START: {
      return {
        ...state,
        loading: { ...state.loading, renameClass: true },
      };
    }
    case courseConstants.RENAME_CLASS_SUCCESS: {
      const { classId, newName } = action.payload;
      return {
        ...state,
        classes: {
          ...state.classes,
          byId: { [classId]: { ...state.courses.byId[classId] }, name: newName },
        },
        loading: { ...state.loading, renameClass: false },
        error: { ...state.error, renameClass: null },
      };
    }
    case courseConstants.RENAME_CLASS_FAIL: {
      const { error } = action.payload;
      return {
        ...state,
        loading: { ...state.loading, renameClass: false },
        error: { ...state.error, renameClass: error },
      };
    }

    case courseConstants.DELETE_CLASS_START: {
      return {
        ...state,
        loading: {
          ...state.loading,
          deleteClass: true,
        },
      };
    }
    case courseConstants.DELETE_CLASS_SUCCESS: {
      const { classId } = action.payload;
      const newById = { ...state.classes.byId };
      delete newById[classId];
      return {
        ...state,
        classes: {
          ...state.classes,
          byId: newById,
          allIds: state.classes.allIds.filter((item) => item !== classId),
        },
        loading: {
          ...state.loading,
          deleteClass: true,
        },
        error: {
          ...state.error,
          deleteClass: null,
        },
      };
    }
    case courseConstants.DELETE_CLASS_FAIL: {
      const { error } = action.payload;
      return {
        ...state,
        loading: {
          ...state.loading,
          deleteClass: true,
        },
        error: {
          ...state.error,
          deleteClass: error,
        },
      };
    }

    /* Members */
    case courseConstants.FETCH_MEMBERS_START: {
      return {
        ...state,
        loading: {
          ...state.loading,
          fetchMembers: true,
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
        },

        loading: {
          ...state.loading,
          fetchMembers: false,
        },
        error: {
          ...state.error,
          fetchMembers: null,
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
        loading: {
          ...state.loading,
          fetchMembers: false,
        },
        error: {
          ...state.error,
          fetchMembers: error,
        },
      };
    }

    // TODO: edit member list

    default: {
      return state;
    }
  }
}
