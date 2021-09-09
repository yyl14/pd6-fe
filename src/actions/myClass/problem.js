import agent from '../agent';
import { problemConstants } from './constant';
import { autoTableConstants } from '../component/constant';
import browseParamsTransForm from '../../function/browseParamsTransform';
import getTextFromUrl from '../../function/getTextFromUrl';

const readProblemInfo = (token, problemId) => async (dispatch) => {
  const config = {
    headers: {
      'auth-token': token,
    },
  };

  try {
    dispatch({ type: problemConstants.READ_PROBLEM_START });
    const res = await agent.get(`/problem/${problemId}`, config);
    dispatch({
      type: problemConstants.READ_PROBLEM_SUCCESS,
      payload: res.data.data,
    });
  } catch (error) {
    dispatch({
      type: problemConstants.READ_PROBLEM_FAIL,
      error,
    });
  }
};

const readSubmission = (token, accountId, problemId, browseParams, tableId = null) => async (dispatch) => {
  dispatch({ type: problemConstants.READ_SUBMISSION_START });
  const temp = {
    ...browseParams,
    filter: [['problem_id', '=', problemId]].concat(browseParams.filter),
    account_id: accountId,
  };
  const config = {
    headers: {
      'auth-token': token,
    },
    params: browseParamsTransForm(temp),
  };
  try {
    const res = await agent.get('/submission', config);
    const { data: submissions, total_count } = res.data.data;
    // console.log('readSubmission config:', config);
    // console.log('readSubmission submissions:', submissions);
    dispatch({
      type: problemConstants.READ_SUBMISSION_SUCCESS,
      payload: submissions,
    });
    dispatch({
      type: autoTableConstants.AUTO_TABLE_UPDATE,
      payload: {
        tableId,
        totalCount: total_count,
        dataIds: submissions.map((item) => item.id),
        offset: browseParams.offset,
      },
    });
  } catch (error) {
    dispatch({
      type: problemConstants.READ_SUBMISSION_FAIL,
      error,
    });
  }
};

const readSubmissionDetail = (token, submissionId) => async (dispatch) => {
  dispatch({ type: problemConstants.READ_SUBMISSION_JUDGE_START });
  const config = {
    headers: {
      'auth-token': token,
    },
  };

  try {
    const res = await agent.get(`/submission/${submissionId}/latest-judgment`, config);

    dispatch({
      type: problemConstants.READ_SUBMISSION_JUDGE_SUCCESS,
      payload: res.data.data,
    });
  } catch (error) {
    dispatch({
      type: problemConstants.READ_SUBMISSION_JUDGE_FAIL,
      error,
    });
  }
};

const browseJudgeCases = (token, judgmentId) => async (dispatch) => {
  dispatch({ type: problemConstants.BROWSE_JUDGE_CASES_START });
  const config = {
    headers: {
      'auth-token': token,
    },
  };
  try {
    const res = await agent.get(`/judgment/${judgmentId}/judge-case`, config);

    dispatch({
      type: problemConstants.BROWSE_JUDGE_CASES_SUCCESS,
      payload: res.data.data,
    });
  } catch (error) {
    dispatch({
      type: problemConstants.BROWSE_JUDGE_CASES_FAIL,
      error,
    });
  }
};

