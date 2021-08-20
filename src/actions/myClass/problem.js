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

const readProblemInfo = (token, problemId, challengeId) => async (dispatch) => {
  dispatch({ type: problemConstants.READ_PROBLEM_START });
  dispatch({ type: problemConstants.READ_CHALLENGE_START });
  const auth = {
    headers: {
      'Auth-Token': token,
    },
  };
  try {
    const problemInfo = await agent.get(`/problem/${problemId}`, auth);
    if (problemInfo.data.success) {
      dispatch({
        type: problemConstants.READ_PROBLEM_SUCCESS,
        payload: problemInfo.data.data,
      });
    } else {
      dispatch({
        type: problemConstants.READ_PROBLEM_FAIL,
        errors: problemInfo.data.error,
      });
    }
  } catch (err) {
    dispatch({
      type: problemConstants.READ_PROBLEM_FAIL,
      errors: err,
    });
  }

  try {
    const challenge = await agent.get(`/challenge/${challengeId}`, auth);
    if (challenge.data.success) {
      dispatch({
        type: problemConstants.READ_CHALLENGE_SUCCESS,
        payload: challenge.data.data,
      });
    } else {
      dispatch({
        type: problemConstants.READ_CHALLENGE_FAIL,
        errors: challenge.data.error,
      });
    }
  } catch (err) {
    dispatch({
      type: problemConstants.READ_CHALLENGE_FAIL,
      errors: err,
    });
  }
};

const readSubmission = (token, accountId, problemId) => async (dispatch) => {
  dispatch({ type: problemConstants.READ_SUBMISSION_START });
  const auth = {
    headers: {
      'Auth-Token': token,
    },
  };
  try {
    const subInfo = await agent.get(`/submission?account_id=${accountId}&problem_id=${parseInt(problemId, 10)}`, auth);
    if (subInfo.data.success) {
      dispatch({
        type: problemConstants.READ_SUBMISSION_SUCCESS,
        payload: subInfo.data.data,
      });
    } else {
      dispatch({
        type: problemConstants.READ_SUBMISSION_FAIL,
        errors: subInfo.data.error,
      });
    }
  } catch (err) {
    console.log(err);
    dispatch({
      type: problemConstants.READ_SUBMISSION_FAIL,
      errors: err,
    });
  }
};

const readSubmissionDetail = (token, submissionId, problemId, challengeId) => async (dispatch) => {
  // dispatch({ type: problemConstants.READ_SUBMISSION_START });
  dispatch({ type: problemConstants.READ_SUBMISSION_JUDGE_START });
  dispatch({ type: problemConstants.READ_CHALLENGE_START });
  dispatch({ type: problemConstants.READ_PROBLEM_START });
  const auth = {
    headers: {
      'Auth-Token': token,
    },
  };
  // try {
  //   const subInfo = await agent.get(`/submission?account_id=${accountId}&problem_id=${parseInt(problemId, 10)}`, auth);
  //   if (subInfo.data.success) {
  //     dispatch({
  //       type: problemConstants.READ_SUBMISSION_SUCCESS,
  //       payload: subInfo.data.data,
  //     });
  //   } else {
  //     dispatch({
  //       type: problemConstants.READ_SUBMISSION_FAIL,
  //       errors: subInfo.data.error,
  //     });
  //   }
  // } catch (err) {
  //   dispatch({
  //     type: problemConstants.READ_SUBMISSION_FAIL,
  //     errors: err,
  //   });
  // }

  try {
    const judgment = await agent.get(`/submission/${submissionId}/judgment`, auth);
    if (judgment.data.success) {
      dispatch({
        type: problemConstants.READ_SUBMISSION_JUDGE_SUCCESS,
        payload: judgment.data.data,
      });
    } else {
      dispatch({
        type: problemConstants.READ_SUBMISSION_JUDGE_FAIL,
        errors: judgment.data.error,
      });
    }
  } catch (err) {
    console.log(err);
    dispatch({
      type: problemConstants.READ_SUBMISSION_JUDGE_FAIL,
      errors: err,
    });
  }
  try {
    const challenge = await agent.get(`/challenge/${challengeId}`, auth);
    if (challenge.data.success) {
      dispatch({
        type: problemConstants.READ_CHALLENGE_SUCCESS,
        payload: challenge.data.data,
      });
    } else {
      dispatch({
        type: problemConstants.READ_CHALLENGE_FAIL,
        errors: challenge.data.error,
      });
    }
  } catch (err) {
    dispatch({
      type: problemConstants.READ_CHALLENGE_FAIL,
      errors: err,
    });
  }

  try {
    const problem = await agent.get(`/problem/${problemId}`, auth);
    if (problem.data.success) {
      dispatch({
        type: problemConstants.READ_PROBLEM_SUCCESS,
        payload: problem.data.data,
      });
    } else {
      dispatch({
        type: problemConstants.READ_PROBLEM_FAIL,
        errors: problem.data.error,
      });
    }
  } catch (err) {
    dispatch({
      type: problemConstants.READ_PROBLEM_FAIL,
      errors: err,
    });
  }
};

