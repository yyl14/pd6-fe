import agent from '../agent';
import { courseConstants } from '../constant';

const fetchCourses = (token) => (dispatch) => {
  const fetch = { headers: { 'auth-token': token } };

  dispatch({
    type: courseConstants.FETCH_COURSES_START,
  });

  agent
    .get('/course', fetch)
    .then((res) => {
      const { data } = res.data;
      dispatch({
        type: courseConstants.FETCH_COURSES_SUCCESS,
        payload: { data },
      });
    })
    .catch((error) => {
      dispatch({ type: courseConstants.FETCH_COURSES_FAIL, payload: { error } });
    });
};

const addCourse = (token, name, type, isHidden) => (dispatch) => {
  const request = {
    headers: { 'auth-token': token },
    name,
    type,
    is_hidden: isHidden,
  };

  dispatch({ type: courseConstants.ADD_COURSE_START });

  agent
    .post('/course', request)
    .then((res) => {
      const { data } = res.data;
      const { id } = data;
      dispatch({
        type: courseConstants.ADD_COURSE_SUCCESS,
        payload: {
          courseId: id,
          data: {
            id,
            name,
            type,
            is_hidden: isHidden,
            is_deleted: false,
          },
        },
      });
    })
    .catch((error) => {
      dispatch({ type: courseConstants.ADD_COURSE_FAIL, payload: { error } });
    });
};

const renameCourse = (token, courseId, newName) => (dispatch) => {
  const request = { headers: { 'auth-token': token }, name: newName };
  dispatch({ type: courseConstants.RENAME_COURSE_START });

  agent.patch(`/course/${courseId}`, request).then(() => {
    dispatch({
      type: courseConstants.RENAME_COURSE_SUCCESS,
      payload: {
        courseId,
        newName,
      },
    });
  });
};

const deleteCourse = (token, courseId) => (dispatch) => {
  const request = { headers: { 'auth-token': token } };
  dispatch({
    type: courseConstants.DELETE_COURSE_START,
  });

  agent
    .delete(`/course/${courseId}`)
    .then(() => {
      dispatch({
        type: courseConstants.DELETE_COURSE_START,
        payload: {
          courseId,
        },
      });
    })
    .catch((error) => {
      dispatch({
        type: courseConstants.DELETE_COURSE_FAIL,
        payload: {
          error,
        },
      });
    });
};

const fetchClasses = (token, courseId) => (dispatch) => {
  const fetch = { headers: { 'auth-token': token } };

  dispatch({ type: courseConstants.FETCH_CLASSES_START });

  agent
    .get(`/course/${courseId}/class`)
    .then((data) => {
      dispatch({
        type: courseConstants.FETCH_CLASSES_SUCCESS,
        payload: { data },
      });
    })
    .catch((error) => {
      dispatch({ type: courseConstants.FETCH_CLASSES_FAIL, payload: { courseId, error } });
    });
};

const addClass = (token, courseId, name, isHidden) => (dispatch) => {
  const request = {
    headers: { 'auth-token': token },
    name,
    is_hidden: isHidden,
  };

  dispatch({ type: courseConstants.ADD_COURSE_START });

  agent
    .post('/course', request)
    .then((res) => {
      const { data } = res.data;
      const { id } = data;
      dispatch({
        type: courseConstants.ADD_COURSE_SUCCESS,
        payload: {
          courseId: id,
          data: {
            id,
            name,
            type,
            is_hidden: isHidden,
            is_deleted: false,
          },
        },
      });
    })
    .catch((error) => {
      dispatch({ type: courseConstants.ADD_COURSE_FAIL, payload: { error } });
    });
};

const renameCourse = (token, courseId, newName) => (dispatch) => {
  const request = { headers: { 'auth-token': token }, name: newName };
  dispatch({ type: courseConstants.RENAME_COURSE_START });

  agent.patch(`/course/${courseId}`, request).then(() => {
    dispatch({
      type: courseConstants.RENAME_COURSE_SUCCESS,
      payload: {
        courseId,
        newName,
      },
    });
  });
};

const deleteCourse = (token, courseId) => (dispatch) => {
  const request = { headers: { 'auth-token': token } };
  dispatch({
    type: courseConstants.DELETE_COURSE_START,
  });

  agent
    .delete(`/course/${courseId}`)
    .then(() => {
      dispatch({
        type: courseConstants.DELETE_COURSE_START,
        payload: {
          courseId,
        },
      });
    })
    .catch((error) => {
      dispatch({
        type: courseConstants.DELETE_COURSE_FAIL,
        payload: {
          error,
        },
      });
    });
};
