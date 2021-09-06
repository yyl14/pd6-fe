import agent from '../agent';
import { commonConstants } from './constant';
import { autoTableConstants } from '../component/constant';
import browseParamsTransForm from '../../function/browseParamsTransform';

const getInstitutes = () => (dispatch) => {
  dispatch({ type: commonConstants.GET_INSTITUTE_START });

  agent
    .get('/institute')
    .then((res) => {
      dispatch({
        type: commonConstants.GET_INSTITUTE_SUCCESS,
        payload: res.data.data,
      });
    })
    .catch((error) => {
      dispatch({
        type: commonConstants.GET_INSTITUTE_FAIL,
        error,
      });
    });
};

const fetchClassMembers = (token, classId, browseParams, tableId = null) => async (dispatch) => {
  try {
    const config = {
      headers: {
        'auth-token': token,
      },
      params: browseParamsTransForm(browseParams),
    };
    dispatch({ type: commonConstants.FETCH_CLASS_MEMBERS_START });
    const res = await agent.get(`/class/${classId}/member`, config);
    const { data, total_count } = res.data.data;

    dispatch({
      type: commonConstants.FETCH_CLASS_MEMBERS_SUCCESS,
      payload: {
        classId,
        data: res.data.data.data,
      },
    });
    dispatch({
      type: autoTableConstants.AUTO_TABLE_UPDATE,
      payload: {
        tableId,
        totalCount: total_count,
        dataIds: data.map((item) => item.member_id),
        offset: browseParams.offset,
      },
    });
  } catch (error) {
    dispatch({
      type: commonConstants.FETCH_CLASS_MEMBERS_FAIL,
      error,
    });
  }
};

const fetchClassMemberWithAccountReferral = (token, classId) => async (dispatch) => {
  try {
    const config = {
      headers: {
        'auth-token': token,
      },
    };
    dispatch({ type: commonConstants.FETCH_CLASS_MEMBER_WITH_ACCOUNT_REFERRAL_START });
    const res = await agent.get(`/class/${classId}/member/account-referral`, config);
    dispatch({
      type: commonConstants.FETCH_CLASS_MEMBER_WITH_ACCOUNT_REFERRAL_SUCCESS,
      payload: { classId, data: res.data.data.data },
    });
  } catch (error) {
    dispatch({
      type: commonConstants.FETCH_CLASS_MEMBER_WITH_ACCOUNT_REFERRAL_FAIL,
      error,
    });
  }
};

const editClassMember = (token, classId, editedList) => (dispatch) => {
  const config = {
    headers: {
      'auth-token': token,
    },
  };
  dispatch({ type: commonConstants.EDIT_CLASS_MEMBER_START });

  agent
    .patch(`/class/${classId}/member`, editedList, config)
    .then(() => {
      dispatch({
        type: commonConstants.EDIT_CLASS_MEMBER_SUCCESS,
      });
    })
    .catch((error) => {
      dispatch({
        type: commonConstants.EDIT_CLASS_MEMBER_FAIL,
        error,
      });
    });
};

const replaceClassMembers = (token, classId, replacingList) => async (dispatch) => {
  try {
    const config = {
      headers: {
        'auth-token': token,
      },
    };
    dispatch({ type: commonConstants.REPLACE_CLASS_MEMBERS_START });

    const res = await agent.put(`/class/${classId}/member`, replacingList, config);
    if (res.data.success) {
      dispatch({
        type: commonConstants.REPLACE_CLASS_MEMBERS_SUCCESS,
      });
    } else {
      dispatch({
        type: commonConstants.REPLACE_CLASS_MEMBERS_FAIL,
        error: res.data.error,
      });
    }
  } catch (error) {
    dispatch({
      type: commonConstants.REPLACE_CLASS_MEMBERS_FAIL,
      error,
    });
  }
};

// const deleteClassMember = (token, classId, memberId) => (dispatch) => {
//   const config = {
//     headers: {
//       'auth-token': token,
//     },
//   };
//   dispatch({ type: commonConstants.DELETE_CLASS_MEMBER_START });

//   agent
//     .delete(`/class/${classId}/member/${memberId}`, config)
//     .then((res) => {
//       dispatch({
//         type: commonConstants.DELETE_CLASS_MEMBER_SUCCESS,
//       });
//     })
//     .catch((error) => {
//       dispatch({
//         type: commonConstants.DELETE_CLASS_MEMBER_FAIL,
//         error,
//       });
//     });
// };

const browseSubmitLang = (token) => async (dispatch) => {
  try {
    const config = {
      headers: {
        'auth-token': token,
      },
    };
    dispatch({ type: commonConstants.BROWSE_SUBMISSION_LANG_START });
    const submitLang = await agent.get('/submission/language', config);
    dispatch({
      type: commonConstants.BROWSE_SUBMISSION_LANG_SUCCESS,
      payload: submitLang.data.data,
    });
  } catch (error) {
    dispatch({
      type: commonConstants.BROWSE_SUBMISSION_LANG_FAIL,
      error,
    });
  }
};

const fetchCourse = (token, courseId) => async (dispatch) => {
  try {
    const config = {
      headers: {
        'auth-token': token,
      },
    };
    dispatch({ type: commonConstants.FETCH_COURSE_START });
    const res = await agent.get(`/course/${courseId}`, config);
    dispatch({ type: commonConstants.FETCH_COURSE_SUCCESS, payload: res.data.data });
  } catch (error) {
    dispatch({
      type: commonConstants.FETCH_COURSE_FAIL,
      error,
    });
  }
};

