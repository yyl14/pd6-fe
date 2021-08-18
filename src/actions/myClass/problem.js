import agent from '../agent';
import { problemConstants } from './constant';

const browseChallengeOverview = (token, challengeId) => (dispatch) => {
  const auth = {
    headers: {
      'Auth-Token': token,
    },
  };
  // TODO: read challenge, get problem, and then get grade
  dispatch({ type: problemConstants.READ_CHALLENGE_START });

  agent
    .get(`/challenge/${challengeId}`, auth)
    .then((res) => {
      dispatch({
        type: problemConstants.READ_CHALLENGE_SUCCESS,
        payload: res.data.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: problemConstants.READ_CHALLENGE_FAIL,
        error: err,
      });
    });
};

const editChallenge = (token, challengeId, body) => async (dispatch) => {
  try {
    const auth = {
      headers: {
        'Auth-Token': token,
      },
    };
    dispatch({ type: problemConstants.EDIT_CHALLENGE_START });
    const res = await agent.patch(`/challenge/${challengeId}`, {
      publicize_type: body.publicizeType,
      selection_type: body.selectionType,
      title: body.title,
      description: body.description,
      start_time: body.startTime,
      end_time: body.endTime,
    }, auth);
    dispatch({ type: problemConstants.EDIT_CHALLENGE_SUCCESS, payload: res.data.data });
  } catch (err) {
    dispatch({
      type: problemConstants.EDIT_CHALLENGE_FAIL,
      error: err,
    });
  }
};

const browseTasksUnderChallenge = (token, challengeId) => async (dispatch) => {
  try {
    const auth = {
      headers: {
        'Auth-Token': token,
      },
    };
    dispatch({ type: problemConstants.BROWSE_TASKS_UNDER_CHALLENGE_START });
    const res = await agent.get(`/challenge/${challengeId}/task`, auth);
    dispatch({ type: problemConstants.BROWSE_TASKS_UNDER_CHALLENGE_SUCCESS, payload: res.data.data });
  } catch (err) {
    dispatch({
      type: problemConstants.BROWSE_TASKS_UNDER_CHALLENGE_FAIL,
      error: err,
    });
  }
};

const readProblem = (token, problemId) => async (dispatch) => {
  dispatch({ type: problemConstants.READ_PROBLEM_START });
  try {
    const auth = {
      headers: {
        'Auth-Token': token,
      },
    };
    const problemInfo = await agent.get(`/problem/${problemId}`, auth);
    dispatch({
      type: problemConstants.READ_PROBLEM_SUCCESS,
      payload: problemInfo.data.data,
    });
  } catch (err) {
    dispatch({
      type: problemConstants.READ_PROBLEM_FAIL,
      errors: err,
    });
  }
};

export {
  browseChallengeOverview,
  editChallenge,
  browseTasksUnderChallenge,
  readProblem,
};