const browseTestcase = (token, problemId) => async (dispatch) => {
  dispatch({ type: problemConstants.FETCH_TESTCASE_UNDER_PROBLEM_START });
  const auth = {
    headers: {
      'Auth-Token': token,
    },
  };
  try {
    const testcases = await agent.get(`/problem/${problemId}/testcase`, auth);
    if (testcases.data.success) {
      dispatch({
        type: problemConstants.FETCH_TESTCASE_UNDER_PROBLEM_SUCCESS,
        payload: { problemId, testcases: testcases.data.data },
      });
    } else {
      dispatch({
        type: problemConstants.FETCH_TESTCASE_UNDER_PROBLEM_FAIL,
        errors: testcases.data.error,
      });
    }
  } catch (err) {
    dispatch({
      type: problemConstants.FETCH_TESTCASE_UNDER_PROBLEM_FAIL,
      errors: err,
    });
  }
};

const browseAssistingData = (token, problemId) => async (dispatch) => {
  dispatch({ type: problemConstants.BROWSE_ASSISTING_DATA_START });
  const auth = {
    headers: {
      'Auth-Token': token,
    },
  };
  try {
    const res = await agent.get(`/problem/${problemId}/assisting-data`, auth);
    if (res.data.success) {
      dispatch({
        type: problemConstants.BROWSE_ASSISTING_DATA_SUCCESS,
        payload: { problemId, assistingData: res.data.data },
      });
    } else {
      dispatch({
        type: problemConstants.BROWSE_ASSISTING_DATA_FAIL,
        errors: res.data.error,
      });
    }
  } catch (err) {
    dispatch({
      type: problemConstants.BROWSE_ASSISTING_DATA_FAIL,
      errors: err,
    });
  }
};

const editProblemInfo = (token, problemId, title, score, testcaseDisabled, description, ioDescription, source, hint) => async (dispatch) => {
  dispatch({ type: problemConstants.EDIT_PROBLEM_START });
  const auth = {
    headers: {
      'Auth-Token': token,
    },
  };
  const body = {
    title,
    full_score: score,
    testcase_disabled: testcaseDisabled,
    description,
    io_description: ioDescription,
    source,
    hint,
  };
  try {
    const res = await agent.patch(`/problem/${problemId}`, body, auth);
    if (res.data.success) {
      dispatch({
        type: problemConstants.EDIT_PROBLEM_SUCCESS,
        payload: { problemId, content: body },
      });
    } else {
      dispatch({
        type: problemConstants.EDIT_PROBLEM_FAIL,
        errors: res.data.error,
      });
    }
  } catch (err) {
    dispatch({
      type: problemConstants.EDIT_PROBLEM_FAIL,
      errors: err,
    });
  }
};

const deleteProblem = (token, problemId) => async (dispatch) => {
  dispatch({ type: problemConstants.DELETE_PROBLEM_START });
  const auth = {
    headers: {
      'Auth-Token': token,
    },
  };
  try {
    const res = await agent.delete(`/problem/${problemId}`, auth);
    if (res.data.success) {
      dispatch({
        type: problemConstants.DELETE_PROBLEM_SUCCESS,
        payload: problemId,
      });
    } else {
      dispatch({
        type: problemConstants.DELETE_PROBLEM_FAIL,
        errors: res.data.error,
      });
    }
  } catch (err) {
    dispatch({
      type: problemConstants.DELETE_PROBLEM_FAIL,
      errors: err,
    });
  }
};