const browseTestcase = (token, problemId) => async (dispatch) => {
  dispatch({ type: problemConstants.FETCH_TESTCASE_UNDER_PROBLEM_START });
  const config = {
    headers: {
      'auth-token': token,
    },
  };
  try {
    const testcases = await agent.get(`/problem/${problemId}/testcase`, config);

    const { data } = testcases.data;
    const newTestcases = await Promise.all(
      data.map(async (testcase) => {
        if (testcase.is_sample === true) {
          if (testcase.input_file_uuid !== null && testcase.output_file_uuid !== null) {
            const config1 = {
              headers: {
                'auth-token': token,
              },
              params: {
                filename: testcase.input_filename,
                as_attachment: false,
              },
            };
            const config2 = {
              headers: {
                'auth-token': token,
              },
              params: {
                filename: testcase.output_filename,
                as_attachment: false,
              },
            };
            const res1 = await agent.get(`/s3-file/${testcase.input_file_uuid}/url`, config1);
            const res2 = await agent.get(`/s3-file/${testcase.output_file_uuid}/url`, config2);
            if (res1.data.success && res2.data.success) {
              const input = await getTextFromUrl(res1.data.data.url);
              const output = await getTextFromUrl(res2.data.data.url);
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
                'auth-token': token,
              },
              params: {
                filename: testcase.input_filename,
                as_attachment: false,
              },
            };
            const res1 = await agent.get(`/s3-file/${testcase.input_file_uuid}/url`, config1);
            if (res1.data.success) {
              const input = await getTextFromUrl(res1.data.data.url);
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
                'auth-token': token,
              },
              params: {
                filename: testcase.output_filename,
                as_attachment: false,
              },
            };
            const res2 = await agent.get(`/s3-file/${testcase.output_file_uuid}/url`, config2);
            if (res2.data.success) {
              const output = await getTextFromUrl(res2.data.data.url);
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
  } catch (error) {
    dispatch({
      type: problemConstants.FETCH_TESTCASE_UNDER_PROBLEM_FAIL,
      error,
    });
  }
};

const browseAssistingData = (token, problemId) => async (dispatch) => {
  dispatch({ type: problemConstants.BROWSE_ASSISTING_DATA_START });
  const config = {
    headers: {
      'auth-token': token,
    },
  };
  try {
    const res = await agent.get(`/problem/${problemId}/assisting-data`, config);
    dispatch({
      type: problemConstants.BROWSE_ASSISTING_DATA_SUCCESS,
      payload: { problemId, assistingData: res.data.data },
    });
  } catch (error) {
    dispatch({
      type: problemConstants.BROWSE_ASSISTING_DATA_FAIL,
      error,
    });
  }
};

const editProblemInfo = (token, problemId, label, title, score, testcaseDisabled, description, ioDescription, source, hint) => async (dispatch) => {
  dispatch({ type: problemConstants.EDIT_PROBLEM_START });
  const config = {
    headers: {
      'auth-token': token,
    },
  };
  const body = {
    challenge_label: label,
    title,
    full_score: score,
    testcase_disabled: testcaseDisabled,
    description,
    io_description: ioDescription,
    source,
    hint,
  };
  try {
    await agent.patch(`/problem/${problemId}`, body, config);

    dispatch({
      type: problemConstants.EDIT_PROBLEM_SUCCESS,
      payload: { problemId, content: body },
    });
  } catch (error) {
    dispatch({
      type: problemConstants.EDIT_PROBLEM_FAIL,
      error,
    });
  }
};

const deleteProblem = (token, problemId) => async (dispatch) => {
  dispatch({ type: problemConstants.DELETE_PROBLEM_START });
  const config = {
    headers: {
      'auth-token': token,
    },
  };
  try {
    await agent.delete(`/problem/${problemId}`, config);

    dispatch({
      type: problemConstants.DELETE_PROBLEM_SUCCESS,
      payload: problemId,
    });
  } catch (error) {
    dispatch({
      type: problemConstants.DELETE_PROBLEM_FAIL,
      error,
    });
  }
};

const deleteTestcase = (token, testcaseId) => async (dispatch) => {
  dispatch({ type: problemConstants.DELETE_TESTCASE_START });
  const config = {
    headers: {
      'auth-token': token,
    },
  };
  try {
    await agent.delete(`/testcase/${testcaseId}`, config);

    dispatch({
      type: problemConstants.DELETE_TESTCASE_SUCCESS,
      payload: testcaseId,
    });
  } catch (error) {
    dispatch({
      type: problemConstants.DELETE_TESTCASE_FAIL,
      error,
    });
  }
};

const deleteAssistingData = (token, assistingId) => async (dispatch) => {
  dispatch({ type: problemConstants.DELETE_ASSISTING_DATA_START });
  const config = {
    headers: {
      'auth-token': token,
    },
  };
  try {
    await agent.delete(`/assisting-data/${assistingId}`, config);
    dispatch({
      type: problemConstants.DELETE_ASSISTING_DATA_SUCCESS,
      payload: assistingId,
    });
  } catch (error) {
    dispatch({
      type: problemConstants.DELETE_ASSISTING_DATA_FAIL,
      error,
    });
  }
};

const editAssistingData = (token, assistingId, file) => async (dispatch) => {
  dispatch({ type: problemConstants.EDIT_ASSISTING_DATA_START });
  const config = {
    headers: {
      'auth-token': token,
    },
    'Content-Type': 'multipart/form-data',
  };
  const formData = new FormData();
  formData.append('assisting_data_file', file);

  try {
    await agent.put(`/assisting-data/${assistingId}`, formData, config);

    dispatch({
      type: problemConstants.EDIT_ASSISTING_DATA_SUCCESS,
    });
  } catch (error) {
    dispatch({
      type: problemConstants.EDIT_ASSISTING_DATA_FAIL,
      error,
    });
  }
};

const addAssistingData = (token, problemId, file) => async (dispatch) => {
  dispatch({ type: problemConstants.ADD_ASSISTING_DATA_START });
  const config = {
    headers: {
      'auth-token': token,
      'Content-Type': 'multipart/form-data',
    },
  };
  const formData = new FormData();
  formData.append('assisting_data', file);

  try {
    await agent.post(`/problem/${problemId}/assisting-data`, formData, config);
    dispatch({
      type: problemConstants.ADD_ASSISTING_DATA_SUCCESS,
    });
  } catch (error) {
    dispatch({
      type: problemConstants.ADD_ASSISTING_DATA_FAIL,
      error,
    });
    dispatch({
      type: problemConstants.UPLOAD_DATA_FAIL,
      filename: file.name,
    });
  }
};

const submitCode = (token, problemId, languageId, content) => async (dispatch) => {
  dispatch({ type: problemConstants.SUBMIT_PROBLEM_START });
  const config = {
    headers: {
      'auth-token': token,
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
  } catch (error) {
    dispatch({
      type: problemConstants.SUBMIT_PROBLEM_FAIL,
      error,
    });
  }
};

const editTestcase = (token, testcaseId, isSample, score, timeLimit, memoryLimit, isDisabled) => async (dispatch) => {
  // just edit basic info
  dispatch({ type: problemConstants.EDIT_TESTCASE_START });
  const config = {
    headers: {
      'auth-token': token,
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
    await agent.patch(`/testcase/${testcaseId}`, body, config);

    dispatch({
      type: problemConstants.EDIT_TESTCASE_SUCCESS,
      payload: testcaseId,
    });
  } catch (error) {
    dispatch({
      type: problemConstants.EDIT_TESTCASE_FAIL,
      error,
    });
  }
};

const uploadTestcaseInput = (token, testcaseId, file) => async (dispatch) => {
  // just upload input file
  dispatch({ type: problemConstants.UPLOAD_TESTCASE_INPUT_START });
  const config = {
    headers: {
      'auth-token': token,
      'Content-Type': 'multipart/form-data',
    },
  };
  const formData = new FormData();
  formData.append('input_file', file);

  try {
    await agent.put(`/testcase/${testcaseId}/input-data`, formData, config);

    dispatch({
      type: problemConstants.UPLOAD_TESTCASE_INPUT_SUCCESS,
    });
  } catch (error) {
    dispatch({
      type: problemConstants.UPLOAD_TESTCASE_INPUT_FAIL,
      error,
    });
    dispatch({
      type: problemConstants.UPLOAD_DATA_FAIL,
      filename: file.name,
    });
  }
};

const uploadTestcaseOutput = (token, testcaseId, file) => async (dispatch) => {
  // just upload output file
  dispatch({ type: problemConstants.UPLOAD_TESTCASE_OUTPUT_START });
  const config = {
    headers: {
      'auth-token': token,
      'Content-Type': 'multipart/form-data',
    },
  };
  const formData = new FormData();
  formData.append('output_file', file);

  try {
    await agent.put(`/testcase/${testcaseId}/output-data`, formData, config);

    dispatch({
      type: problemConstants.UPLOAD_TESTCASE_OUTPUT_SUCCESS,
    });
  } catch (error) {
    dispatch({
      type: problemConstants.UPLOAD_TESTCASE_OUTPUT_FAIL,
      error,
    });
    dispatch({
      type: problemConstants.UPLOAD_DATA_FAIL,
      filename: file.name,
    });
  }
};

const addTestcaseWithFile = (token, problemId, isSample, score, timeLimit, memoryLimit, isDisabled, inputFile = null, outputFile = null) => async (dispatch) => {
  // judge whether there exists inputFile or outputFile
  dispatch({ type: problemConstants.ADD_TESTCASE_START });
  const config = {
    headers: {
      'auth-token': token,
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
    const res = await agent.post(`/problem/${problemId}/testcase`, body, config);
    // console.log('add testcase info', res.data);

    // try to upload file
    const testcaseId = res.data.data.id;
    const fileAuth = {
      headers: {
        'auth-token': token,
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
          error: inRes.data.error,
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
          error: outRes.data.error,
        });
      }
    }
    dispatch({ type: problemConstants.ADD_TESTCASE_SUCCESS });
  } catch (error) {
    dispatch({
      type: problemConstants.ADD_TESTCASE_FAIL,
      error,
    });
    if (inputFile != null) {
      dispatch({
        type: problemConstants.UPLOAD_DATA_FAIL,
        filename: inputFile.name,
      });
    }
    if (outputFile != null) {
      dispatch({
        type: problemConstants.UPLOAD_DATA_FAIL,
        filename: outputFile.name,
      });
    }
  }
};

const readTestcase = (token, testcaseId) => async (dispatch) => {
  dispatch({ type: problemConstants.READ_TESTCASE_START });
  const config = {
    headers: {
      'auth-token': token,
    },
  };
  try {
    const res = await agent.get(`/testcase/${testcaseId}`, config);

    dispatch({
      type: problemConstants.READ_TESTCASE_SUCCESS,
      payload: res.data.data,
    });
  } catch (error) {
    dispatch({
      type: problemConstants.READ_TESTCASE_FAIL,
      error,
    });
  }
};

const readProblemScore = (token, problemId) => async (dispatch) => {
  dispatch({ type: problemConstants.READ_PROBLEM_SCORE_START });
  const config = {
    headers: {
      'auth-token': token,
    },
  };
  try {
    const res = await agent.get(`/problem/${problemId}/score`, config);

    dispatch({
      type: problemConstants.READ_PROBLEM_SCORE_SUCCESS,
      payload: { data: res.data.data, problemId },
    });
  } catch (error) {
    dispatch({
      type: problemConstants.READ_PROBLEM_SCORE_FAIL,
      error,
    });
  }
};

const downloadAllSamples = (token, problemId, as_attachment) => async (dispatch) => {
  const config = {
    headers: {
      'auth-token': token,
    },
    params: {
      as_attachment,
    },
  };
  dispatch({ type: problemConstants.DOWNLOAD_ALL_SAMPLE_TESTCASE_START });
  try {
    await agent.post(`/problem/${problemId}/all-sample-testcase`, {}, config);
    dispatch({ type: problemConstants.DOWNLOAD_ALL_SAMPLE_TESTCASE_SUCCESS });
  } catch (error) {
    dispatch({
      type: problemConstants.DOWNLOAD_ALL_SAMPLE_TESTCASE_FAIL,
      error,
    });
  }
};

const downloadAllTestcases = (token, problemId, as_attachment) => async (dispatch) => {
  const config = {
    headers: {
      'auth-token': token,
    },
    params: {
      as_attachment,
    },
  };
  dispatch({ type: problemConstants.DOWNLOAD_ALL_NON_SAMPLE_TESTCASE_START });
  try {
    await agent.post(`/problem/${problemId}/all-non-sample-testcase`, {}, config);

    dispatch({ type: problemConstants.DOWNLOAD_ALL_NON_SAMPLE_TESTCASE_SUCCESS });
  } catch (error) {
    dispatch({
      type: problemConstants.DOWNLOAD_ALL_NON_SAMPLE_TESTCASE_FAIL,
      error,
    });
  }
};

const clearUploadFail = () => (dispatch) => {
  dispatch({ type: problemConstants.CLEAR_UPLOAD_FAIL_RECORD });
};

const handleEditSamples = (token, testcases, sampleDataIds, sampleTableData, onSuccess, onError) => async (dispatch) => {
  onSuccess();
};

const handleEditTestcases = (token, testcases, testcaseDataIds, testcaseTableData, onSuccess, onError) => async (dispatch) => {
  onSuccess();
};

const handleEditAssistingData = (token, assistingData, assistTableData, selectedFileA, onSuccess, onError) => async (dispatch) => {
  onSuccess();
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
  downloadAllSamples,
  downloadAllTestcases,
  clearUploadFail,
  handleEditSamples,
  handleEditTestcases,
  handleEditAssistingData,
};
