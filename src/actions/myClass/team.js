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
  const body = {
    name: teamName,
    label: newLabel,
  };
  agent
    .post(`/class/${classId}/team`, body, auth)
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
  const body = [{
    account_referral: student,
    role,
  }];
  console.log(body);
  agent
    .post(`/team/${teamId}/member`, body, auth)
    .then((res) => {
      console.log('add', res.data);
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
  const body = [{
    member_id: memberId,
    role,
  }];
  agent
    .patch(`/team/${teamId}/member`, body, auth)
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
      console.log('delete suc');
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
