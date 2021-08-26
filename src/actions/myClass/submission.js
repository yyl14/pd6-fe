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
    console.log(browseParams);
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

    // const accounts = await Promise.all(
    //   data.map(async ({ account_id }) => agent
    //     .get(`/account/${account_id}`, config2)
    //     .then((res2) => res2.data.data)
    //     .catch((err) => {
    //       dispatch({
    //         type: submissionConstants.FETCH_ACCESS_LOG_FAIL,
    //         payload: err,
    //       });
    //     })),
    // );

    // TODO: use problem id to read problem info
    // const problems = await Promise.all(
    //   data.map(async ({ problem_id }) => agent
    //     .get(`/problem/${problem_id}`, config2)
    //     .then((res3) => res3.data.data)
    //     .catch((err) => {
    //       dispatch({
    //         type: submissionConstants.FETCH_ACCESS_LOG_FAIL,
    //         payload: err,
    //       });
    //     })),
    // );
    // TODO: use submission id to get status
    const judgments = await Promise.all(
      data.map(async ({ id }) => agent
        .get(`/submission/${id}/latest-judgment`, config2)
        .then((res4) => res4.data.data)
        .catch((err) => {
          dispatch({
            type: submissionConstants.FETCH_ACCESS_LOG_FAIL,
            payload: err,
          });
        })),
    );

    dispatch({
      type: submissionConstants.FETCH_SUBMISSIONS_SUCCESS,
      payload: {
        data, judgments: judgments.filter((item) => item !== null),
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
      type: submissionConstants.FETCH_ACCESS_LOG_FAIL,
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

export {
  fetchAllSubmissions, fetchClassSubmissions, fetchSubmission, addSubmission, fetchJudgement,
};
