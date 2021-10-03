import browseParamsTransForm from '../../function/browseParamsTransform';
import agent from '../agent';
import { viewConstants } from './constant';
import { autoTableConstants } from '../component/constant';

const browseAccessLog = (token, browseParams, tableId = null) => async (dispatch) => {
  try {
    const config = {
      headers: {
        'auth-token': token,
      },
      params: browseParamsTransForm(browseParams),
    };
    dispatch({ type: viewConstants.BROWSE_ACCESS_LOG_START });
    const res = await agent.get('/view/access-log', config);
    const { data, total_count } = res.data.data;
    dispatch({
      type: viewConstants.BROWSE_ACCESS_LOG_SUCCESS,
      payload: {
        data: {
          accessLogs: data.map(({
            access_log_id, account_id, resource_path, request_method, access_time, ip,
          }) => ({
            id: access_log_id,
            account_id,
            resource_path,
            request_method,
            access_time,
            ip,
          })),
          accounts: data.map(({
            account_id, student_id, username, real_name,
          }) => ({
            id: account_id,
            username,
            student_id,
            real_name,
          })),
        },
      },
    });
    dispatch({
      type: autoTableConstants.AUTO_TABLE_UPDATE,
      payload: {
        tableId,
        totalCount: total_count,
        dataIds: data.map((item) => item.access_log_id),
        offset: browseParams.offset,
      },
    });
  } catch (error) {
    dispatch({
      type: viewConstants.BROWSE_ACCOUNT_WITH_DEFAULT_STUDENT_ID_FAIL,
      error,
    });
  }
};

const browseAccountWithDefaultStudentId = (token, browseParams, tableId = null) => async (dispatch) => {
  try {
    const config = {
      headers: {
        'auth-token': token,
      },
      params: browseParamsTransForm(browseParams),
    };
    dispatch({ type: viewConstants.BROWSE_ACCOUNT_WITH_DEFAULT_STUDENT_ID_START });
    const res = await agent.get('/view/account', config);
    const { data, total_count } = res.data.data;
    dispatch({
      type: viewConstants.BROWSE_ACCOUNT_WITH_DEFAULT_STUDENT_ID_SUCCESS,
      payload: {
        data: {
          accounts: data.map(({
            account_id, username, real_name, student_id,
          }) => ({
            id: account_id,
            username,
            real_name,
            student_id,
          })),
        },
      },
    });
    dispatch({
      type: autoTableConstants.AUTO_TABLE_UPDATE,
      payload: {
        tableId,
        totalCount: total_count,
        dataIds: data.map((item) => item.account_id),
        offset: browseParams.offset,
      },
    });
  } catch (error) {
    dispatch({
      type: viewConstants.BROWSE_ACCOUNT_WITH_DEFAULT_STUDENT_ID_FAIL,
      error,
    });
  }
};

const browseClassMember = (token, classId, browseParams, tableId = null) => async (dispatch) => {
  try {
    const config = {
      headers: {
        'auth-token': token,
      },
      params: browseParamsTransForm(browseParams),
    };
    dispatch({ type: viewConstants.BROWSE_CLASS_MEMBER_START });
    const res = await agent.get(`/class/${classId}/view/member`, config);
    const { data, total_count } = res.data.data;
    dispatch({
      type: viewConstants.BROWSE_CLASS_MEMBER_SUCCESS,
      payload: {
        data: {
          classMembers: data.map(({
            account_id, class_id, role, abbreviated_name,
          }) => ({
            id: `${class_id}-${account_id}`,
            account_id,
            class_id,
            role,
            institute_abbreviated_name: abbreviated_name,
          })),
          accounts: data.map(({
            account_id, username, real_name, student_id,
          }) => ({
            id: account_id,
            username,
            real_name,
            student_id,
          })),
        },
        classId,
      },
    });
    dispatch({
      type: autoTableConstants.AUTO_TABLE_UPDATE,
      payload: {
        tableId,
        totalCount: total_count,
        dataIds: data.map((item) => `${item.class_id}-${item.account_id}`),
        offset: browseParams.offset,
      },
    });
  } catch (error) {
    dispatch({
      type: viewConstants.BROWSE_CLASS_MEMBER_FAIL,
      error,
    });
  }
};

