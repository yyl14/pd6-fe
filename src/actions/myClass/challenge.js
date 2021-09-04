import agent from '../agent';
import { challengeConstants } from './constant';
import { autoTableConstants } from '../component/constant';
import browseParamsTransForm from '../../function/browseParamsTransform';

const fetchChallenges = (token, classId, browseParams, tableId = null) => async (dispatch) => {
  try {
    dispatch({ type: challengeConstants.FETCH_CHALLENGES_REQUEST });

    const config = {
      headers: { 'auth-token': token },
      params: browseParamsTransForm(browseParams),
    };
    const res = await agent.get(`/class/${classId}/challenge`, config);
    console.log('challenges res:', res);
    const { data: challenges, total_count } = res.data.data;
    dispatch({
      type: challengeConstants.FETCH_CHALLENGES_SUCCESS,
      payload: { classId, data: challenges },
    });

    dispatch({
      type: autoTableConstants.AUTO_TABLE_UPDATE,
      payload: {
        tableId,
        totalCount: total_count,
        dataIds: challenges.map((item) => item.id),
        offset: browseParams.offset,
      },
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

const editChallenge = (token, challengeId, body) => async (dispatch) => {
  try {
    const config = {
      headers: {
        'Auth-Token': token,
      },
    };
    dispatch({ type: challengeConstants.EDIT_CHALLENGE_REQUEST });
    await agent.patch(`/challenge/${challengeId}`, body, config);
    dispatch({ type: challengeConstants.EDIT_CHALLENGE_SUCCESS });
  } catch (error) {
    dispatch({
      type: challengeConstants.EDIT_CHALLENGE_FAIL,
      error,
    });
  }
};

const deleteChallenge = (token, challengeId) => async (dispatch) => {
  try {
    const config = {
      headers: {
        'Auth-Token': token,
      },
    };
    dispatch({ type: challengeConstants.DELETE_CHALLENGE_REQUEST });
    await agent.delete(`/challenge/${challengeId}`, config);
    dispatch({ type: challengeConstants.DELETE_CHALLENGE_SUCCESS });
  } catch (error) {
    dispatch({
      type: challengeConstants.DELETE_CHALLENGE_FAIL,
      error,
    });
  }
};

const fetchChallengeSummary = (token, challengeId) => async (dispatch) => {
  try {
    const config = {
      headers: {
        'Auth-Token': token,
      },
    };
    dispatch({ type: challengeConstants.FETCH_CHALLENGE_SUMMARY_REQUEST });
    const res = await agent.get(`/challenge/${challengeId}/statistics/summary`, config);
    dispatch({
      type: challengeConstants.FETCH_CHALLENGE_SUMMARY_SUCCESS,
      payload: { challengeId, data: res.data.data.tasks },
    });
  } catch (error) {
    dispatch({
      type: challengeConstants.FETCH_CHALLENGE_SUMMARY_FAIL,
      error,
    });
  }
};

const fetchChallengeMemberSubmission = (token, challengeId) => async (dispatch) => {
  try {
    const config = {
      headers: {
        'Auth-Token': token,
      },
    };

    dispatch({ type: challengeConstants.FETCH_CHALLENGE_MEMBER_SUBMISSION_REQUEST });
    const res = await agent.get(`/challenge/${challengeId}/statistics/member-submission`, config);
    dispatch({
      type: challengeConstants.FETCH_CHALLENGE_MEMBER_SUBMISSION_SUCCESS,
      payload: { challengeId, data: res.data.data.data.member },
    });
  } catch (error) {
    dispatch({
      type: challengeConstants.FETCH_CHALLENGE_MEMBER_SUBMISSION_FAIL,
      error,
    });
  }
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
    await agent.post(`/challenge/${challengeId}/essay`, body, auth);
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
