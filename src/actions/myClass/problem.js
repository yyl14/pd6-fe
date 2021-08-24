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
    dispatch({ type: problemConstants.BROWSE_TASKS_UNDER_CHALLENGE_SUCCESS, payload: { id: challengeId, data: res.data.data } });
  } catch (err) {
    dispatch({
      type: problemConstants.BROWSE_TASKS_UNDER_CHALLENGE_FAIL,
      error: err,
    });
  }
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
    dispatch({
      type: problemConstants.READ_SUBMISSION_FAIL,
      errors: err,
    });
  }
};

const readSubmissionDetail = (token, submissionId) => async (dispatch) => {
  dispatch({ type: problemConstants.READ_SUBMISSION_JUDGE_START });
  const auth = {
    headers: {
      'Auth-Token': token,
    },
  };

  try {
    const judgment = await agent.get(`/submission/${submissionId}/latest-judgment`, auth);
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
      const { success, data, error } = testcases.data;
      // console.log('testcase ori data: ', data);
      const newTestcases = await Promise.all(
        data.map(async (testcase) => {
          if (testcase.is_sample === true) {
            if (testcase.input_file_uuid !== null || testcase.output_file_uuid !== null) {
              const config1 = {
                headers: {
                  'Auth-Token': token,
                },
                params: {
                  filename: testcase.input_filename,
                  as_attachment: false,
                },
              };
              const config2 = {
                headers: {
                  'Auth-Token': token,
                },
                params: {
                  filename: testcase.output_filename,
                  as_attachment: false,
                },
              };
              const res1 = await agent.get(`/s3-file/${testcase.input_file_uuid}/url`, config1);
              const res2 = await agent.get(`/s3-file/${testcase.output_file_uuid}/url`, config2);
              if (res1.data.success && res2.data.success) {
                const input = await fetch(res1.data.data.url)
                  .then((r) => r.text())
                  .then((t) => t.toString());
                const output = await fetch(res2.data.data.url)
                  .then((r) => r.text())
                  .then((t) => t.toString());
                return {
                  ...testcase,
                  input,
                  output,
                };
              }
              return {
                ...testcase,
                input: '',
                output: '',
              };
            }
            if (testcase.input_file_uuid !== null) {
              const config1 = {
                headers: {
                  'Auth-Token': token,
                },
                params: {
                  filename: testcase.input_filename,
                  as_attachment: false,
                },
              };
              const res1 = await agent.get(`/s3-file/${testcase.input_file_uuid}/url`, config1);
              if (res1.data.success) {
                const input = await fetch(res1.data.data.url)
                  .then((r) => r.text())
                  .then((t) => t.toString());
                return {
                  ...testcase,
                  input,
                  output: '',
                };
              }
              return {
                ...testcase,
                input: '',
                output: '',
              };
            }
            if (testcase.output_file_uuid !== null) {
              const config2 = {
                headers: {
                  'Auth-Token': token,
                },
                params: {
                  filename: testcase.output_filename,
                  as_attachment: false,
                },
              };
              const res2 = await agent.get(`/s3-file/${testcase.output_file_uuid}/url`, config2);
              if (res2.data.success) {
                const output = await fetch(res2.data.data.url)
                  .then((r) => r.text())
                  .then((t) => t.toString());
                return {
                  ...testcase,
                  input: '',
                  output,
                };
              }
              return {
                ...testcase,
                input: '',
                output: '',
              };
            }
            return {
              ...testcase,
              input: '',
              output: '',
            };
          }
          return testcase;
        }),
      );
      console.log('newTestcases: ', newTestcases);
      dispatch({
        type: problemConstants.FETCH_TESTCASE_UNDER_PROBLEM_SUCCESS,
        payload: { problemId, testcases: newTestcases },
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

const editTestcase = (token, testcaseId, isSample, score, timeLimit, memoryLimit, isDisabled) => async (dispatch) => {
  // just edit basic info
  dispatch({ type: problemConstants.EDIT_TESTCASE_START });
  const auth = {
    headers: {
      'Auth-Token': token,
    },
  };
  const body = {
    is_sample: isSample,
    score,
    time_limit: timeLimit,
    memory_limit: memoryLimit,
    is_disabled: isDisabled,
  };
  try {
    const res = await agent.patch(`/testcase/${testcaseId}`, body, auth);
    console.log('edit testcase info', res.data);
    if (res.data.success) {
      dispatch({
        type: problemConstants.EDIT_TESTCASE_SUCCESS,
        payload: testcaseId,
      });
    } else {
      dispatch({
        type: problemConstants.EDIT_TESTCASE_FAIL,
        errors: res.data.error,
      });
    }
  } catch (err) {
    dispatch({
      type: problemConstants.EDIT_TESTCASE_FAIL,
      errors: err,
    });
  }
};

const uploadTestcaseInput = (token, testcaseId, file) => async (dispatch) => {
  // just upload input file
  dispatch({ type: problemConstants.UPLOAD_TESTCASE_INPUT_START });
  const auth = {
    headers: {
      'Auth-Token': token,
      'Content-Type': 'multipart/form-data',
    },
  };
  const formData = new FormData();
  formData.append('input_file', file);

  try {
    const res = await agent.put(`/testcase/${testcaseId}/input-data`, formData, auth);
    console.log('upload input data', res.data);
    if (res.data.success) {
      dispatch({
        type: problemConstants.UPLOAD_TESTCASE_INPUT_SUCCESS,
      });
    } else {
      dispatch({
        type: problemConstants.UPLOAD_TESTCASE_INPUT_FAIL,
        errors: res.data.error,
      });
    }
  } catch (err) {
    dispatch({
      type: problemConstants.UPLOAD_TESTCASE_INPUT_FAIL,
      errors: err,
    });
  }
};

const uploadTestcaseOutput = (token, testcaseId, file) => async (dispatch) => {
  // just upload output file
  dispatch({ type: problemConstants.UPLOAD_TESTCASE_OUTPUT_START });
  const auth = {
    headers: {
      'Auth-Token': token,
      'Content-Type': 'multipart/form-data',
    },
  };
  const formData = new FormData();
  formData.append('output_file', file);

  try {
    const res = await agent.put(`/testcase/${testcaseId}/output-data`, formData, auth);
    console.log('upload output data', res.data);
    if (res.data.success) {
      dispatch({
        type: problemConstants.UPLOAD_TESTCASE_OUTPUT_SUCCESS,
      });
    } else {
      dispatch({
        type: problemConstants.UPLOAD_TESTCASE_OUTPUT_FAIL,
        errors: res.data.error,
      });
    }
  } catch (err) {
    dispatch({
      type: problemConstants.UPLOAD_TESTCASE_OUTPUT_FAIL,
      errors: err,
    });
  }
};

const addTestcaseWithFile = (token, problemId, isSample, score, timeLimit, memoryLimit, isDisabled, inputFile = null, outputFile = null) => async (dispatch) => {
  // judge whether there exists inputFile or outputFile
  dispatch({ type: problemConstants.ADD_TESTCASE_START });
  const auth = {
    headers: {
      'Auth-Token': token,
    },
  };
  const body = {
    is_sample: isSample,
    score,
    time_limit: timeLimit,
    memory_limit: memoryLimit,
    is_disabled: isDisabled,
  };
  try {
    const res = await agent.post(`/problem/${problemId}/testcase`, body, auth);
    console.log('add testcase info', res.data);
    if (res.data.success) {
      // try to upload file
      const testcaseId = res.data.data.id;
      const fileAuth = {
        headers: {
          'Auth-Token': token,
          'Content-Type': 'multipart/form-data',
        },
      };
      if (inputFile != null) {
        const formData = new FormData();
        formData.append('input_file', inputFile);
        const inRes = await agent.put(`/testcase/${testcaseId}/input-data`, formData, fileAuth);
        console.log('add testcase input file', inRes);
        if (!inRes.data.success) {
          dispatch({
            type: problemConstants.ADD_TESTCASE_FAIL,
            errors: inRes.data.error,
          });
        }
      }
      if (outputFile != null) {
        const formData = new FormData();
        formData.append('output_file', outputFile);
        const outRes = await agent.put(`/testcase/${testcaseId}/output-data`, formData, fileAuth);
        console.log('add testcase output file', outRes);
        if (!outRes.data.success) {
          dispatch({
            type: problemConstants.ADD_TESTCASE_FAIL,
            errors: outRes.data.error,
          });
        }
      }
    } else {
      dispatch({
        type: problemConstants.ADD_TESTCASE_FAIL,
        errors: res.data.error,
      });
    }
  } catch (err) {
    dispatch({
      type: problemConstants.ADD_TESTCASE_FAIL,
      errors: err,
    });
  }
};

export {
  browseChallengeOverview,
  editChallenge,
  browseTasksUnderChallenge,
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
  editTestcase,
  uploadTestcaseInput,
  uploadTestcaseOutput,
  addTestcaseWithFile,
};