const browseSubmissionUnderClass = (token, classId, browseParams, tableId = null) => async (dispatch) => {
  try {
    const config = {
      headers: {
        'auth-token': token,
      },
      params: browseParamsTransForm(browseParams),
    };
    dispatch({ type: viewConstants.BROWSE_SUBMISSION_UNDER_CLASS_START });
    const res = await agent.get(`/class/${classId}/view/submission`, config);
    const { data, total_count } = res.data.data;
    dispatch({
      type: viewConstants.BROWSE_SUBMISSION_UNDER_CLASS_SUCCESS,
      payload: {
        data: {
          submissions: data.map(({
            submission_id, account_id, challenge_id, problem_id, verdict, submit_time,
          }) => ({
            id: submission_id,
            account_id,
            challenge_id,
            problem_id,
            verdict,
            submit_time,
          })),
          accounts: data.map(({
            account_id, username, real_name, student_id,
          }) => ({
            id: account_id,
            username,
            real_name,
            student_id,
          })),
          challenges: data.map(({ challenge_id, challenge_title }) => ({
            id: challenge_id,
            title: challenge_title,
          })),
        },
        classId,
      },
    });
    dispatch({
      type: autoTableConstants.AUTO_TABLE_UPDATE,
      payload: {
        tableId,
        totalCount: total_count,
        dataIds: data.map((item) => item.submission_id),
        offset: browseParams.offset,
      },
    });
  } catch (error) {
    dispatch({
      type: viewConstants.BROWSE_SUBMISSION_UNDER_CLASS_FAIL,
      error,
    });
  }
};

const browseMySubmission = (token, accountId, browseParams, tableId = null) => async (dispatch) => {
  try {
    const temp = {
      ...browseParams,
      account_id: accountId,
    };
    const config = {
      headers: {
        'auth-token': token,
      },
      params: browseParamsTransForm(temp),
    };
    dispatch({ type: viewConstants.BROWSE_MYSUBMISSION_START });
    const res = await agent.get('/view/my-submission', config);
    const { data, total_count } = res.data.data;
    dispatch({
      type: viewConstants.BROWSE_MYSUBMISSION_SUCCESS,
      payload: {
        data: {
          submissions: data.map(
            ({
              submission_id, course_id, class_id, challenge_id, problem_id, verdict, submit_time,
            }) => ({
              id: submission_id,
              course_id,
              class_id,
              challenge_id,
              problem_id,
              verdict,
              submit_time,
            }),
          ),
          courses: data
            .map(({ course_id, course_name }) => ({
              id: course_id,
              name: course_name,
            }))
            .filter((item) => item.id !== null),
          classes: data
            .map(({ class_id, class_name }) => ({
              id: class_id,
              name: class_name,
            }))
            .filter((item) => item.id !== null),
          challenges: data
            .map(({ challenge_id, challenge_title }) => ({
              id: challenge_id,
              title: challenge_title,
            }))
            .filter((item) => item.id !== null),
          problems: data
            .map(({ problem_id, challenge_label }) => ({
              id: problem_id,
              challenge_label,
            }))
            .filter((item) => item.id !== null),
        },
      },
    });
    dispatch({
      type: autoTableConstants.AUTO_TABLE_UPDATE,
      payload: {
        tableId,
        totalCount: total_count,
        dataIds: data.map((item) => item.submission_id),
        offset: browseParams.offset,
      },
    });
  } catch (error) {
    dispatch({
      type: viewConstants.BROWSE_MYSUBMISSION_FAIL,
      error,
    });
  }
};

export {
  browseAccessLog,
  browseAccountWithDefaultStudentId,
  browseClassMember,
  browseSubmissionUnderClass,
  browseMySubmission,
};
