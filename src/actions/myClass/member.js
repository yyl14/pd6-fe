import agent from '../agent';
import {
  memberConstants,
} from './constant';

const fetchClassMembers = (token, classId) => (dispatch) => {
  const auth = {
    headers: {
      'Auth-Token': token,
    },
  };
  dispatch({ type: memberConstants.FETCH_CLASS_MEMBERS_REQUEST });

  agent.get(`/class/${classId}/member`, auth)
    .then((res) => {
      dispatch({ type: memberConstants.FETCH_CLASS_MEMBERS_SUCCESS, payload: { classId, data: res.data.data } });
    })
    .catch((err) => {
      dispatch({
        type: memberConstants.FETCH_CLASS_MEMBERS_FAIL,
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
  fetchClassMembers, editClassMember, deleteClassMember,
};
