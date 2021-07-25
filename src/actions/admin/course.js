import agent from '../agent';
import { courseConstants } from '../constant';

const fetchCourses = (token) => (dispatch) => {
  const fetch = { headers: { 'auth-token': token } };

  dispatch({
    type: courseConstants.FETCH_COURSES_START,
  });

  agent
    .get('/course', fetch)
    .then((data) => {
      dispatch({
        type: courseConstants.FETCH_COURSES_SUCCESS,
        payload: { data },
      });
    })
    .catch((error) => {
      dispatch({ type: courseConstants.FETCH_COURSES_FAIL, payload: { error } });
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
