import agent from '../agent';
import {
  systemConstants,
} from '../constant';

const fetchAccessLog = (offset, limit, token) => (dispatch) => {
  const fetch = { headers: { 'auth-token': token } };
  dispatch({
    type: systemConstants.FETCH_ACCESS_LOG_START,
  });

  agent.get(`/access-log?offset=${offset}&limit=${limit}`, fetch)
    .then((res) => {
      const { data } = res.data;
      console.log('use api :', data);
      dispatch({
        type: systemConstants.FETCH_ACCESS_LOG_SUCCESS,
        payload: {
          ...data,
        },
      });
    })
    .catch((err) => {
      dispatch({
        type: systemConstants.FETCH_ACCESS_LOG_FAIL,
        payload: { err },
      });
    });
};

// used to prevent the annoying eslint error
const tempFunction = () => () => {

};

export {
  fetchAccessLog,
  tempFunction,
};
