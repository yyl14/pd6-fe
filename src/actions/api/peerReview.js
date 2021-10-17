import agent from '../agent';
import { peerReviewConstants, viewConstants } from './constant';
// import { autoTableConstants } from '../component/constant';
// import browseParamsTransForm from '../../function/browseParamsTransform';
// import { readAccount } from '../user/user';
import { browseTasksUnderChallenge } from '../myClass/challenge';

export const readPeerReview = (token, peerReviewId) => async (dispatch) => {
  try {
    const config = { headers: { 'auth-token': token } };
    dispatch({ type: peerReviewConstants.READ_PEER_REVIEW_START });
    const res = await agent.get(`peer-review/${peerReviewId}`, config);

    dispatch({
      type: peerReviewConstants.READ_PEER_REVIEW_SUCCESS,
      payload: res.data.data,
    });
  } catch (error) {
    dispatch({
      type: peerReviewConstants.READ_PEER_REVIEW_FAIL,
      error,
    });
  }
};

export const deletePeerReview = (token, peerReviewId, challengeId) => async (dispatch) => {
  try {
    const config = {
      headers: {
        'auth-token': token,
      },
    };
    dispatch({ type: peerReviewConstants.DELETE_PEER_REVIEW_START });
    await agent.delete(`peer-review/${peerReviewId}`, config);
    dispatch({ type: peerReviewConstants.DELETE_PEER_REVIEW_SUCCESS });
    dispatch(browseTasksUnderChallenge(token, challengeId));
  } catch (error) {
    dispatch({
      type: peerReviewConstants.DELETE_PEER_REVIEW_FAIL,
      error,
    });
  }
};

export const readPeerReviewRecord = (token, peerReviewRecordId) => async (dispatch) => {
  try {
    const config = { headers: { 'auth-token': token } };
    dispatch({ type: peerReviewConstants.READ_PEER_REVIEW_RECORD_START });
    const res = await agent.get(`peer-review-record/${peerReviewRecordId}`, config);
    dispatch({
      type: peerReviewConstants.READ_PEER_REVIEW_RECORD_SUCCESS,
      payload: res.data.data,
    });
  } catch (error) {
    dispatch({
      type: peerReviewConstants.READ_PEER_REVIEW_RECORD_FAIL,
      error,
    });
  }
};

export const editPeerReview = (token, peerReviewId, body) => async (dispatch) => {
  try {
    const config = {
      headers: {
        'auth-token': token,
      },
    };
    dispatch({ type: peerReviewConstants.EDIT_PEER_REVIEW_START });
    await agent.patch(`/peer-review/${peerReviewId}`, body, config);
    dispatch({ type: peerReviewConstants.EDIT_PEER_REVIEW_SUCCESS });
  } catch (error) {
    dispatch({
      type: peerReviewConstants.EDIT_PEER_REVIEW_FAIL,
    });
  }
};

