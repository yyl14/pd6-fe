import agent from './agent';
import { publicConstants } from './constant';

const getInstitutes = () => (dispatch) => {
  dispatch({ type: publicConstants.FETCH_INSTITUTE_START });
  agent.get('/institute')
    .then((res) => {
      dispatch({
        type: publicConstants.FETCH_INSTITUTE_SUCCESS,
        payload: res.data.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: publicConstants.FETCH_INSTITUTE_FAIL,
        error: err,
      });
    });
};

export default getInstitutes;
