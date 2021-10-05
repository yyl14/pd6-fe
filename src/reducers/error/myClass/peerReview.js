import { peerReviewConstants } from '../../../actions/api/constant';

const initialState = {
  readPeerReviewRecord: null,
  browseAccountAllPeerReviewRecord: null,
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

    case peerReviewConstants.BROWSE_ACCOUNT_ALL_PEER_REVIEW_RECORD_START: {
      return {
        ...state,
        browseAccountAllPeerReviewRecord: null,
      };
    }
    case peerReviewConstants.BROWSE_ACCOUNT_ALL_PEER_REVIEW_RECORD_FAIL: {
      return {
        ...state,
        browseAccountAllPeerReviewRecord: null,
      };
    }

    default: {
      return state;
    }
  }
}
