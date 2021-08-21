import agent from '../agent';
import {
  submissionConstants,
} from './constant';

const fetchAllSubmissions = (token, accountId, problemId, languageId) => (dispatch) => {
  const auth = {
    headers: {
      'Auth-Token': token,
    },
  };
  dispatch({ type: submissionConstants.FETCH_ALL_SUBMISSIONS_START });

  agent.get(`/submission?account_id=${accountId}&problem_id=${problemId}&language_id=${languageId}`, auth)
    .then((res) => {
      dispatch({
        type: submissionConstants.FETCH_ALL_SUBMISSIONS_SUCCESS,
        payload: {
          accountId, problemId, languageId, data: res.data.data,
        },
      });
    })
    .catch((err) => {
      dispatch({
        type: submissionConstants.FETCH_ALL_SUBMISSIONS_FAIL,
        error: err,
      });
    });
};

const fetchSubmission = (token, submissionId) => (dispatch) => {
  const auth = {
    headers: {
      'Auth-Token': token,
    },
  };
  dispatch({ type: submissionConstants.FETCH_SUBMISSION_START });

  agent.get(`/submission/${submissionId}`, auth)
    .then((res) => {
      dispatch({
        type: submissionConstants.FETCH_SUBMISSION_SUCCESS,
        payload: { submissionId, data: [res.data.data] },
      });
    })
    .catch((err) => {
      dispatch({
        type: submissionConstants.FETCH_SUBMISSION_FAIL,
        error: err,
      });
    });
};

const addSubmission = (token, problemId, languageId, body) => (dispatch) => {
  const auth = {
    headers: {
      'Auth-Token': token,
    },
  };
  dispatch({ type: submissionConstants.ADD_SUBMISSION_START });

  agent.post(`/problem/${problemId}/submission?language_id=${languageId}`, body, auth)
    .then((res) => {
      dispatch({
        type: submissionConstants.ADD_SUBMISSION_SUCCESS,
        payload: { submissionId: res.data.data.id },
      });
    })
    .catch((err) => {
      dispatch({
        type: submissionConstants.ADD_SUBMISSION_FAIL,
        error: err,
      });
    });
};

const fetchJudgement = (token, submissionId) => (dispatch) => {
  const auth = {
    headers: {
      'Auth-Token': token,
    },
  };
  dispatch({ type: submissionConstants.FETCH_JUDGEMENT_START });

  agent.get(`/submission/${submissionId}/judgment`, auth)
    .then((res) => {
      dispatch({
        type: submissionConstants.FETCH_JUDGEMENT_SUCCESS,
        payload: { submissionId, data: res.data.data },
      });
    })
    .catch((err) => {
      dispatch({
        type: submissionConstants.FETCH_JUDGEMENT_FAIL,
        error: err,
      });
    });
};

export {
  fetchAllSubmissions, fetchSubmission, addSubmission, fetchJudgement,
};
