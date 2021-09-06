import agent from '../agent';
import { teamConstants } from './constant';

// WITH BROWSE PARAMS
export const fetchTeams = (token, classId) => (dispatch) => {
  const config = { headers: { 'auth-token': token } };
  dispatch({ type: teamConstants.FETCH_TEAMS_START });
  agent
    .get(`/class/${classId}/team`, config)
    .then((res) => {
      dispatch({
        type: teamConstants.FETCH_TEAMS_SUCCESS,
        payload: { classId, data: res.data.data.data },
      });
    })
    .catch((error) => {
      dispatch({
        type: teamConstants.FETCH_TEAMS_FAIL,
        error,
      });
    });
};

export const addTeam = (token, classId, teamName, newLabel) => (dispatch) => {
  const config = { headers: { 'auth-token': token } };
  dispatch({ type: teamConstants.ADD_TEAM_START });
  agent
    .post(
      `/class/${classId}/team`,
      {
        name: teamName,
        label: newLabel,
      },
      config,
    )
    .then(() => {
      dispatch({
        type: teamConstants.ADD_TEAM_SUCCESS,
      });
    })
    .catch((error) => {
      dispatch({
        type: teamConstants.ADD_TEAM_FAIL,
        error,
      });
    });
};

export const importTeam = (token, classId, file) => async (dispatch) => {
  const config = {
    headers: {
      'auth-token': token,
      'Content-Type': 'multipart/form-data',
    },
  };
  const formData = new FormData();
  formData.append('team_file', file);

  try {
    dispatch({ type: teamConstants.IMPORT_TEAM_START });
    await agent.post(`/class/${classId}/team-import`, formData, config);
    dispatch({
      type: teamConstants.IMPORT_TEAM_SUCCESS,
    });
  } catch (error) {
    dispatch({
      type: teamConstants.IMPORT_TEAM_FAIL,
      error,
    });
  }
};

// download team file template
export const downloadTeamFile = (token) => async (dispatch) => {
  try {
    const config1 = {
      headers: {
        'auth-token': token,
      },
    };
    dispatch({ type: teamConstants.DOWNLOAD_TEAM_FILE_START });
    const res = await agent.get('/team/template', config1);

    const config2 = {
      headers: {
        'auth-token': token,
      },
      params: {
        filename: res.data.data.filename,
        as_attachment: true,
      },
    };
    const res2 = await agent.get(`/s3-file/${res.data.data.s3_file_uuid}/url`, config2);

    fetch(res2.data.data.url).then((t) => t.blob().then((b) => {
      const a = document.createElement('a');
      a.href = URL.createObjectURL(b);
      a.setAttribute('download', res.data.data.filename);
      a.click();
    }));
    dispatch({
      type: teamConstants.DOWNLOAD_TEAM_FILE_SUCCESS,
    });
  } catch (error) {
    dispatch({
      type: teamConstants.DOWNLOAD_TEAM_FILE_FAIL,
      error,
    });
  }
};

export const editTeam = (token, teamId, teamName, classId, newLabel) => (dispatch) => {
  const config = { headers: { 'auth-token': token } };
  dispatch({ type: teamConstants.EDIT_TEAM_START });
  agent
    .patch(
      `/team/${teamId}`,
      {
        name: teamName,
        class_id: classId,
        label: newLabel,
      },
      config,
    )
    .then(() => {
      dispatch({
        type: teamConstants.EDIT_TEAM_SUCCESS,
      });
    })
    .catch((error) => {
      dispatch({
        type: teamConstants.EDIT_TEAM_FAIL,
        error,
      });
    });
};

// WITH BROWSE PARAMS
export const fetchTeamMember = (token, teamId) => async (dispatch) => {
  dispatch({ type: teamConstants.FETCH_TEAM_MEMBER_START });
  const config = {
    headers: {
      'auth-token': token,
    },
  };
  try {
    const res = await agent.get(`/team/${teamId}/member`, config);
    dispatch({
      type: teamConstants.FETCH_TEAM_MEMBER_SUCCESS,
      payload: { teamId, data: res.data.data.data },
    });
  } catch (error) {
    dispatch({
      type: teamConstants.FETCH_TEAM_MEMBER_FAIL,
      error,
    });
  }
};

export const addTeamMember = (token, teamId, student, role, isArray, array) => async (dispatch) => {
  const config = {
    headers: {
      'auth-token': token,
    },
  };
  const body = isArray
    ? array
    : [
      {
        account_referral: student,
        role,
      },
    ];
  // console.log('body', body);
  try {
    dispatch({ type: teamConstants.ADD_TEAM_MEMBER_START });
    await agent.post(`/team/${teamId}/member`, body, config);
    dispatch({ type: teamConstants.ADD_TEAM_MEMBER_SUCCESS });
  } catch (error) {
    dispatch({
      type: teamConstants.ADD_TEAM_MEMBER_FAIL,
      error,
    });
  }
};

export const editTeamMember = (token, teamId, memberId, role) => (dispatch) => {
  const config = { headers: { 'auth-token': token } };
  dispatch({ type: teamConstants.EDIT_TEAM_MEMBER_START });
  const body = [
    {
      member_id: memberId,
      role,
    },
  ];
  agent
    .patch(`/team/${teamId}/member`, body, config)
    .then(() => {
      dispatch({
        type: teamConstants.EDIT_TEAM_MEMBER_SUCCESS,
      });
    })
    .catch((error) => {
      dispatch({
        type: teamConstants.EDIT_TEAM_MEMBER_FAIL,
        error,
      });
    });
};

export const deleteTeamMember = (token, teamId, memberId) => (dispatch) => {
  const config = {
    headers: {
      'auth-token': token,
    },
  };
  try {
    dispatch({ type: teamConstants.DELETE_TEAM_MEMBER_START });
    agent.delete(`/team/${teamId}/member/${memberId}`, config);
    dispatch({ type: teamConstants.DELETE_TEAM_MEMBER_SUCCESS });
  } catch (error) {
    dispatch({
      type: teamConstants.DELETE_TEAM_MEMBER_FAIL,
      error,
    });
  }
};
