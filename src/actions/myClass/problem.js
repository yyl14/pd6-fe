import agent from '../agent';
import { problemConstants } from './constant';

function getText(url) {
  // read text from URL location
  return new Promise((resolve) => {
    const request = new XMLHttpRequest();
    request.open('GET', url, true);
    request.send(null);
    request.onreadystatechange = () => {
      if (request.readyState === 4 && request.status === 200) {
        const type = request.getResponseHeader('Content-Type');
        if (type.indexOf('text') !== 1) {
          resolve(request.responseText);
          // return request.responseText;
        }
      }
    };
  });
}

const readProblemInfo = (token, problemId) => async (dispatch) => {
  const config = {
    headers: {
      'Auth-Token': token,
    },
  };

  try {
    dispatch({ type: problemConstants.READ_PROBLEM_START });
    const problemInfo = await agent.get(`/problem/${problemId}`, config);
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

const readSubmission = (token, accountId, problemId) => async (dispatch) => {
  dispatch({ type: problemConstants.READ_SUBMISSION_START });
  const config = {
    headers: {
      'Auth-Token': token,
    },
    params: {
      problem_id: parseInt(problemId, 10),
      account_id: accountId,
    },
  };
  try {
    const subInfo = await agent.get('/submission', config);
    dispatch({
      type: problemConstants.READ_SUBMISSION_SUCCESS,
      payload: subInfo.data.data.data,
    });
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

    dispatch({
      type: problemConstants.READ_SUBMISSION_JUDGE_SUCCESS,
      payload: judgment.data.data,
    });
  } catch (err) {
    dispatch({
      type: problemConstants.READ_SUBMISSION_JUDGE_FAIL,
      errors: err,
    });
  }
};

const browseJudgeCases = (token, judgmentId) => async (dispatch) => {
  dispatch({ type: problemConstants.BROWSE_JUDGE_CASES_START });
  const auth = {
    headers: {
      'Auth-Token': token,
    },
  };
  try {
    const res = await agent.get(`/judgment/${judgmentId}/judge-case`, auth);

    dispatch({
      type: problemConstants.BROWSE_JUDGE_CASES_SUCCESS,
      payload: res.data.data,
    });
  } catch (err) {
    dispatch({
      type: problemConstants.BROWSE_JUDGE_CASES_FAIL,
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

    const { success, data, error } = testcases.data;
    const newTestcases = await Promise.all(
      data.map(async (testcase) => {
        if (testcase.is_sample === true) {
          if (testcase.input_file_uuid !== null && testcase.output_file_uuid !== null) {
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
              const input = await getText(res1.data.data.url);
              const output = await getText(res2.data.data.url);
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
              const input = await getText(res1.data.data.url);
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
              const output = await getText(res2.data.data.url);
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
    dispatch({
      type: problemConstants.FETCH_TESTCASE_UNDER_PROBLEM_SUCCESS,
      payload: { problemId, testcases: newTestcases },
    });
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
    dispatch({
      type: problemConstants.BROWSE_ASSISTING_DATA_SUCCESS,
      payload: { problemId, assistingData: res.data.data },
    });
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
    await agent.patch(`/problem/${problemId}`, body, auth);

    dispatch({
      type: problemConstants.EDIT_PROBLEM_SUCCESS,
      payload: { problemId, content: body },
    });
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
    await agent.delete(`/problem/${problemId}`, auth);

    dispatch({
      type: problemConstants.DELETE_PROBLEM_SUCCESS,
      payload: problemId,
    });
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
    await agent.delete(`/testcase/${testcaseId}`, auth);

    dispatch({
      type: problemConstants.DELETE_TESTCASE_SUCCESS,
      payload: testcaseId,
    });
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
    await agent.delete(`/assisting-data/${assistingId}`, auth);
    dispatch({
      type: problemConstants.DELETE_ASSISTING_DATA_SUCCESS,
      payload: assistingId,
    });
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
  formData.append('assisting_data_file', file);

  try {
    await agent.put(`/assisting-data/${assistingId}`, formData, auth);

    dispatch({
      type: problemConstants.EDIT_ASSISTING_DATA_SUCCESS,
    });
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
    await agent.post(`/problem/${problemId}/assisting-data`, formData, auth);
    dispatch({
      type: problemConstants.ADD_ASSISTING_DATA_SUCCESS,
    });
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
  const blob = new Blob([content], { type: 'text/plain' });
  const file = new File([blob], 'foo.txt', { type: 'text/plain' });
  const formData = new FormData();
  formData.append('content_file', file);

  try {
    await agent.post(`/problem/${problemId}/submission`, formData, config);

    dispatch({
      type: problemConstants.SUBMIT_PROBLEM_SUCCESS,
    });
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
    await agent.patch(`/testcase/${testcaseId}`, body, auth);

    dispatch({
      type: problemConstants.EDIT_TESTCASE_SUCCESS,
      payload: testcaseId,
    });
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
    await agent.put(`/testcase/${testcaseId}/input-data`, formData, auth);

    dispatch({
      type: problemConstants.UPLOAD_TESTCASE_INPUT_SUCCESS,
    });
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
    await agent.put(`/testcase/${testcaseId}/output-data`, formData, auth);

    dispatch({
      type: problemConstants.UPLOAD_TESTCASE_OUTPUT_SUCCESS,
    });
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
    // console.log('add testcase info', res.data);

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
      // console.log('add testcase input file', inRes);
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
      // console.log('add testcase output file', outRes);
      if (!outRes.data.success) {
        dispatch({
          type: problemConstants.ADD_TESTCASE_FAIL,
          errors: outRes.data.error,
        });
      }
    }
    dispatch({ type: problemConstants.ADD_TESTCASE_SUCCESS });
  } catch (err) {
    dispatch({
      type: problemConstants.ADD_TESTCASE_FAIL,
      errors: err,
    });
  }
};

const readTestcase = (token, testcaseId) => async (dispatch) => {
  dispatch({ type: problemConstants.READ_TESTCASE_START });
  const auth = {
    headers: {
      'Auth-Token': token,
    },
  };
  try {
    const res = await agent.get(`/testcase/${testcaseId}`, auth);

    dispatch({
      type: problemConstants.READ_TESTCASE_SUCCESS,
      payload: res.data.data,
    });
  } catch (err) {
    dispatch({
      type: problemConstants.READ_TESTCASE_FAIL,
      errors: err,
    });
  }
};

const readProblemScore = (token, problemId) => async (dispatch) => {
  dispatch({ type: problemConstants.READ_PROBLEM_SCORE_START });
  const auth = {
    headers: {
      'Auth-Token': token,
    },
  };
  try {
    const res = await agent.get(`/problem/${problemId}/score`, auth);

    dispatch({
      type: problemConstants.READ_PROBLEM_SCORE_SUCCESS,
      payload: { data: res.data.data, problemId },
    });
  } catch (err) {
    dispatch({
      type: problemConstants.READ_PROBLEM_SCORE_FAIL,
      errors: err,
    });
  }
};

export {
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
  browseJudgeCases,
  readTestcase,
  readProblemScore,
};