const fetchAllClasses = (token) => async (dispatch) => {
  try {
    const config = {
      headers: {
        'auth-token': token,
      },
    };
    dispatch({ type: commonConstants.FETCH_ALL_CLASSES_START });
    const res = await agent.get('/class', config);
    if (!res.data.success) {
      throw new Error(res.data.error);
    }
    dispatch({ type: commonConstants.FETCH_ALL_CLASSES_SUCCESS, payload: res.data.data.data });
  } catch (error) {
    dispatch({
      type: commonConstants.FETCH_ALL_CLASSES_FAIL,
      error,
    });
  }
};

const fetchClass = (token, classId) => async (dispatch) => {
  try {
    const config = {
      headers: {
        'auth-token': token,
      },
    };
    dispatch({ type: commonConstants.FETCH_CLASS_START });
    const res = await agent.get(`/class/${classId}`, config);
    dispatch({ type: commonConstants.FETCH_CLASS_SUCCESS, payload: res.data.data });
  } catch (error) {
    dispatch({
      type: commonConstants.FETCH_CLASS_FAIL,
      error,
    });
  }
};

const fetchChallenge = (token, challengeId) => async (dispatch) => {
  dispatch({ type: commonConstants.READ_CHALLENGE_START });
  const config = {
    headers: {
      'auth-token': token,
    },
  };
  try {
    const challenge = await agent.get(`/challenge/${challengeId}`, config);

    dispatch({
      type: commonConstants.READ_CHALLENGE_SUCCESS,
      payload: challenge.data.data,
    });
  } catch (error) {
    dispatch({
      type: commonConstants.READ_CHALLENGE_FAIL,
      error,
    });
  }
};

const fetchAccount = (token, accountId) => async (dispatch) => {
  try {
    const config = {
      headers: {
        'auth-token': token,
      },
    };
    dispatch({ type: commonConstants.FETCH_ACCOUNT_START });
    const res = await agent.get(`/account/${accountId}`, config);
    dispatch({ type: commonConstants.FETCH_ACCOUNT_SUCCESS, payload: res.data.data });
  } catch (error) {
    dispatch({
      type: commonConstants.FETCH_ACCOUNT_FAIL,
      error,
    });
  }
};

const downloadFile = (token, file) => async (dispatch) => {
  // in each file, you should contain uuid, filename, and as_attachment
  const config = {
    headers: {
      'auth-token': token,
    },
    params: {
      filename: file.filename,
      as_attachment: file.as_attachment,
    },
  };
  try {
    dispatch({ type: commonConstants.DOWNLOAD_FILE_START });
    const res = await agent.get(`/s3-file/${file.uuid}/url`, config);
    if (res.data.success) {
      fetch(res.data.data.url).then((t) => t.blob().then((b) => {
        const a = document.createElement('a');
        a.href = URL.createObjectURL(b);
        a.setAttribute('download', file.filename);
        a.click();
      }));

      dispatch({
        type: commonConstants.DOWNLOAD_FILE_SUCCESS,
      });
    } else {
      dispatch({
        type: commonConstants.DOWNLOAD_FILE_FAIL,
        error: res.data.error,
      });
    }
  } catch (error) {
    dispatch({
      type: commonConstants.DOWNLOAD_FILE_FAIL,
      error,
    });
  }
};

const fetchDownloadFileUrl = (token, file) => async (dispatch) => {
  const config = {
    headers: {
      'auth-token': token,
    },
    params: {
      filename: file.filename,
      as_attachment: file.as_attachment,
    },
  };
  try {
    dispatch({ type: commonConstants.FETCH_DOWNLOAD_FILE_URL_START });
    const res = await agent.get(`/s3-file/${file.uuid}/url`, config);
    if (res.data.success) {
      dispatch({
        type: commonConstants.FETCH_DOWNLOAD_FILE_URL_SUCCESS,
        payload: { uuid: file.uuid, url: res.data.data.url },
      });
    } else {
      dispatch({
        type: commonConstants.FETCH_DOWNLOAD_FILE_URL_FAIL,
        error: res.data.error,
      });
    }
  } catch (error) {
    dispatch({
      type: commonConstants.FETCH_DOWNLOAD_FILE_URL_FAIL,
      error,
    });
  }
};

const fetchAllChallengesProblems = (token, classId) => async (dispatch) => {
  dispatch({ type: commonConstants.FETCH_ALL_CHALLENGES_PROBLEMS_START });
  const config = {
    headers: {
      'auth-token': token,
    },
  };

  try {
    const res = await agent.get(`/class/${classId}/challenge`, config);
    const problems = await Promise.all(
      res.data.data.data.map(async ({ id }) => agent
        .get(`/challenge/${id}/task`, config)
        .then((res2) => res2.data.data.problem)
        .catch((error) => {
          dispatch({
            type: commonConstants.FETCH_ALL_CHALLENGES_PROBLEMS_FAIL,
            payload: err,
          });
        })),
    );
    const newProblems = problems.flat();
    dispatch({
      type: commonConstants.FETCH_ALL_CHALLENGES_PROBLEMS_SUCCESS,
      payload: { classId, challenges: res.data.data.data, problems: newProblems },
    });
  } catch (error) {
    dispatch({
      type: commonConstants.FETCH_ALL_CHALLENGES_PROBLEMS_FAIL,
      error,
    });
  }
};

export {
  getInstitutes,
  fetchClassMembers,
  fetchClassMemberWithAccountReferral,
  editClassMember,
  replaceClassMembers,
  fetchAllClasses,
  fetchCourse,
  fetchClass,
  fetchChallenge,
  fetchAccount,
  browseSubmitLang,
  downloadFile,
  fetchDownloadFileUrl,
  fetchAllChallengesProblems,
};
