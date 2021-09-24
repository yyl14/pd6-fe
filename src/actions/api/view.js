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
            access_log_id, account_id, resource_path, request_method, access_time,
          }) => ({
            id: access_log_id,
            account_id,
            resource_path,
            request_method,
            access_time,
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
        dataIds: data.map((item) => item.submission_id),
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
      type: viewConstants.BROWSE_CLASS_MEMBER_START,
      data: {
        classMembers: data.map(({
          account_id, class_id, role, abbreviated_name,
        }) => ({
          id: `${class_id}-${account_id}`,
          account_id,
          class_id,
          role,
          abbreviated_name,
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

export default {
  browseAccessLog,
  browseAccountWithDefaultStudentId,
  browseClassMember,
  browseSubmissionUnderClass,
};
