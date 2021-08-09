import { courseConstants } from '../../../actions/constant';

const initialState = {
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
};

export default function course(state = initialState, action) {
  switch (action.type) {
    /* Courses */
    case courseConstants.FETCH_COURSES_SUCCESS: {
      return {
        ...state,
        fetchCourse: null,
      };
    }
    case courseConstants.FETCH_COURSES_FAIL: {
      const { error } = action.payload;
      return {
        ...state,
        fetchCourse: error,
      };
    }
    case courseConstants.ADD_COURSE_SUCCESS: {
      return {
        ...state,
        addCourse: null,
      };
    }
    case courseConstants.ADD_COURSE_FAIL: {
      const { error } = action.payload;
      return {
        ...state,
        addCourse: error,
      };
    }

    case courseConstants.RENAME_COURSE_SUCCESS: {
      return {
        ...state,
        renameCourse: null,
      };
    }
    case courseConstants.RENAME_COURSE_FAIL: {
      const { error } = action.payload;
      return {
        ...state,
        renameCourse: error,
      };
    }

    case courseConstants.DELETE_COURSE_SUCCESS: {
      return {
        ...state,
        deleteCourse: null,
      };
    }
    case courseConstants.DELETE_COURSE_FAIL: {
      const { error } = action.payload;
      return {
        ...state,
        deleteCourse: error,
      };
    }

    /* Classes */
    case courseConstants.FETCH_CLASSES_SUCCESS: {
      return {
        ...state,
        fetchClasses: null,
      };
    }
    case courseConstants.FETCH_CLASSES_FAIL: {
      const { error } = action.payload;
      return {
        ...state,
        fetchClasses: error,
      };
    }

    case courseConstants.ADD_CLASS_SUCCESS: {
      return {
        ...state,
        addClass: null,
      };
    }
    case courseConstants.ADD_CLASS_FAIL: {
      const { error } = action.payload;
      return {
        ...state,
        addClass: error,
      };
    }

    case courseConstants.RENAME_CLASS_SUCCESS: {
      return {
        ...state,
        renameClass: null,
      };
    }
    case courseConstants.RENAME_CLASS_FAIL: {
      const { error } = action.payload;
      return {
        ...state,
        renameClass: error,
      };
    }

    case courseConstants.DELETE_CLASS_SUCCESS: {
      return {
        ...state,
        deleteClass: null,
      };
    }
    case courseConstants.DELETE_CLASS_FAIL: {
      const { error } = action.payload;
      return {
        ...state,
        deleteClass: error,
      };
    }

    /* Members */
    case courseConstants.FETCH_MEMBERS_SUCCESS: {
      return {
        fetchMembers: null,
      };
    }

    case courseConstants.FETCH_MEMBERS_FAIL: {
      const { error } = action.payload;
      return {
        ...state,
        fetchMembers: error,
      };
    }

    // TODO: edit member list

    default: {
      return state;
    }
  }
}
