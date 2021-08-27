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

export const importTeam = (token, classId, file) => async (dispatch) => {
  dispatch({ type: teamConstants.IMPORT_TEAM_START });
  const auth = {
    headers: {
      'Auth-Token': token,
      'Content-Type': 'multipart/form-data',
    },
  };
  const formData = new FormData();
  formData.append('team_file', file);

  try {
    const res = await agent.post(`/class/${classId}/team-import`, formData, auth);
    if (res.data.success) {
      dispatch({
        type: teamConstants.IMPORT_TEAM_SUCCESS,
      });
    } else {
      dispatch({
        type: teamConstants.IMPORT_TEAM_FAIL,
        error: res.data.error,
      });
    }
  } catch (err) {
    dispatch({
      type: teamConstants.IMPORT_TEAM_FAIL,
      error: err,
    });
  }
};

export const downloadTeamFile = (token) => async (dispatch) => {
  try {
    const auth = {
      headers: {
        'Auth-Token': token,
      },
    };
    dispatch({ type: teamConstants.DOWNLOAD_TEAM_FILE_START });
    const res = await agent.get('/team/template', auth);
    if (res.data.success) {
      const config = {
        headers: {
          'Auth-Token': token,
        },
        params: {
          filename: res.data.data.filename,
          as_attachment: true,
        },
      };
      try {
        const res2 = await agent.get(`/s3-file/${res.data.data.s3_file_uuid}/url`, config);
        if (res2.data.success) {
          fetch(res2.data.data.url).then((t) => t.blob().then((b) => {
            const a = document.createElement('a');
            a.href = URL.createObjectURL(b);
            a.setAttribute('download', res.data.data.filename);
            a.click();
          }));
          dispatch({
            type: teamConstants.DOWNLOAD_TEAM_FILE_SUCCESS,
          });
        } else {
          dispatch({
            type: teamConstants.DOWNLOAD_TEAM_FILE_FAIL,
            error: res2.data.error,
          });
        }
      } catch (err) {
        dispatch({
          type: teamConstants.DOWNLOAD_TEAM_FILE_FAIL,
          error: err,
        });
      }
    }

    dispatch({
      type: teamConstants.DOWNLOAD_TEAM_FILE_FAIL,
      error: res.data.error,
    });
  } catch (err) {
    dispatch({
      type: teamConstants.DOWNLOAD_TEAM_FILE_FAIL,
      error: err,
    });
  }
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

export const fetchTeamMember = (token, teamId) => async (dispatch) => {
  dispatch({ type: teamConstants.FETCH_TEAM_MEMBER_START });
  const auth = {
    headers: {
      'Auth-Token': token,
    },
  };
  try {
    const res = await agent.get(`/team/${teamId}/member`, auth);
    // console.log('fetch');
    dispatch({
      type: teamConstants.FETCH_TEAM_MEMBER_SUCCESS,
      payload: { teamId, data: res.data.data },
    });
  } catch (err) {
    dispatch({
      type: teamConstants.FETCH_TEAM_MEMBER_FAIL,
      error: err,
    });
  }
};

export const addTeamMember = (token, teamId, student, role, isArray, array) => async (dispatch) => {
  dispatch({ type: teamConstants.ADD_TEAM_MEMBER_START });
  const auth = {
    headers: {
      'Auth-Token': token,
    },
  };
  const body = isArray ? array : [{
    account_referral: student,
    role,
  }];
  // console.log('body', body);
  try {
    const res = await agent.post(`/team/${teamId}/member`, body, auth);
    // console.log('add', res);
    dispatch({ type: teamConstants.ADD_TEAM_MEMBER_SUCCESS });
  } catch (err) {
    dispatch({
      type: teamConstants.ADD_TEAM_MEMBER_FAIL,
      error: err,
    });
  }
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
      // console.log(body, res.data);
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
  dispatch({ type: teamConstants.DELETE_TEAM_MEMBER_START });
  const auth = {
    headers: {
      'Auth-Token': token,
    },
  };
  try {
    const res = agent.delete(`/team/${teamId}/member/${memberId}`, auth);
    // console.log('delete', res);
    dispatch({ type: teamConstants.DELETE_TEAM_MEMBER_SUCCESS });
  } catch (err) {
    dispatch({
      type: teamConstants.DELETE_TEAM_MEMBER_FAIL,
      error: err,
    });
  }
};
