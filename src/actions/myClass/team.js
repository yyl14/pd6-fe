import agent from '../agent';
import { teamConstants } from './constant';

export const fetchClassTeam = (token, classId) => (dispatch) => {
  const auth = { headers: { 'auth-token': token } };
  dispatch({ type: teamConstants.FETCH_CLASS_TEAM_START });
  agent
    .get(`/class/${classId}/team`, auth)
    .then((res) => {
      dispatch({
        type: teamConstants.FETCH_CLASS_TEAM_SUCCESS,
        payload: res.data.data,
      });
    })
    .catch((error) => {
      dispatch({
        type: teamConstants.FETCH_CLASS_TEAM_FAIL,
        error: error,
      });
    });
};

export const addClassTeam = (token, classId, teamName, newLabel) => (dispatch) => {
  const auth = { headers: { 'auth-token': token } };
  dispatch({ type: teamConstants.ADD_CLASS_TEAM_START });
  const body = {
    name: teamName,
    label: newLabel,
  };
  agent
    .post(`/class/${classId}/team`, body, auth)
    .then(() => {
      dispatch({
        type: teamConstants.ADD_CLASS_TEAM_SUCCESS,
      });
    })
    .catch((error) => {
      dispatch({
        type: teamConstants.ADD_CLASS_TEAM_FAIL,
        error: error,
      });
    });
};

export const fetchTeam = (token, teamId) => (dispatch) => {
  const auth = { headers: { 'auth-token': token } };
  dispatch({ type: teamConstants.FETCH_TEAM_START });
  agent
    .get(`/team/${teamId}`, auth)
    .then((res) => {
      console.log(res);
      dispatch({
        type: teamConstants.FETCH_TEAM_SUCCESS,
        payload: res.data.data,
      });
    })
    .catch((error) => {
      dispatch({
        type: teamConstants.FETCH_TEAM_FAIL,
        error: error,
      });
    });
};

export const editTeam = (token, teamId, teamName, classId, newLabel) => (dispatch) => {
  const auth = { headers: { 'auth-token': token } };
  dispatch({ type: teamConstants.EDIT_TEAM_START });
  const body = {
    name: teamName,
    class_id: classId,
    label: newLabel,
  };
  agent
    .patch(`/team/${teamId}`, body, auth)
    .then((res) => {
      dispatch({
        type: teamConstants.EDIT_TEAM_SUCCESS,
      });
    })
    .catch((error) => {
      dispatch({
        type: teamConstants.EDIT_TEAM_FAIL,
        error: error,
      });
    });
};

export const fetchTeamMember = (token, teamId) => (dispatch) => {
  const auth = { headers: { 'auth-token': token } };
  dispatch({ type: teamConstants.FETCH_TEAM_MEMBER_START });
  agent
    .get(`/team/${teamId}/member`, auth)
    .then((res) => {
      dispatch({
        type: teamConstants.FETCH_TEAM_MEMBER_SUCCESS,
        payload: res.data.data,
      });
    })
    .catch((error) => {
      dispatch({
        type: teamConstants.FETCH_TEAM_MEMBER_FAIL,
        error: error,
      });
    });
};

export const editTeamMember = (token, teamId, memberId, role) => (dispatch) => {
  const auth = { headers: { 'auth-token': token } };
  dispatch({ type: teamConstants.EDIT_TEAM_MEMBER_START });
  const body = {
    member_id: memberId,
    role,
  };
  agent
    .patch(`/team/${teamId}/member`, body, auth)
    .then(() => {
      dispatch({
        type: teamConstants.EDIT_TEAM_MEMBER_SUCCESS,
      });
    })
    .catch((error) => {
      dispatch({
        type: teamConstants.EDIT_TEAM_MEMBER_FAIL,
        error: error,
      });
    });
};

export const deleteTeamMember = (token, teamId, memberId) => (dispatch) => {
  const auth = { headers: { 'auth-token': token } };
  dispatch({ type: teamConstants.DELETE_TEAM_MEMBER_START });
  agent
    .delete(`/team/${teamId}/member/${memberId}`, auth)
    .then(() => {
      dispatch({
        type: teamConstants.DELETE_TEAM_MEMBER_SUCCESS,
      });
    })
    .catch((error) => {
      dispatch({
        type: teamConstants.DELETE_TEAM_MEMBER_FAIL,
        error: error,
      });
    });
};
