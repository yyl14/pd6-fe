import agent from '../agent';
import { commonConstants } from './constant';

const getInstitutes = () => (dispatch) => {
  dispatch({ type: commonConstants.GET_INSTITUTE_START });

  agent.get('/institute')
    .then((res) => {
      dispatch({
        type: commonConstants.GET_INSTITUTE_SUCCESS,
        payload: res.data.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: commonConstants.GET_INSTITUTE_FAIL,
        error: err,
      });
    });
};

const doSomething = () => (dispatch) => {};

export { getInstitutes, doSomething };
