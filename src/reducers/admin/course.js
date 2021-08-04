import { courseConstants } from '../../actions/constant';

const initialState = {
  courses: {
    byId: {},
    allIds: [],
  },

  classes: {
    byId: {},
    allIds: [],
  },

  members: {
    byId: {},
    allIds: [],
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

// const initialState = {
//   courses: {
//     byId: {
//       1: {
//         id: 1,
//         name: 'PBC',
//         type: 'LESSON',
//         is_deleted: false,
//         classIds: [],
//       },
//       2: {
//         id: 2,
//         name: 'PD',
//         type: 'LESSON',
//         is_deleted: false,
//         classIds: [],
//       },
//       3: {
//         id: 3,
//         name: 'DSAP',
//         type: 'LESSON',
//         is_deleted: false,
//         classIds: [],
//       },
//       4: {
//         id: 4,
//         name: 'PDAO',
//         type: 'CONTEST',
//         is_deleted: false,
//         classIds: [],
//       },
//     },
//     allIds: [1, 2, 3, 4],
//   },

//   classes: {
//     byId: {
//       12: {
//         id: 12,
//         name: '108-2',
//         course_id: 2345,
//         is_hidden: false,
//         is_deleted: false,
//         memberIds: [111, 222, 333],
//       },
//       14: {
//         id: 14,
//         name: '108-1',
//         course_id: 2345,
//         is_hidden: false,
//         is_deleted: false,
//         memberIds: [333, 78978],
//       },
//       16: {
//         id: 16,
//         name: '109-1',
//         course_id: 2345,
//         is_hidden: false,
//         is_deleted: false,
//         memberIds: [],
//       },
//       18: {
//         id: 18,
//         name: '109-2',
//         course_id: 2345,
//         is_hidden: false,
//         is_deleted: false,
//         memberIds: [],
//       },
//       20: {
//         id: 20,
//         name: '110-1',
//         course_id: 2345,
//         is_hidden: false,
//         is_deleted: false,
//         memberIds: [],
//       },
//       21: {
//         id: 21,
//         name: '110-1',
//         course_id: 6789,
//         is_hidden: false,
//         is_deleted: false,
//         memberIds: [],
//       },
//       45678: {
//         id: 45678,
//         name: '109-2',
//         course_id: 6789,
//         is_hidden: false,
//         is_deleted: false,
//         memberIds: [],
//       },
//     },
//     allIds: [12, 14, 16, 18, 20, 21, 45678],
//   },

//   members: {
//     byId: {
//       111: {
//         id: 111,
//         student_id: 'B087050801',
//         realName: '南部陽一郎',
//         username: 'shinymarshmello',
//         institute: 'NTUST',
//         role: 'Guest',
//       },
//       222: {
//         id: 222,
//         student_id: 'B087050802',
//         realName: '南部陽二郎',
//         username: 'shinymarshmello',
//         institute: 'NTU',
//         role: 'Guest',
//       },
//       333: {
//         id: 333,
//         student_id: 'B087050802',
//         realName: '南部陽二郎',
//         username: 'shinymarshmello',
//         institute: 'NTU',
//         role: 'Guest',
//       },
//       78978: {
//         id: 78978,
//         student_id: 'B087050803',
//         realName: '南部陽三郎',
//         username: 'shinymarshmello',
//         institute: 'NTNU',
//         role: 'Guest',
//       },
//     },
//     allIds: [111, 222, 78978],
//   },

//   loading: {
//     fetchCourse: false,
//     addCourse: false,
//     renameCourse: false,
//     deleteCourse: false,

//     fetchClasses: false,
//     addClass: false,
//     renameClass: false,
//     deleteClass: false,

//     fetchMembers: false,
//     editMembers: false,
//   },

//   error: {
//     fetchCourse: null,
//     addCourse: null,
//     editCourse: null,
//     deleteCourse: null,

//     fetchClasses: null,
//     addClass: null,
//     renameClass: null,
//     deleteClass: null,

//     fetchMembers: null,
//     editMembers: null,
//   },
// };

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
          byId: data.reduce(
            (acc, item) => ({
              ...acc,
              // classIds of existing courses are unchanged
              [item.id]: { ...item, classIds: state.courses.byId[item.id] ? state.courses.byId[item.id].classIds : [] },
            }),
            {},
          ),
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
        // courses: {
        //   byId: {},
        //   allIds: [],
        // },
        // loading: {
        //   ...state.loading,
        //   fetchCourse: false,
        // },
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
          byId: { ...state.courses.byId, [courseId]: data },
          allIds: state.courses.allIds.concat([courseId]),
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
          byId: { [courseId]: { ...state.courses.byId[courseId], name: newName } },
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

      return {
        ...state,
        courses: {
          ...state.courses,
          byId: state.courses.allIds
            .filter((item) => item !== courseId)
            .reduce((acc, item) => ({ ...acc, [item]: state.courses.byId[item] }), {}),
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
      const {
        courseId,
        data: { data },
      } = action.payload;

      return {
        ...state,

        // add class ids to course
        courses: {
          ...state.courses,
          byId: {
            ...state.courses.byId,
            [courseId]: { ...state.courses.byId[courseId], classIds: data.map((item) => item.id) },
          },
        },

        // add class data
        classes: {
          byId: data.reduce(
            (acc, item) => ({
              ...acc,
              [item.id]: {
                ...item,
                // memberIds of existing classes are unchanged
                memberIds: state.classes.byId[item.id] ? state.classes.byId[item.id].memberIds : [],
              },
            }),
            state.classes.byId,
          ),
          allIds: [...new Set([...data.map((item) => item.id), ...state.classes.allIds])],
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
      // console.log(error);
      if (state.courses.byId[courseId]) {
        return {
          ...state,

          loading: { ...state.loading, fetchClasses: false },
          error: {
            ...state.error,
            fetchClasses: error,
          },
        };
      }

      return {
        ...state,

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
      const { courseId, data } = action.payload;
      console.log('add class success', courseId, data);
      const { id, name, is_hidden: isHidden } = data;

      return {
        ...state,
        courses: {
          ...state.courses,
          byId: {
            ...state.courses.byId,
            [courseId]: {
              ...state.courses.byId[courseId],
              classIds: state.courses.byId[courseId].classIds.concat([id]),
            },
          },
        },
        classes: {
          ...state.classes,
          byId: {
            ...state.classes.byId,
            [id]: {
              id,
              courseId,
              name,
              isHidden,
              isDeleted: false,
              memberIds: [],
            },
          },
          allIds: state.classes.allIds.concat([id]),
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
      console.log('add class fail');

      const { error } = action.payload;
      console.log(error);
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

      return {
        ...state,
        classes: {
          ...state.classes,
          byId: state.classes.allIds
            .filter((item) => item !== classId)
            .reduce((acc, item) => ({ ...acc, [item]: state.classes.byId[item] })),
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
        classes: {
          ...state.classes,
          byId: {
            ...state.classes.byId,
            [classId]: {
              ...state.classes.byId[classId],
              memberIds: data.map((item) => item.id),
            },
          },
        },

        // add member data
        members: {
          byId: data.reduce((acc, item) => ({ ...acc, [item.id]: item }), state.members),
          allIds: [...new Set([...data.map((item) => item.id), ...state.members.allIds])],
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
