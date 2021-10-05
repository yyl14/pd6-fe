import { peerReviewConstants } from '../../../actions/api/constant';

const initialState = {
  readPeerReviewRecord: null,
};

export default function peerReview(state = initialState, action) {
  switch (action.type) {
    case peerReviewConstants.READ_PEER_REVIEW_RECORD_START: {
      return {
        ...state,
        readPeerReviewRecord: null,
      };
    }
    case peerReviewConstants.READ_PEER_REVIEW_RECORD_FAIL: {
      return {
        ...state,
        readPeerReviewRecord: action.error,
      };
    }

    default: {
      return state;
    }
  }
}
