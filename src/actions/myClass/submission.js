import agent from '../agent';
import { submissionConstants } from './constant';
import { autoTableConstants } from '../component/constant';
import browseParamsTransForm from '../../function/browseParamsTransform';

const fetchAllSubmissions = (token, accountId, problemId, languageId) => async (dispatch) => {
  try {
    const config = {
      headers: {
        'auth-token': token,
      },
    };
    dispatch({ type: submissionConstants.FETCH_ALL_SUBMISSIONS_START });

    const res = agent.get(
      `/submission?account_id=${accountId}&problem_id=${problemId}&language_id=${languageId}`,
      config,
    );

    dispatch({
      type: submissionConstants.FETCH_ALL_SUBMISSIONS_SUCCESS,
      payload: {
        accountId,
        problemId,
        languageId,
        data: res.data.data.data,
      },
    });
  } catch (error) {
    console.log(error);
    dispatch({
      type: submissionConstants.FETCH_ALL_SUBMISSIONS_FAIL,
      error,
    });
  }
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

    // Batch browse account
    const accountIds = data.map((item) => item.account_id);
    let res2 = null;
    if (accountIds.length !== 0) {
      const config2 = {
        headers: { 'auth-token': token },
        params: { account_ids: JSON.stringify(accountIds) },
      };

      res2 = await agent.get('/account-summary/batch', config2);
    }

    const config3 = {
      headers: { 'auth-token': token },
    };
    // use submission id to get status
    const res3 = await Promise.all(
      data.map(async ({ id }) => agent
        .get(`/submission/${id}/judgment`, config3)
        .then((res4) => res4.data.data)
        .catch((error) => {
          dispatch({
            type: submissionConstants.FETCH_SUBMISSIONS_FAIL,
            error,
          });
        })),
    );
    const judgments = res3.flat().filter((item) => item !== null && item !== undefined);

    dispatch({
      type: submissionConstants.FETCH_SUBMISSIONS_SUCCESS,
      payload: {
        classId,
        data,
        judgments,
        accounts: res2 ? res2.data.data : [],
      },
    });

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
      error,
    });
  }
};

const fetchSubmission = (token, submissionId) => (dispatch) => {
  const config = {
    headers: {
      'auth-token': token,
    },
  };
  dispatch({ type: submissionConstants.FETCH_SUBMISSION_START });

  agent
    .get(`/submission/${submissionId}`, config)
    .then((res) => {
      if (res.data.success) {
        if (res.data.data.content_file_uuid !== null && res.data.data.filename !== null) {
          const config = {
            headers: {
              'auth-token': token,
            },
            params: {
              filename: res.data.data.filename,
              as_attachment: false,
            },
          };
          agent.get(`/s3-file/${res.data.data.content_file_uuid}/url`, config).then((res2) => {
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
    .catch((error) => {
      dispatch({
        type: submissionConstants.FETCH_SUBMISSION_FAIL,
        error,
      });
    });
};

const addSubmission = (token, problemId, languageId, body) => (dispatch) => {
  const config = {
    headers: {
      'auth-token': token,
    },
  };
  dispatch({ type: submissionConstants.ADD_SUBMISSION_START });

  agent
    .post(`/problem/${problemId}/submission?language_id=${languageId}`, body, config)
    .then((res) => {
      dispatch({
        type: submissionConstants.ADD_SUBMISSION_SUCCESS,
        payload: { submissionId: res.data.data.id },
      });
    })
    .catch((error) => {
      dispatch({
        type: submissionConstants.ADD_SUBMISSION_FAIL,
        error,
      });
    });
};

const fetchJudgement = (token, submissionId) => (dispatch) => {
  const config = {
    headers: {
      'auth-token': token,
    },
  };
  dispatch({ type: submissionConstants.FETCH_JUDGEMENT_START });

  agent
    .get(`/submission/${submissionId}/judgment`, config)
    .then((res) => {
      dispatch({
        type: submissionConstants.FETCH_JUDGEMENT_SUCCESS,
        payload: { submissionId, data: res.data.data },
      });
    })
    .catch((error) => {
      dispatch({
        type: submissionConstants.FETCH_JUDGEMENT_FAIL,
        error,
      });
    });
};

const readSubmissionDetail = (token, submissionId) => async (dispatch) => {
  dispatch({ type: submissionConstants.READ_SUBMISSION_JUDGE_START });
  const config = {
    headers: {
      'auth-token': token,
    },
  };

  try {
    const judgment = await agent.get(`/submission/${submissionId}/latest-judgment`, config);

    dispatch({
      type: submissionConstants.READ_SUBMISSION_JUDGE_SUCCESS,
      payload: judgment.data.data,
    });
  } catch (error) {
    dispatch({
      type: submissionConstants.READ_SUBMISSION_JUDGE_FAIL,
      error,
    });
  }
};

const browseJudgeCases = (token, judgmentId) => async (dispatch) => {
  dispatch({ type: submissionConstants.BROWSE_JUDGE_CASES_START });
  const config = {
    headers: {
      'auth-token': token,
    },
  };
  try {
    const res = await agent.get(`/judgment/${judgmentId}/judge-case`, config);

    dispatch({
      type: submissionConstants.BROWSE_JUDGE_CASES_SUCCESS,
      payload: res.data.data,
    });
  } catch (error) {
    dispatch({
      type: submissionConstants.BROWSE_JUDGE_CASES_FAIL,
      error,
    });
  }
};

const readTestcase = (token, testcaseId) => async (dispatch) => {
  dispatch({ type: submissionConstants.READ_TESTCASE_START });
  const config = {
    headers: {
      'auth-token': token,
    },
  };
  try {
    const res = await agent.get(`/testcase/${testcaseId}`, config);

    dispatch({
      type: submissionConstants.READ_TESTCASE_SUCCESS,
      payload: res.data.data,
    });
  } catch (error) {
    dispatch({
      type: submissionConstants.READ_TESTCASE_FAIL,
      error,
    });
  }
};

const getAccountBatch = (token, accountId) => async (dispatch) => {
  dispatch({ type: submissionConstants.GET_ACCOUNT_BATCH_START });
  const config = {
    headers: { 'auth-token': token },
    params: { account_ids: JSON.stringify([accountId]) },
  };
  try {
    const res = await agent.get('/account-summary/batch', config);

    dispatch({
      type: submissionConstants.GET_ACCOUNT_BATCH_SUCCESS,
      payload: { data: res.data.data[0], accountId },
    });
  } catch (error) {
    dispatch({
      type: submissionConstants.GET_ACCOUNT_BATCH_FAIL,
      error,
    });
  }
};

export {
  fetchAllSubmissions,
  fetchClassSubmissions,
  fetchSubmission,
  addSubmission,
  fetchJudgement,
  readSubmissionDetail,
  browseJudgeCases,
  readTestcase,
  getAccountBatch,
};
