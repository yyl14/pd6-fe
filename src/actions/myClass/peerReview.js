import agent from '../agent';
import { peerReviewConstants } from '../api/constant';
// import { autoTableConstants } from '../component/constant';
// import browseParamsTransForm from '../../function/browseParamsTransform';
import { readAccount } from '../user/user';
import getTextFromUrl from '../../function/getTextFromUrl';

export const readPeerReviewRecord = (token, peerReviewRecordId) => async (dispatch) => {
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

export const debug = () => {
  console.log('debug');
};
