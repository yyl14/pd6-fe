import agent from '../agent';
import { teamConstants } from './constant';

export const fetchTeams = (token, classId) => (dispatch) => {
  const auth = { headers: { 'auth-token': token } };
  dispatch({ type: teamConstants.FETCH_TEAMS_START });
  agent
    .get(`/class/${classId}/team`, auth)
    .then((res) => {
      dispatch({
        type: teamConstants.FETCH_TEAMS_SUCCESS,
        payload: { classId, data: res.data.data },
      });
    })
    .catch((err) => {
      dispatch({
        type: teamConstants.FETCH_TEAMS_FAIL,
        error: err,
      });
    });
};

export const addTeam = (token, classId, teamName, newLabel) => (dispatch) => {
  const auth = { headers: { 'auth-token': token } };
  dispatch({ type: teamConstants.ADD_TEAM_START });
  agent
    .post(`/class/${classId}/team`, {
      name: teamName,
      label: newLabel,
    }, auth)
    .then((res) => {
      dispatch({
        type: teamConstants.ADD_TEAM_SUCCESS,
      });
    })
    .catch((err) => {
      dispatch({
        type: teamConstants.ADD_TEAM_FAIL,
        error: err,
      });
    });
};

export const editTeam = (token, teamId, teamName, classId, newLabel) => (dispatch) => {
  const auth = { headers: { 'auth-token': token } };
  dispatch({ type: teamConstants.EDIT_TEAM_START });
  agent
    .patch(`/team/${teamId}`, {
      name: teamName,
      class_id: classId,
      label: newLabel,
    }, auth)
    .then((res) => {
      dispatch({
        type: teamConstants.EDIT_TEAM_SUCCESS,
      });
    })
    .catch((err) => {
      dispatch({
        type: teamConstants.EDIT_TEAM_FAIL,
        error: err,
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
        payload: { teamId, data: res.data.data },
      });
    })
    .catch((err) => {
      dispatch({
        type: teamConstants.FETCH_TEAM_MEMBER_FAIL,
        error: err,
      });
    });
};

export const addTeamMember = (token, teamId, student, role) => (dispatch) => {
  const auth = { headers: { 'auth-token': token } };
  dispatch({ type: teamConstants.ADD_TEAM_MEMBER_START });
  agent
    .post(`/team/${teamId}/member`, {
      account_referral: student,
      role,
    }, auth)
    .then((res) => {
      dispatch({
        type: teamConstants.ADD_TEAM_MEMBER_SUCCESS,
      });
    })
    .catch((err) => {
      dispatch({
        type: teamConstants.ADD_TEAM_MEMBER_FAIL,
        error: err,
      });
    });
};

export const editTeamMember = (token, teamId, memberId, role) => (dispatch) => {
  const auth = { headers: { 'auth-token': token } };
  dispatch({ type: teamConstants.EDIT_TEAM_MEMBER_START });
  agent
    .patch(`/team/${teamId}/member`, {
      member_id: memberId,
      role,
    }, auth)
    .then((res) => {
      dispatch({
        type: teamConstants.EDIT_TEAM_MEMBER_SUCCESS,
      });
    })
    .catch((err) => {
      dispatch({
        type: teamConstants.EDIT_TEAM_MEMBER_FAIL,
        error: err,
      });
    });
};

export const deleteTeamMember = (token, teamId, memberId) => (dispatch) => {
  const auth = { headers: { 'auth-token': token } };
  dispatch({ type: teamConstants.DELETE_TEAM_MEMBER_START });
  agent
    .delete(`/team/${teamId}/member/${memberId}`, auth)
    .then((res) => {
      dispatch({
        type: teamConstants.DELETE_TEAM_MEMBER_SUCCESS,
      });
    })
    .catch((err) => {
      dispatch({
        type: teamConstants.DELETE_TEAM_MEMBER_FAIL,
        error: err,
      });
    });
};
