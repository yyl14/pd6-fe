import { peerReviewConstants } from '../../../actions/api/constant';

const initialState = {
  readPeerReviewRecord: false,
};

export default function peerReview(state = initialState, action) {
  switch (action.type) {
    case peerReviewConstants.READ_PEER_REVIEW_RECORD_START: {
      return {
        ...state,
        readPeerReviewRecord: true,
      };
    }
    case peerReviewConstants.READ_PEER_REVIEW_RECORD_SUCCESS:
    case peerReviewConstants.READ_PEER_REVIEW_RECORD_FAIL: {
      return {
        ...state,
        readPeerReviewRecord: false,
      };
    }

    default: {
      return state;
    }
  }
}
