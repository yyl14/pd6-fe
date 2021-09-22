import agent from '../agent';
import { submissionConstants } from './constant';
import { autoTableConstants } from '../component/constant';
import browseParamsTransForm from '../../function/browseParamsTransform';
import getTextFromUrl from '../../function/getTextFromUrl';

// WITH BROWSE PARAMS
const fetchClassSubmissions = (token, browseParams, tableId = null, classId) => async (dispatch) => {
  try {
    const config1 = {
      headers: {
        'auth-token': token,
      },
      params: browseParamsTransForm(browseParams),
    };
    dispatch({
      type: submissionConstants.FETCH_SUBMISSIONS_START,
    });

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

    // Batch browse account
    const accountIds = data.map((item) => item.account_id);

    const config2 = {
      headers: { 'auth-token': token },
      params: { account_ids: JSON.stringify(accountIds) },
    };

    const res2 = await agent.get('/account-summary/batch', config2);

    const config3 = {
      headers: { 'auth-token': token },
    };
    // use submission id to get status
    const res3 = await Promise.all(
      data.map(async ({ id }) => agent.get(`/submission/${id}/judgment`, config3).then((res4) => res4.data.data)),
    );

    const judgments = res3.flat().filter((item) => item !== null && item !== undefined);

    dispatch({
      type: submissionConstants.FETCH_SUBMISSIONS_SUCCESS,
      payload: {
        classId,
        data,
        judgments,
        accounts: res2.data.data,
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
  const config1 = {
    headers: {
      'auth-token': token,
    },
  };
  dispatch({ type: submissionConstants.FETCH_SUBMISSION_START });

  agent
    .get(`/submission/${submissionId}`, config1)
    .then((res) => {
      if (res.data.data.content_file_uuid !== null && res.data.data.filename !== null) {
        const config2 = {
          headers: {
            'auth-token': token,
          },
          params: {
            filename: res.data.data.filename,
            as_attachment: false,
          },
        };
        agent.get(`/s3-file/${res.data.data.content_file_uuid}/url`, config2).then(async (res2) => {
          const code = await getTextFromUrl(res2.data.data.url);

          dispatch({
            type: submissionConstants.FETCH_SUBMISSION_SUCCESS,
            payload: { submissionId, data: { ...res.data.data, content: code } },
          });
        });
      } else {
        dispatch({
          type: submissionConstants.FETCH_SUBMISSION_SUCCESS,
          payload: { submissionId, data: res.data.data },
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

// const fetchJudgement = (token, submissionId) => (dispatch) => {
//   const config = {
//     headers: {
//       'auth-token': token,
//     },
//   };
//   dispatch({ type: submissionConstants.FETCH_JUDGEMENT_START });

//   agent
//     .get(`/submission/${submissionId}/judgment`, config)
//     .then((res) => {
//       dispatch({
//         type: submissionConstants.FETCH_JUDGEMENT_SUCCESS,
//         payload: { submissionId, data: res.data.data },
//       });
//     })
//     .catch((error) => {
//       dispatch({
//         type: submissionConstants.FETCH_JUDGEMENT_FAIL,
//         error,
//       });
//     });
// };

// fetch latest judgement
const readSubmissionDetail = (token, submissionId) => async (dispatch) => {
  const config = {
    headers: {
      'auth-token': token,
    },
  };

  try {
    dispatch({ type: submissionConstants.READ_SUBMISSION_JUDGE_START });
    const res = await agent.get(`/submission/${submissionId}/latest-judgment`, config);

    dispatch({
      type: submissionConstants.READ_SUBMISSION_JUDGE_SUCCESS,
      payload: res.data.data,
    });
  } catch (error) {
    dispatch({
      type: submissionConstants.READ_SUBMISSION_JUDGE_FAIL,
      error,
    });
  }
};

// browse judge cases under judgement
const browseJudgeCases = (token, judgmentId) => async (dispatch) => {
  const config = {
    headers: {
      'auth-token': token,
    },
  };
  try {
    dispatch({ type: submissionConstants.BROWSE_JUDGE_CASES_START });
    const res = await agent.get(`/judgment/${judgmentId}/judge-case`, config);
    dispatch({
      type: submissionConstants.BROWSE_JUDGE_CASES_SUCCESS,
      payload: { judgmentId, data: res.data.data },
    });
  } catch (error) {
    dispatch({
      type: submissionConstants.BROWSE_JUDGE_CASES_FAIL,
      error,
    });
  }
};

const browseTestcases = (token, problemId) => async (dispatch) => {
  const config = {
    headers: {
      'auth-token': token,
    },
  };
  try {
    dispatch({ type: submissionConstants.BROWSE_TESTCASES_START });
    const res = await agent.get(`/problem/${problemId}/testcase`, config);
    dispatch({
      type: submissionConstants.BROWSE_TESTCASES_SUCCESS,
      payload: { problemId, testcases: res.data.data },
    });
  } catch (error) {
    dispatch({
      type: submissionConstants.BROWSE_TESTCASES_FAIL,
      error,
    });
  }
};

const rejudgeSubmission = (token, submissionId) => async (dispatch) => {
  const config = {
    headers: {
      'auth-token': token,
    },
  };
  dispatch({ type: submissionConstants.REJUDGE_SUBMISSION_START });
  try {
    await agent.post(`/submission/${submissionId}/rejudge`, {}, config);

    dispatch({ type: submissionConstants.REJUDGE_SUBMISSION_SUCCESS });
  } catch (error) {
    dispatch({
      type: submissionConstants.REJUDGE_SUBMISSION_FAIL,
      error,
    });
  }
};

export {
  fetchClassSubmissions,
  fetchSubmission,
  // fetchJudgement,
  readSubmissionDetail,
  browseJudgeCases,
  browseTestcases,
  rejudgeSubmission,
};
