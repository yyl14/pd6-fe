import agent from '../agent';
import { commonConstants } from './constant';

const getInstitutes = () => (dispatch) => {
  dispatch({ type: commonConstants.GET_INSTITUTE_START });

  agent
    .get('/institute')
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

const fetchClassMembers = (token, classId) => (dispatch) => {
  const auth = {
    headers: {
      'Auth-Token': token,
    },
  };
  dispatch({ type: commonConstants.FETCH_CLASS_MEMBERS_REQUEST });

  agent
    .get(`/class/${classId}/member`, auth)
    .then((res) => {
      // console.log(res);
      dispatch({ type: commonConstants.FETCH_CLASS_MEMBERS_SUCCESS, payload: { classId, data: res.data.data } });
    })
    .catch((err) => {
      dispatch({
        type: commonConstants.FETCH_CLASS_MEMBERS_FAIL,
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
  dispatch({ type: commonConstants.EDIT_CLASS_MEMBER_REQUEST });

  agent
    .patch(`/class/${classId}/member`, editedList, auth)
    .then((res) => {
      dispatch({
        type: commonConstants.EDIT_CLASS_MEMBER_SUCCESS,
      });
    })
    .catch((err) => {
      dispatch({
        type: commonConstants.EDIT_CLASS_MEMBER_FAIL,
        error: err,
      });
    });
};

// const deleteClassMember = (token, classId, memberId) => (dispatch) => {
//   const auth = {
//     headers: {
//       'Auth-Token': token,
//     },
//   };
//   dispatch({ type: commonConstants.DELETE_CLASS_MEMBER_REQUEST });

//   agent
//     .delete(`/class/${classId}/member/${memberId}`, auth)
//     .then((res) => {
//       dispatch({
//         type: commonConstants.DELETE_CLASS_MEMBER_SUCCESS,
//       });
//     })
//     .catch((err) => {
//       dispatch({
//         type: commonConstants.DELETE_CLASS_MEMBER_FAIL,
//         error: err,
//       });
//     });
// };

export { getInstitutes, fetchClassMembers, editClassMember };
