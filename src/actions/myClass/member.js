import agent from '../agent';
import {
  memberConstants,
} from './constant';

const fetchClassMember = (token, classId) => (dispatch) => {
  const auth = {
    headers: {
      'Auth-Token': token,
    },
  };
  dispatch({ type: memberConstants.FETCH_CLASS_MEMBER_REQUEST });

  agent.get(`/class/${classId}/member`, auth)
    .then((res) => {
      dispatch({
        type: memberConstants.FETCH_CLASS_MEMBER_SUCCESS,
        payload: res.data.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: memberConstants.FETCH_CLASS_MEMBER_FAIL,
        error: err,
      });
    });
};

const editClassMember = (token, classId, editedList) => (dispatch) => {
  const auth = {
    headers: {
      'Auth-Token': token,
    },
  };
  dispatch({ type: memberConstants.EDIT_CLASS_MEMBER_REQUEST });

  agent.patch(`/class/${classId}/member`, editedList, auth)
    .then((res) => {
      dispatch({
        type: memberConstants.EDIT_CLASS_MEMBER_SUCCESS,
      });
    })
    .catch((err) => {
      dispatch({
        type: memberConstants.EDIT_CLASS_MEMBER_FAIL,
        error: err,
      });
    });
};

const deleteClassMember = (token, classId, memberId) => (dispatch) => {
  const auth = {
    headers: {
      'Auth-Token': token,
    },
  };
  dispatch({ type: memberConstants.DELETE_CLASS_MEMBER_REQUEST });

  agent.delete(`/class/${classId}/member/${memberId}`, auth)
    .then((res) => {
      dispatch({
        type: memberConstants.DELETE_CLASS_MEMBER_SUCCESS,
      });
    })
    .catch((err) => {
      dispatch({
        type: memberConstants.DELETE_CLASS_MEMBER_FAIL,
        error: err,
      });
    });
};

export {
  fetchClassMember, editClassMember, deleteClassMember,
};
