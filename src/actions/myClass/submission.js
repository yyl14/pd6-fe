import agent from '../agent';
import {
  submissionConstants,
} from './constant';
import { autoTableConstants } from '../component/constant';
import browseParamsTransForm from '../../function/browseParamsTransform';

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

const fetchClassSubmissions = (token, browseParams, tableId = null, classId) => async (dispatch) => {
  try {
    // console.log(browseParams);
    const config1 = {
      headers: { 'auth-token': token },
      params: browseParamsTransForm(browseParams),
      // paramsSerializer: (params) => qs.stringify(params, { arrayFormat: 'repeat' }),
    };
    dispatch({
      type: submissionConstants.FETCH_SUBMISSIONS_START,
    });
    // console.log(config1);

    const res1 = await agent.get(`/class/${classId}/submission`, config1);

    const { data, total_count } = res1.data.data;
    // Data Content
    //  { 'id': 'int',
    //   'account_id': 'int',
    //   'problem_id': 'int',
    //   'language_id': 'int',
    //   'content_file_uuid': 'UUID',
    //   'content_length': 'int',
    //   'filename': 'str',
    //   'submit_time': 'ServerTZDatetime'}

    // console.log(res1);

    // TODO: Batch browse account
    const config2 = {
      headers: { 'auth-token': token },
    };

    const accountIds = data.map((item) => item.account_id);
    // console.log('account_ids: ', accountIds);
    const config3 = {
      headers: { 'auth-token': token },
      params: {
        account_ids: accountIds,
      },
    };

    const res2 = await agent.get('/account-summary/batch?account_ids=1&account_ids=2&account_ids=3&account_ids=4&account_ids=5&account_ids=6&account_ids=7&account_ids=8', config2);

    // use submission id to get status
    const res3 = await Promise.all(
      data.map(async ({ id }) => agent
        .get(`/submission/${id}/judgment`, config2)
        .then((res4) => res4.data.data)
        .catch((err) => {
          dispatch({
            type: submissionConstants.FETCH_SUBMISSIONS_FAIL,
            payload: err,
          });
        })),
    );
    const judgments = res3.flat().filter((item) => item !== null);

    try {
      dispatch({
        type: submissionConstants.FETCH_SUBMISSIONS_SUCCESS,
        payload: {
          data,
          judgments,
          accounts: res2.data.data,
        },
      });
    } catch (err) {
      console.log(err);
    }
    dispatch({
      type: autoTableConstants.AUTO_TABLE_UPDATE,
      payload: {
        tableId,
        totalCount: total_count,
        dataIds: data.map((item) => item.id),
        offset: browseParams.offset,
      },
    });
  } catch (error) {
    dispatch({
      type: submissionConstants.FETCH_SUBMISSIONS_FAIL,
      payload: error,
    });
  }
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
      if (res.data.success) {
        if (res.data.data.content_file_uuid !== null && res.data.data.filename !== null) {
          const config = {
            headers: {
              'Auth-Token': token,
            },
            params: {
              filename: res.data.data.filename,
              as_attachment: false,
            },
          };
          agent.get(`/s3-file/${res.data.data.content_file_uuid}/url`, config)
            .then((res2) => {
              if (res2.data.success) {
                fetch(res2.data.data.url)
                  .then((r) => r.text())
                  .then((t) => {
                    dispatch({
                      type: submissionConstants.FETCH_SUBMISSION_SUCCESS,
                      payload: { submissionId, data: { ...res.data.data, content: t.toString() } },
                    });
                  });
              } else {
                dispatch({
                  type: submissionConstants.FETCH_SUBMISSION_SUCCESS,
                  payload: { submissionId, data: res.data.data },
                });
              }
            });
        } else {
          dispatch({
            type: submissionConstants.FETCH_SUBMISSION_SUCCESS,
            payload: { submissionId, data: res.data.data },
          });
        }
      } else {
        dispatch({
          type: submissionConstants.FETCH_SUBMISSION_FAIL,
          error: res.data.error,
        });
      }
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
const browseChallengeOverview = (token, challengeId) => async (dispatch) => {
  const auth = {
    headers: {
      'Auth-Token': token,
    },
  };
    // TODO: read challenge, get problem, and then get grade
  dispatch({ type: submissionConstants.READ_CHALLENGE_START });

  try {
    const res = await agent.get(`/challenge/${challengeId}`, auth);
    if (res.data.success) {
      dispatch({
        type: submissionConstants.READ_CHALLENGE_SUCCESS,
        payload: res.data.data,
      });
    } else {
      dispatch({
        type: submissionConstants.READ_CHALLENGE_FAIL,
        errors: res.data.error,
      });
    }
  } catch (err) {
    dispatch({
      type: submissionConstants.READ_CHALLENGE_FAIL,
      errors: err,
    });
  }
};

const readProblem = (token, problemId) => async (dispatch) => {
  dispatch({ type: submissionConstants.READ_PROBLEM_START });
  const auth = {
    headers: {
      'Auth-Token': token,
    },
  };
  try {
    const problemInfo = await agent.get(`/problem/${problemId}`, auth);
    if (problemInfo.data.success) {
      dispatch({
        type: submissionConstants.READ_PROBLEM_SUCCESS,
        payload: problemInfo.data.data,
      });
    } else {
      dispatch({
        type: submissionConstants.READ_PROBLEM_FAIL,
        errors: problemInfo.data.error,
      });
    }
  } catch (err) {
    dispatch({
      type: submissionConstants.READ_PROBLEM_FAIL,
      errors: err,
    });
  }
};

const readSubmissionDetail = (token, submissionId) => async (dispatch) => {
  dispatch({ type: submissionConstants.READ_SUBMISSION_JUDGE_START });
  const auth = {
    headers: {
      'Auth-Token': token,
    },
  };

  try {
    const judgment = await agent.get(`/submission/${submissionId}/latest-judgment`, auth);
    if (judgment.data.success) {
      dispatch({
        type: submissionConstants.READ_SUBMISSION_JUDGE_SUCCESS,
        payload: judgment.data.data,
      });
    } else {
      dispatch({
        type: submissionConstants.READ_SUBMISSION_JUDGE_FAIL,
        errors: judgment.data.error,
      });
    }
  } catch (err) {
    dispatch({
      type: submissionConstants.READ_SUBMISSION_JUDGE_FAIL,
      errors: err,
    });
  }
};

const browseJudgeCases = (token, judgmentId) => async (dispatch) => {
  dispatch({ type: submissionConstants.BROWSE_JUDGE_CASES_START });
  const auth = {
    headers: {
      'Auth-Token': token,
    },
  };
  try {
    const res = await agent.get(`/judgment/${judgmentId}/judge-case`, auth);
    if (res.data.success) {
      dispatch({
        type: submissionConstants.BROWSE_JUDGE_CASES_SUCCESS,
        payload: res.data.data,
      });
    } else {
      dispatch({
        type: submissionConstants.BROWSE_JUDGE_CASES_FAIL,
        errors: res.data.error,
      });
    }
  } catch (err) {
    dispatch({
      type: submissionConstants.BROWSE_JUDGE_CASES_FAIL,
      errors: err,
    });
  }
};

const readTestcase = (token, testcaseId) => async (dispatch) => {
  dispatch({ type: submissionConstants.READ_TESTCASE_START });
  const auth = {
    headers: {
      'Auth-Token': token,
    },
  };
  try {
    const res = await agent.get(`/testcase/${testcaseId}`, auth);
    if (res.data.success) {
      dispatch({
        type: submissionConstants.READ_TESTCASE_SUCCESS,
        payload: res.data.data,
      });
    } else {
      dispatch({
        type: submissionConstants.READ_TESTCASE_FAIL,
        errors: res.data.error,
      });
    }
  } catch (err) {
    dispatch({
      type: submissionConstants.READ_TESTCASE_FAIL,
      errors: err,
    });
  }
};

export {
  fetchAllSubmissions,
  fetchClassSubmissions,
  fetchSubmission,
  addSubmission,
  fetchJudgement,
  browseChallengeOverview,
  readProblem,
  readSubmissionDetail,
  browseJudgeCases,
  readTestcase,
};
