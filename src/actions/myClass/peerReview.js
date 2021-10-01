import agent from '../agent';
import { peerReviewConstants } from './constant';
// import { autoTableConstants } from '../component/constant';
// import browseParamsTransForm from '../../function/browseParamsTransform';

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
