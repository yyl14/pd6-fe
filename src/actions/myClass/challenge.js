import agent from '../agent';
import {
  challengeConstants,
} from './constant';

const fetchChallenges = (token, classId) => (dispatch) => {
  const auth = {
    headers: {
      'Auth-Token': token,
    },
  };
  dispatch({ type: challengeConstants.FETCH_CHALLENGES_REQUEST });

  agent.get(`/class/${classId}/challenge`, auth)
    .then((res) => {
      dispatch({
        type: challengeConstants.FETCH_CHALLENGES_SUCCESS,
        payload: { classId, data: res.data.data },
      });
    })
    .catch((err) => {
      dispatch({
        type: challengeConstants.FETCH_CHALLENGES_FAIL,
        error: err,
      });
    });
};

const addChallenge = (token, classId, type, publicizeType, title, description, startTime, endTime) => (dispatch) => {
  const auth = {
    headers: {
      'Auth-Token': token,
    },
  };
  dispatch({ type: challengeConstants.ADD_CHALLENGE_REQUEST });

  agent.post(`/class/${classId}/challenge`, {
    type,
    publicize_type: publicizeType,
    title,
    description,
    start_time: startTime,
    end_time: endTime,
  }, auth)
    .then((res) => {
      dispatch({
        type: challengeConstants.ADD_CHALLENGE_SUCCESS,
      });
    })
    .catch((err) => {
      dispatch({
        type: challengeConstants.ADD_CHALLENGE_FAIL,
        error: err,
      });
    });
};

const editChallenge = (token, challengeId, body) => (dispatch) => {
  const auth = {
    headers: {
      'Auth-Token': token,
    },
  };
  dispatch({ type: challengeConstants.EDIT_CHALLENGE_REQUEST });

  agent.patch(`/challenge/${challengeId}`, body, auth)
    .then((res) => {
      console.log('edit challenge res:', res);
      dispatch({
        type: challengeConstants.EDIT_CHALLENGE_SUCCESS,
      });
    })
    .catch((err) => {
      dispatch({
        type: challengeConstants.EDIT_CHALLENGE_FAIL,
        error: err,
      });
    });
};

const deleteChallenge = (token, challengeId) => (dispatch) => {
  const auth = {
    headers: {
      'Auth-Token': token,
    },
  };
  dispatch({ type: challengeConstants.DELETE_CHALLENGE_REQUEST });

  agent.delete(`/challenge/${challengeId}`, auth)
    .then((res) => {
      console.log('delete challenge res:', res);
      dispatch({
        type: challengeConstants.DELETE_CHALLENGE_SUCCESS,
      });
    })
    .catch((err) => {
      dispatch({
        type: challengeConstants.DELETE_CHALLENGE_FAIL,
        error: err,
      });
    });
};

const addProblem = (token, challengeId, label, title) => async (dispatch) => {
  dispatch({ type: challengeConstants.ADD_PROBLEM_START });
  const auth = {
    headers: {
      'Auth-Token': token,
    },
  };
  const body = {
    challenge_label: label,
    title,
    full_score: 0,
    description: '',
    io_description: '',
    source: '',
    hint: '',
  };
  try {
    const res = await agent.post(`/challenge/${challengeId}/problem`, body, auth);
    if (res.data.success) {
      dispatch({
        type: challengeConstants.ADD_PROBLEM_SUCCESS,
      });
    } else {
      dispatch({
        type: challengeConstants.ADD_PROBLEM_FAIL,
        error: res.data.error,
      });
    }
  } catch (err) {
    dispatch({
      type: challengeConstants.ADD_PROBLEM_FAIL,
      error: err,
    });
  }
};

const addEssay = (token, challengeId, label, title) => async (dispatch) => {
  dispatch({ type: challengeConstants.ADD_ESSAY_START });
  const auth = {
    headers: {
      'Auth-Token': token,
    },
  };
  const body = {
    challenge_label: label,
    title,
    description: '',
  };
  try {
    const res = await agent.post(`/challenge/${challengeId}/essay`, body, auth);
    if (res.data.success) {
      dispatch({
        type: challengeConstants.ADD_ESSAY_SUCCESS,
      });
    } else {
      dispatch({
        type: challengeConstants.ADD_ESSAY_FAIL,
        error: res.data.error,
      });
    }
  } catch (err) {
    dispatch({
      type: challengeConstants.ADD_ESSAY_FAIL,
      error: err,
    });
  }
};

const addPeerReview = (token, challengeId, label, title) => async (dispatch) => {
  dispatch({ type: challengeConstants.ADD_PEER_REVIEW_START });
  const auth = {
    headers: {
      'Auth-Token': token,
    },
  };
  const body = {
    challenge_label: label,
    title,
    target_problem_id: 0,
    description: '',
    min_score: 0,
    max_score: 0,
    max_review_count: 0,
    start_time: '2000-01-01T00:00:00.000Z',
    end_time: '2000-01-01T00:00:00.000Z',
  };
  try {
    const res = await agent.post(`/challenge/${challengeId}/peer-review`, body, auth);
    if (res.data.success) {
      dispatch({
        type: challengeConstants.ADD_PEER_REVIEW_SUCCESS,
      });
    } else {
      dispatch({
        type: challengeConstants.ADD_PEER_REVIEW_FAIL,
        error: res.data.error,
      });
    }
  } catch (err) {
    dispatch({
      type: challengeConstants.ADD_PEER_REVIEW_FAIL,
      error: err,
    });
  }
};

export {
  fetchChallenges, addChallenge, editChallenge, deleteChallenge, addProblem, addEssay, addPeerReview,
};
