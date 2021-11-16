import agent from '../agent';
import { scoreboardConstants } from './constant';

export const addTeamProjectScoreboardUnderChallenge = (token, challengeId, body, onSuccess, onError) => async (dispatch) => {
  try {
    const config = { headers: { 'auth-token': token } };
    dispatch({ type: scoreboardConstants.ADD_TEAM_PROJECT_SCOREBOARD_UNDER_CHALLENGE_START });
    const res = await agent.post(`challenge/${challengeId}/team-project-scoreboard`, body, config);
    const { id } = res.data.data;
    dispatch({
      type: scoreboardConstants.ADD_TEAM_PROJECT_SCOREBOARD_UNDER_CHALLENGE_SUCCESS,
    });
    onSuccess(id);
  } catch (error) {
    dispatch({
      type: scoreboardConstants.ADD_TEAM_PROJECT_SCOREBOARD_UNDER_CHALLENGE_FAIL,
      error,
    });
    onError();
  }
};

export const readScoreboard = (token, scoreboardId) => async (dispatch) => {
  try {
    const config = { headers: { 'auth-token': token } };
    dispatch({ type: scoreboardConstants.READ_SCOREBOARD_START });
    const res = await agent.get(`scoreboard/${scoreboardId}`, config);

    dispatch({
      type: scoreboardConstants.READ_SCOREBOARD_SUCCESS,
      payload: { scoreboardId, data: { scoreboard: res.data.data } },
    });
  } catch (error) {
    dispatch({
      type: scoreboardConstants.READ_SCOREBOARD_FAIL,
      error,
    });
  }
};

export const editTeamProjectScoreboard = (token, scoreboardId, body) => async (dispatch) => {
  try {
    const config = {
      headers: {
        'auth-token': token,
      },
    };
    dispatch({ type: scoreboardConstants.EDIT_TEAM_PROJECT_SCOREBOARD_START });
    await agent.patch(`/team-project-scoreboard/${scoreboardId}`, body, config);
    dispatch({ type: scoreboardConstants.EDIT_TEAM_PROJECT_SCOREBOARD_SUCCESS });
  } catch (error) {
    dispatch({
      type: scoreboardConstants.EDIT_TEAM_PROJECT_SCOREBOARD_FAIL,
      error,
    });
  }
};

export const deleteScoreboard = (token, scoreboardId) => async (dispatch) => {
  try {
    const config = {
      headers: {
        'auth-token': token,
      },
    };
    dispatch({ type: scoreboardConstants.DELETE_SCOREBOARD_START });
    await agent.delete(`scoreboard/${scoreboardId}`, config);
    dispatch({ type: scoreboardConstants.DELETE_SCOREBOARD_SUCCESS });
  } catch (error) {
    dispatch({
      type: scoreboardConstants.DELETE_SCOREBOARD_FAIL,
      error,
    });
  }
};

export const viewTeamProjectScoreboard = (token, scoreboardId, onError) => async (dispatch) => {
  try {
    const config = { headers: { 'auth-token': token } };
    dispatch({ type: scoreboardConstants.VIEW_TEAM_PROJECT_SCOREBOARD_START });
    const res = await agent.get(`team-project-scoreboard/view/${scoreboardId}`, config);

    dispatch({
      type: scoreboardConstants.VIEW_TEAM_PROJECT_SCOREBOARD_SUCCESS,
      payload: { scoreboardId, data: res.data.data },
    });
  } catch (error) {
    dispatch({
      type: scoreboardConstants.VIEW_TEAM_PROJECT_SCOREBOARD_FAIL,
      error,
    });
    onError();
  }
};