const deleteTestcase = (token, testcaseId) => async (dispatch) => {
  dispatch({ type: problemConstants.DELETE_TESTCASE_START });
  const auth = {
    headers: {
      'Auth-Token': token,
    },
  };
  try {
    const res = await agent.delete(`/testcase/${testcaseId}`, auth);
    if (res.data.success) {
      dispatch({
        type: problemConstants.DELETE_TESTCASE_SUCCESS,
        payload: testcaseId,
      });
    } else {
      dispatch({
        type: problemConstants.DELETE_TESTCASE_FAIL,
        errors: res.data.error,
      });
    }
  } catch (err) {
    dispatch({
      type: problemConstants.DELETE_TESTCASE_FAIL,
      errors: err,
    });
  }
};

const deleteAssistingData = (token, assistingId) => async (dispatch) => {
  dispatch({ type: problemConstants.DELETE_ASSISTING_DATA_START });
  const auth = {
    headers: {
      'Auth-Token': token,
    },
  };
  try {
    const res = await agent.delete(`/assisting-data/${assistingId}`, auth);
    if (res.data.success) {
      dispatch({
        type: problemConstants.DELETE_ASSISTING_DATA_SUCCESS,
        payload: assistingId,
      });
    } else {
      dispatch({
        type: problemConstants.DELETE_ASSISTING_DATA_FAIL,
        errors: res.data.error,
      });
    }
  } catch (err) {
    dispatch({
      type: problemConstants.DELETE_ASSISTING_DATA_FAIL,
      errors: err,
    });
  }
};

const editAssistingData = (token, assistingId, file) => async (dispatch) => {
  dispatch({ type: problemConstants.EDIT_ASSISTING_DATA_START });
  const auth = {
    headers: {
      'Auth-Token': token,
    },
    'Content-Type': 'multipart/form-data',
  };
  const formData = new FormData();
  formData.append('assisting_data', file);

  try {
    const res = await agent.put(`/assisting-data/${assistingId}`, formData, auth);
    console.log(res);
    if (res.data.success) {
      dispatch({
        type: problemConstants.EDIT_ASSISTING_DATA_SUCCESS,
      });
    } else {
      dispatch({
        type: problemConstants.EDIT_ASSISTING_DATA_FAIL,
        errors: res.data.error,
      });
    }
  } catch (err) {
    dispatch({
      type: problemConstants.EDIT_ASSISTING_DATA_FAIL,
      errors: err,
    });
  }
};

const addAssistingData = (token, problemId, file) => async (dispatch) => {
  dispatch({ type: problemConstants.ADD_ASSISTING_DATA_START });
  const auth = {
    headers: {
      'Auth-Token': token,
      'Content-Type': 'multipart/form-data',
    },
  };
  const formData = new FormData();
  formData.append('assisting_data', file);

  try {
    const res = await agent.post(`/problem/${problemId}/assisting-data`, formData, auth);
    if (res.data.success) {
      dispatch({
        type: problemConstants.ADD_ASSISTING_DATA_SUCCESS,
      });
    } else {
      dispatch({
        type: problemConstants.ADD_ASSISTING_DATA_FAIL,
        errors: res.data.error,
      });
    }
  } catch (err) {
    dispatch({
      type: problemConstants.ADD_ASSISTING_DATA_FAIL,
      errors: err,
    });
  }
};

const submitCode = (token, problemId, languageId, content) => async (dispatch) => {
  dispatch({ type: problemConstants.SUBMIT_PROBLEM_START });
  const config = {
    headers: {
      'Auth-Token': token,
      'Content-Type': 'multipart/form-data',
    },
    params: {
      language_id: languageId,
    },
  };
  const blob = new Blob([content]); // , { type: 'text/py' }); // haven't set designated type
  const formData = new FormData();
  formData.append('content_file', blob);

  try {
    const res = await agent.post(`/problem/${problemId}/submission`, formData, config);
    console.log('submit', res);
    if (res.data.success) {
      dispatch({
        type: problemConstants.SUBMIT_PROBLEM_SUCCESS,
      });
    } else {
      dispatch({
        type: problemConstants.SUBMIT_PROBLEM_FAIL,
        errors: res.data.error,
      });
    }
  } catch (err) {
    dispatch({
      type: problemConstants.SUBMIT_PROBLEM_FAIL,
      errors: err,
    });
  }
};

export {
  browseChallengeOverview,
  readProblemInfo,
  editProblemInfo,
  deleteProblem,
  readSubmissionDetail,
  readSubmission,
  browseTestcase,
  browseAssistingData,
  deleteTestcase,
  deleteAssistingData,
  editAssistingData,
  addAssistingData,
  submitCode,
};
