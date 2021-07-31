import agent from '../agent';

const fetchAccessLog = (offset, limit, token) => (dispatch) => {
  const fetch = { headers: { 'auth-token': token } };
  dispatch({
    type: 'FETCH_ACCESS_LOG_START',
  });

  agent.get(`/access-log?offset=${offset}&limit=${limit}`, fetch)
    .then((res) => {
      const { data } = res.data;
      console.log('use api :', data);
      dispatch({
        type: 'FETCH_ACCESS_LOG_SUCCESS',
        payload: {
          ...data,
        },
      });
    })
    .catch((err) => {
      dispatch({
        type: 'FETCH_ACCESS_LOG_FAIL',
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
