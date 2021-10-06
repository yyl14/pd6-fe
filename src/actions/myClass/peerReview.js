import agent from '../agent';
import { peerReviewConstants } from '../api/constant';
import { readPeerReviewRecord } from '../api/peerReview';
// import { autoTableConstants } from '../component/constant';
// import browseParamsTransForm from '../../function/browseParamsTransform';
import { readAccount } from '../user/user';
import getTextFromUrl from '../../function/getTextFromUrl';

export const readPeerReviewRecordWithCode = (token, peerReviewRecordId) => async (dispatch) => {
  try {
    const config = { headers: { 'auth-token': token } };
    dispatch({ type: peerReviewConstants.READ_PEER_REVIEW_RECORD_START });
    const res = await agent.get(`peer-review-record/${peerReviewRecordId}`, config);
    if (res.data.data.grader_id !== null && res.data.data.grader_id !== undefined) {
      dispatch(readAccount(token, res.data.data.grader_id));
    }
    if (res.data.data.receiver_id !== null && res.data.data.receiver_id !== undefined) {
      dispatch(readAccount(token, res.data.data.receiver_id));
    }

    const config2 = {
      headers: {
        'auth-token': token,
      },
      params: {
        filename: res.data.data.filename,
        as_attachment: false,
      },
    };
    const res1 = await agent.get(`/s3-file/${res.data.data.file_uuid}/url`, config2);
    if (res1.data.success) {
      const code = await getTextFromUrl(res1.data.data.url);
      dispatch({
        type: peerReviewConstants.READ_PEER_REVIEW_RECORD_SUCCESS,
        payload: { ...res.data.data, code },
      });
    } else {
      dispatch({
        type: peerReviewConstants.READ_PEER_REVIEW_RECORD_SUCCESS,
        payload: res.data.data,
      });
    }
  } catch (error) {
    dispatch({
      type: peerReviewConstants.READ_PEER_REVIEW_RECORD_FAIL,
      error,
    });
  }
};

export const browseAccountReviewedPeerReviewRecordWithReading = (token, peerReviewId, accountId) => async (dispatch) => {
  try {
    const config = { headers: { 'auth-token': token } };
    dispatch({ type: peerReviewConstants.BROWSE_ACCOUNT_REVIEWED_PEER_REVIEW_RECORD_START });
    const res = await agent.get(`peer-review/${peerReviewId}/account/${accountId}/review`, config);

    await Promise.all(
      res.data.data.map(async (id) => {
        dispatch(readPeerReviewRecord(token, id));
        return id;
      }),
    );

    dispatch({
      type: peerReviewConstants.BROWSE_ACCOUNT_REVIEWED_PEER_REVIEW_RECORD_SUCCESS,
      payload: { peerReviewId, reviewIds: res.data.data },
    });
  } catch (error) {
    dispatch({
      type: peerReviewConstants.BROWSE_ACCOUNT_REVIEWED_PEER_REVIEW_RECORD_FAIL,
      error,
    });
  }
};

export const getTargetProblemChallengeId = (token, peerReviewId, problemId) => async (dispatch) => {
  const config = {
    headers: {
      'auth-token': token,
    },
  };

  try {
    dispatch({ type: peerReviewConstants.GET_TARGET_PROBLEM_CHALLENGE_ID_START });
    const res = await agent.get(`/problem/${problemId}`, config);
    dispatch({
      type: peerReviewConstants.GET_TARGET_PROBLEM_CHALLENGE_ID_SUCCESS,
      payload: { peerReviewId, target_challenge_id: res.data.data.challenge_id },
    });
  } catch (error) {
    dispatch({
      type: peerReviewConstants.GET_TARGET_PROBLEM_CHALLENGE_ID_FAIL,
      error,
    });
  }
};

export const readPeerReviewWithProblem = (token, peerReviewId) => async (dispatch) => {
  try {
    const config = { headers: { 'auth-token': token } };
    dispatch({ type: peerReviewConstants.READ_PEER_REVIEW_WITH_PROBLEM_START });
    const res = await agent.get(`peer-review/${peerReviewId}`, config);
    const res2 = await agent.get(`/problem/${res.data.data.target_problem_id}`, config);
    const res3 = await agent.get(`/challenge/${res2.data.data.challenge_id}`, config);

    dispatch({
      type: peerReviewConstants.READ_PEER_REVIEW_WITH_PROBLEM_SUCCESS,
      payload: { peerReview: { ...res.data.data, target_challenge_id: res2.data.data.challenge_id }, problem: res2.data.data, challenge: res3.data.data },
    });
  } catch (error) {
    dispatch({
      type: peerReviewConstants.READ_PEER_REVIEW_WITH_PROBLEM_FAIL,
      error,
    });
  }
};
