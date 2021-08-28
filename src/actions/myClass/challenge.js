import agent from '../agent';
import { challengeConstants } from './constant';

const fetchChallenges = (token, classId) => async (dispatch) => {
  try {
    const config = {
      headers: {
        'Auth-Token': token,
      },
    };
    dispatch({ type: challengeConstants.FETCH_CHALLENGES_REQUEST });

    const res = await agent.get(`/class/${classId}/challenge`, config);

    dispatch({
      type: challengeConstants.FETCH_CHALLENGES_SUCCESS,
      payload: { classId, data: res.data.data.data },
    });
  } catch (error) {
    dispatch({
      type: challengeConstants.FETCH_CHALLENGES_FAIL,
      error,
    });
  }
};

const addChallenge = (token, classId, body) => async (dispatch) => {
  try {
    const config = {
      headers: {
        'Auth-Token': token,
      },
    };
    dispatch({ type: challengeConstants.ADD_CHALLENGE_REQUEST });
    await agent.post(
      `/class/${classId}/challenge`,
      {
        publicize_type: body.showTime,
        selection_type: body.scoredBy,
        title: body.title,
        description: '',
        start_time: body.startTime,
        end_time: body.endTime,
      },
      config,
    );
    dispatch({ type: challengeConstants.ADD_CHALLENGE_SUCCESS });
  } catch (error) {
    dispatch({
      type: challengeConstants.ADD_CHALLENGE_FAIL,
      error,
    });
  }
};

const editChallenge = (token, challengeId, body) => (dispatch) => {
  const config = {
    headers: {
      'Auth-Token': token,
    },
  };
  dispatch({ type: challengeConstants.EDIT_CHALLENGE_REQUEST });

  agent
    .patch(`/challenge/${challengeId}`, body, config)
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

  agent
    .delete(`/challenge/${challengeId}`, auth)
    .then((res) => {
      // console.log('delete challenge res:', res);
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

const fetchChallengeSummary = (token, challengeId) => (dispatch) => {
  const auth = {
    headers: {
      'Auth-Token': token,
    },
  };

  dispatch({ type: challengeConstants.FETCH_CHALLENGE_SUMMARY_REQUEST });

  agent
    .get(`/challenge/${challengeId}/statistics/summary`, auth)
    .then((res) => {
      dispatch({
        type: challengeConstants.FETCH_CHALLENGE_SUMMARY_SUCCESS,
        payload: { challengeId, data: res.data.data.tasks },
      });
    })
    .catch((err) => {
      dispatch({
        type: challengeConstants.FETCH_CHALLENGE_SUMMARY_FAIL,
        error: err,
      });
    });
};

const fetchChallengeMemberSubmission = (token, challengeId) => (dispatch) => {
  const auth = {
    headers: {
      'Auth-Token': token,
    },
  };

  dispatch({ type: challengeConstants.FETCH_CHALLENGE_MEMBER_SUBMISSION_REQUEST });

  agent
    .get(`/challenge/${challengeId}/statistics/member-submission`, auth)
    .then((res) => {
      dispatch({
        type: challengeConstants.FETCH_CHALLENGE_MEMBER_SUBMISSION_SUCCESS,
        payload: { challengeId, data: res.data.data.data.member },
      });
    })
    .catch((err) => {
      dispatch({
        type: challengeConstants.FETCH_CHALLENGE_MEMBER_SUBMISSION_FAIL,
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
    await agent.post(`/challenge/${challengeId}/problem`, body, auth);
    dispatch({
      type: challengeConstants.ADD_PROBLEM_SUCCESS,
    });
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

    dispatch({
      type: challengeConstants.ADD_ESSAY_SUCCESS,
    });
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
    await agent.post(`/challenge/${challengeId}/peer-review`, body, auth);
    dispatch({
      type: challengeConstants.ADD_PEER_REVIEW_SUCCESS,
    });
  } catch (err) {
    dispatch({
      type: challengeConstants.ADD_PEER_REVIEW_FAIL,
      error: err,
    });
  }
};

export {
  fetchChallenges,
  addChallenge,
  editChallenge,
  deleteChallenge,
  fetchChallengeSummary,
  fetchChallengeMemberSubmission,
  addProblem,
  addEssay,
  addPeerReview,
};