export const browseAccountReviewedPeerReviewRecord = (token, peerReviewId, accountId) => async (dispatch) => {
  try {
    const config = { headers: { 'auth-token': token } };
    dispatch({ type: peerReviewConstants.BROWSE_ACCOUNT_REVIEWED_PEER_REVIEW_RECORD_START });
    const res = await agent.get(`peer-review/${peerReviewId}/account/${accountId}/review`, config);

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

export const browseAccountReceivedPeerReviewRecord = (token, peerReviewId, accountId) => async (dispatch) => {
  try {
    const config = { headers: { 'auth-token': token } };
    dispatch({ type: peerReviewConstants.BROWSE_ACCOUNT_RECEIVED_PEER_REVIEW_RECORD_START });
    const res = await agent.get(`peer-review/${peerReviewId}/account/${accountId}/receive`, config);

    dispatch({
      type: peerReviewConstants.BROWSE_ACCOUNT_RECEIVED_PEER_REVIEW_RECORD_SUCCESS,
      payload: { peerReviewId, receiveIds: res.data.data },
    });
  } catch (error) {
    dispatch({
      type: peerReviewConstants.BROWSE_ACCOUNT_RECEIVED_PEER_REVIEW_RECORD_FAIL,
      error,
    });
  }
};

export const submitPeerReviewRecord = (token, peerReviewRecordId, score, comment, onSuccess) => async (dispatch) => {
  try {
    const config = { headers: { 'auth-token': token } };
    const body = {
      score,
      comment,
    };
    dispatch({ type: peerReviewConstants.SUBMIT_PEER_REVIEW_RECORD_START });
    await agent.patch(`peer-review-record/${peerReviewRecordId}`, body, config);

    dispatch({ type: peerReviewConstants.SUBMIT_PEER_REVIEW_RECORD_SUCCESS });
    onSuccess();
  } catch (error) {
    dispatch({
      type: peerReviewConstants.SUBMIT_PEER_REVIEW_RECORD_FAIL,
      error,
    });
  }
};

export const assignPeerReviewRecord = (token, peerReviewId) => async (dispatch) => {
  try {
    const config = { headers: { 'auth-token': token } };
    dispatch({ type: peerReviewConstants.ASSIGN_PEER_REVIEW_RECORD_START });
    const res = await agent.post(`peer-review/${peerReviewId}/record`, {}, config);

    dispatch({
      type: peerReviewConstants.ASSIGN_PEER_REVIEW_RECORD_SUCCESS,
      payload: res.data.data,
    });
  } catch (error) {
    dispatch({
      type: peerReviewConstants.ASSIGN_PEER_REVIEW_RECORD_FAIL,
      error,
    });
  }
};

export const browseAllPeerReviewReceive = (token, peerReviewId) => async (dispatch) => {
  try {
    const limit = 100;
    const config = {
      headers: { 'auth-token': token },
      params: { limit },
    };
    // fetch first time to get total_count
    dispatch({ type: viewConstants.BROWSE_ALL_PEER_REVIEW_RECEIVE_START });
    const res = await agent.get(`/peer-review/${peerReviewId}/view/receiver-summary`, config);
    const { data, total_count } = res.data.data;
    dispatch({
      type: viewConstants.BROWSE_ALL_PEER_REVIEW_RECEIVE_SUCCESS,
      payload: {
        data: {
          peerReviewId,
          peerReviewSummary: data.map(
            ({
              account_id,
              username,
              real_name,
              student_id,
              peer_review_record_ids,
              peer_review_record_scores,
              average_score,
            }) => ({
              account_id,
              username,
              real_name,
              student_id,
              peer_review_record_ids,
              score: peer_review_record_scores,
              average_score,
            }),
          ),
        },
      },
    });
    // fetch all data
    const offset = [];
    for (let i = 1; i < Math.ceil(total_count / limit); i += 1) {
      offset.push(i * limit);
    }
    await Promise.all(
      offset.map(async (i) => {
        try {
          const config2 = {
            headers: { 'auth-token': token },
            params: { limit, offset: i },
          };
          dispatch({ type: viewConstants.BROWSE_ALL_PEER_REVIEW_RECEIVE_START });
          const res2 = await agent.get(`/peer-review/${peerReviewId}/view/receiver-summary`, config2);
          const data2 = res2.data.data.data;
          dispatch({
            type: viewConstants.BROWSE_ALL_PEER_REVIEW_RECEIVE_SUCCESS,
            payload: {
              data: {
                peerReviewId,
                peerReviewSummary: data2.map(
                  ({
                    account_id,
                    username,
                    real_name,
                    student_id,
                    peer_review_record_ids,
                    peer_review_record_scores,
                    average_score,
                  }) => ({
                    account_id,
                    username,
                    real_name,
                    student_id,
                    peer_review_record_ids,
                    score: peer_review_record_scores,
                    average_score,
                  }),
                ),
              },
            },
          });
        } catch (error) {
          dispatch({
            type: viewConstants.BROWSE_ALL_PEER_REVIEW_RECEIVE_FAIL,
            error,
          });
        }
      }),
    );
  } catch (error) {
    dispatch({
      type: viewConstants.BROWSE_ALL_PEER_REVIEW_RECEIVE_FAIL,
      error,
    });
  }
};

export const browseAllPeerReviewReview = (token, peerReviewId) => async (dispatch) => {
  try {
    const limit = 2;
    const config = {
      headers: { 'auth-token': token },
      params: { limit },
    };
    // fetch first time to get total_count
    dispatch({ type: viewConstants.BROWSE_ALL_PEER_REVIEW_REVIEW_START });
    const res = await agent.get(`/peer-review/${peerReviewId}/view/reviewer-summary`, config);
    const { data, total_count } = res.data.data;
    dispatch({
      type: viewConstants.BROWSE_ALL_PEER_REVIEW_REVIEW_SUCCESS,
      payload: {
        data: {
          peerReviewId,
          peerReviewSummary: data.map(
            ({
              account_id,
              username,
              real_name,
              student_id,
              peer_review_record_ids,
              peer_review_record_scores,
              average_score,
            }) => ({
              account_id,
              username,
              real_name,
              student_id,
              peer_review_record_ids,
              score: peer_review_record_scores,
              average_score,
            }),
          ),
        },
      },
    });
    // fetch all data
    const offset = [];
    for (let i = 1; i < Math.ceil(total_count / limit); i += 1) {
      offset.push(i * limit);
    }
    await Promise.all(
      offset.map(async (i) => {
        try {
          const config2 = {
            headers: { 'auth-token': token },
            params: { limit, offset: i },
          };
          dispatch({ type: viewConstants.BROWSE_ALL_PEER_REVIEW_REVIEW_START });
          const res2 = await agent.get(`/peer-review/${peerReviewId}/view/reviewer-summary`, config2);
          const data2 = res2.data.data.data;
          dispatch({
            type: viewConstants.BROWSE_ALL_PEER_REVIEW_REVIEW_SUCCESS,
            payload: {
              data: {
                peerReviewId,
                peerReviewSummary: data2.map(
                  ({
                    account_id,
                    username,
                    real_name,
                    student_id,
                    peer_review_record_ids,
                    peer_review_record_scores,
                    average_score,
                  }) => ({
                    account_id,
                    username,
                    real_name,
                    student_id,
                    peer_review_record_ids,
                    score: peer_review_record_scores,
                    average_score,
                  }),
                ),
              },
            },
          });
        } catch (error) {
          dispatch({
            type: viewConstants.BROWSE_ALL_PEER_REVIEW_REVIEW_FAIL,
            error,
          });
        }
      }),
    );
  } catch (error) {
    dispatch({
      type: viewConstants.BROWSE_ALL_PEER_REVIEW_REVIEW_FAIL,
      error,
    });
  }
};
