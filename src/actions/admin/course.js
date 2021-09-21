import agent from '../agent';
import { courseConstants } from './constant';

export const fetchCourses = (token) => (dispatch) => {
  const config = { headers: { 'auth-token': token } };

  dispatch({
    type: courseConstants.FETCH_COURSES_START,
  });

  agent
    .get('/course', config)
    .then((res) => {
      const { data } = res.data;
      dispatch({
        type: courseConstants.FETCH_COURSES_SUCCESS,
        payload: { data },
      });
    })
    .catch((error) => {
      dispatch({ type: courseConstants.FETCH_COURSES_FAIL, error });
    });
};

export const addCourse = (token, name, type, onSuccess, onError) => async (dispatch) => {
  try {
    const config = { headers: { 'auth-token': token } };
    const body = { name, type };
    dispatch({ type: courseConstants.ADD_COURSE_START });
    const res = await agent.post('/course', body, config);
    dispatch({ type: courseConstants.ADD_COURSE_SUCCESS });
    onSuccess(res.data.data.id);
  } catch (error) {
    dispatch({
      type: courseConstants.ADD_COURSE_FAIL,
      error,
    });
    onError();
  }

  // agent
  //   .post('/course', body, config)
  //   .then((res) => {
  //     const { data } = res.data;
  //     const { id } = data;
  //     dispatch({
  //       type: courseConstants.ADD_COURSE_SUCCESS,
  //       payload: {
  //         courseId: id,
  //         data: {
  //           id,
  //           name,
  //           type,
  //           is_hidden: false,
  //           is_deleted: false,
  //         },
  //       },
  //     });
  //     history.push(`/admin/course/course/${id}/class-list`);
  //   })
  //   .catch((error) => {
  //     dispatch({ type: courseConstants.ADD_COURSE_FAIL, error });
  //   });
};

export const renameCourse = (token, courseId, newName) => (dispatch) => {
  const config = { headers: { 'auth-token': token } };
  const body = { name: newName };
  dispatch({ type: courseConstants.RENAME_COURSE_START });

  agent
    .patch(`/course/${courseId}`, body, config)
    .then(() => {
      dispatch({
        type: courseConstants.RENAME_COURSE_SUCCESS,
        payload: {
          courseId,
          newName,
        },
      });
    })
    .catch((error) => {
      dispatch({
        type: courseConstants.RENAME_COURSE_FAIL,
        error,
      });
    });
};

export const deleteCourse = (token, courseId) => (dispatch) => {
  const config = { headers: { 'auth-token': token } };
  dispatch({
    type: courseConstants.DELETE_COURSE_START,
  });

  agent
    .delete(`/course/${courseId}`, config)
    .then(() => {
      dispatch({
        type: courseConstants.DELETE_COURSE_SUCCESS,
        payload: {
          courseId,
        },
      });
    })
    .catch((error) => {
      dispatch({
        type: courseConstants.DELETE_COURSE_FAIL,
        error,
      });
    });
};

export const fetchClasses = (token, courseId) => (dispatch) => {
  const config = { headers: { 'auth-token': token } };

  dispatch({ type: courseConstants.FETCH_CLASSES_START });

  agent
    .get(`/course/${courseId}/class`, config)
    .then((res) => {
      dispatch({
        type: courseConstants.FETCH_CLASSES_SUCCESS,
        payload: { courseId, data: res.data },
      });
    })
    .catch((error) => {
      dispatch({ type: courseConstants.FETCH_CLASSES_FAIL, error });
    });
};

export const addClass = (token, courseId, name, isHidden) => (dispatch) => {
  const config = {
    headers: { 'auth-token': token },
  };

  dispatch({ type: courseConstants.ADD_CLASS_START });

  agent
    .post(`/course/${courseId}/class`, { name }, config)
    .then((res) => {
      const { data } = res.data;
      const { id } = data;
      dispatch({
        type: courseConstants.ADD_CLASS_SUCCESS,
        payload: {
          courseId,
          data: {
            id,
            name,
            is_hidden: isHidden,
            is_deleted: false,
          },
        },
      });
    })
    .catch((error) => {
      dispatch({ type: courseConstants.ADD_CLASS_FAIL, error });
    });
};

export const renameClass = (token, classId, newName) => (dispatch) => {
  const config = { headers: { 'auth-token': token } };
  dispatch({ type: courseConstants.RENAME_CLASS_START });

  agent
    .patch(`/class/${classId}`, { name: newName }, config)
    .then(() => {
      dispatch({
        type: courseConstants.RENAME_CLASS_SUCCESS,
        payload: {
          classId,
          newName,
        },
      });
    })
    .catch((error) => {
      dispatch({
        type: courseConstants.RENAME_CLASS_FAIL,
        error,
      });
    });
};

export const deleteClass = (token, courseId, classId) => (dispatch) => {
  const config = { headers: { 'auth-token': token } };
  dispatch({
    type: courseConstants.DELETE_CLASS_START,
  });

  agent
    .delete(`/class/${classId}`, config)
    .then(() => {
      dispatch({
        type: courseConstants.DELETE_CLASS_SUCCESS,
        payload: {
          courseId,
          classId,
        },
      });
    })
    .catch((error) => {
      dispatch({
        type: courseConstants.DELETE_CLASS_FAIL,
        error,
      });
    });
};
