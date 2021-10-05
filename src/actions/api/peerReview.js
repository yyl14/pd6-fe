import agent from '../agent';
import { peerReviewConstants } from './constant';
// import { autoTableConstants } from '../component/constant';
// import browseParamsTransForm from '../../function/browseParamsTransform';
// import { readAccount } from '../user/user';

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

export const deletePeerReview = (token, peerReviewId) => async (dispatch) => {
  try {
    const config = {
      headers: {
        'auth-token': token,
      },
    };
    dispatch({ type: peerReviewConstants.DELETE_PEER_REVIEW_START });
    await agent.delete(`peer-review/${peerReviewId}`, config);
    dispatch({ type: peerReviewConstants.DELETE_PEER_REVIEW_SUCCESS });
  } catch (error) {
    dispatch({
      type: peerReviewConstants.DELETE_PEER_REVIEW_FAIL,
      error,
    });
  }
};

// export const readPeerReviewRecord = (token, peerReviewRecordId) => async (dispatch) => {
//   try {
//     const config = { headers: { 'auth-token': token } };
//     dispatch({ type: peerReviewConstants.READ_PEER_REVIEW_RECORD_START });
//     const res = await agent.get(`peer-review-record/${peerReviewRecordId}`, config);
//     if (res.data.data.grader_id !== null || res.data.data.grader_id !== undefined) {
//       dispatch(readAccount(token, res.data.data.grader_id));
//     }
//     if (res.data.data.receiver_id !== null || res.data.data.receiver_id !== undefined) {
//       dispatch(readAccount(token, res.data.data.receiver_id));
//     }

//     dispatch({
//       type: peerReviewConstants.READ_PEER_REVIEW_RECORD_SUCCESS,
//       payload: res.data.data,
//     });
//   } catch (error) {
//     dispatch({
//       type: peerReviewConstants.READ_PEER_REVIEW_RECORD_FAIL,
//       error,
//     });
//   }
// };

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
