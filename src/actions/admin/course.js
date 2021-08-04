import agent from '../agent';
import { courseConstants } from '../constant';

export const fetchCourses = (token) => (dispatch) => {
  const auth = { headers: { 'auth-token': token } };

  dispatch({
    type: courseConstants.FETCH_COURSES_START,
  });

  agent
    .get('/course', auth)
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

export const addCourse = (token, name, type, isHidden) => (dispatch) => {
  const auth = {
    headers: { 'auth-token': token },
    // name,
    // type,
    // is_hidden: isHidden,
  };

  dispatch({ type: courseConstants.ADD_COURSE_START });

  agent
    .post('/course', auth)
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

export const renameCourse = (token, courseId, newName) => (dispatch) => {
  const auth = { headers: { 'auth-token': token } };
  const body = { name: newName };
  dispatch({ type: courseConstants.RENAME_COURSE_START });

  agent
    .patch(`/course/${courseId}`, body, auth)
    .then((res) => {
      console.log(res);

      dispatch({
        type: courseConstants.RENAME_COURSE_SUCCESS,
        payload: {
          courseId,
          newName,
        },
      });
    })
    .catch((error) => {
      console.log(error);
      dispatch({
        type: courseConstants.RENAME_COURSE_FAIL,
        payload: {
          error,
        },
      });
    });
};

export const deleteCourse = (token, courseId) => (dispatch) => {
  const auth = { headers: { 'auth-token': token } };
  dispatch({
    type: courseConstants.DELETE_COURSE_START,
  });

  agent
    .delete(`/course/${courseId}`, auth)
    .then((res) => {
      console.log(res);
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
        payload: {
          error,
        },
      });
    });
};

export const fetchClasses = (token, courseId) => (dispatch) => {
  const auth = { headers: { 'auth-token': token } };

  dispatch({ type: courseConstants.FETCH_CLASSES_START });

  agent
    .get(`/course/${courseId}/class`, auth)
    .then((res) => {
      console.log(res);
      dispatch({
        type: courseConstants.FETCH_CLASSES_SUCCESS,
        payload: { courseId, data: res.data },
      });
    })
    .catch((error) => {
      dispatch({ type: courseConstants.FETCH_CLASSES_FAIL, payload: { courseId, error } });
    });
};

export const addClass = (token, courseId, name, isHidden) => (dispatch) => {
  const auth = {
    headers: { 'auth-token': token },
  };
  console.log(name);
  dispatch({ type: courseConstants.ADD_CLASS_START });

  agent
    .post(`/course/${courseId}/class`, { name }, auth)
    .then((res) => {
      console.log(res);
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
      dispatch({ type: courseConstants.ADD_CLASS_FAIL, payload: { error } });
    });
};

export const renameClass = (token, classId, newName) => (dispatch) => {
  const auth = { headers: { 'auth-token': token } };
  const name = newName;
  dispatch({ type: courseConstants.RENAME_CLASS_START });

  agent
    .patch(`/class/${classId}`, { name }, auth)
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
        payload: {
          error,
        },
      });
    });
};

export const deleteClass = (token, classId) => (dispatch) => {
  const auth = { headers: { 'auth-token': token } };
  dispatch({
    type: courseConstants.DELETE_CLASS_START,
  });

  agent
    .delete(`/class/${classId}`, auth)
    .then(() => {
      dispatch({
        type: courseConstants.DELETE_CLASS_START,
        payload: {
          classId,
        },
      });
    })
    .catch((error) => {
      dispatch({
        type: courseConstants.DELETE_CLASS_FAIL,
        payload: {
          error,
        },
      });
    });
};

export const fetchMembers = (token, classId) => (dispatch) => {
  const auth = { headers: { 'auth-token': token } };
  dispatch({ type: courseConstants.FETCH_MEMBERS_START });

  agent
    .get(`/class/${classId}/member`, auth)
    .then((res) => {
      const { data } = res.data;
      dispatch({ type: courseConstants.FETCH_MEMBERS_SUCCESS, payload: { classId, data } });
    })
    .catch((error) => {
      dispatch({ type: courseConstants.FETCH_MEMBERS_FAIL, payload: { error } });
    });
};
