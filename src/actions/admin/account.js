import agent from '../agent';
import {
  accountConstants,
} from '../constant';

const getInstitutes = () => (dispatch) => {
  agent.get('/institute')
    .then((res) => {
      dispatch({
        type: accountConstants.FETCH_INSTITUTE_SUCCESS,
        payload: res.data.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: accountConstants.FETCH_INSTITUTE_FAIL,
        error: err,
      });
    });
};

const addInstitute = (name, emailDomain, isDisabled) => (dispatch) => {
  agent.post('/institute', { name, emailDomain, isDisabled })
    .then((res) => {
      dispatch({
        type: accountConstants.ADD_INSTITUTE_SUCCESS,
        payload: {
          id: res.data.data.id, name, emailDomain, isDisabled,
        },
      });
    })
    .catch((err) => {
      dispatch({
        type: accountConstants.ADD_INSTITUTE_FAIL,
        error: err,
      });
    });
};

const editInstitute = (id, name, emailDomain, isDisabled) => (dispatch) => {
  agent.post(`/institute/${id}`)
    .then((res) => {
      dispatch({
        type: accountConstants.EDIT_INSTITUTE_SUCCESS,
        payload: {
          id, name, emailDomain, isDisabled,
        },
      });
    })
    .catch((err) => {
      dispatch({
        type: accountConstants.EDIT_INSTITUTE_FAIL,
        error: err,
      });
    });
};
