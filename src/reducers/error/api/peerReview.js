import { peerReviewConstants } from '../../../actions/api/constant';

const initialState = {
  readPeerReview: null,
  editPeerReview: null,
  deletePeerReview: null,
  readPeerReviewRecord: null,
  browseAccountReviewedPeerReviewRecord: null,
};

export default function view(state = initialState, action) {
  switch (action.type) {
    case peerReviewConstants.READ_PEER_REVIEW_START: {
      return {
        ...state,
        readPeerReview: null,
      };
    }
    case peerReviewConstants.READ_PEER_REVIEW_FAIL: {
      return {
        ...state,
        readPeerReview: action.error,
      };
    }
    case peerReviewConstants.EDIT_PEER_REVIEW_START: {
      return {
        ...state,
        editPeerReview: null,
      };
    }
    case peerReviewConstants.EDIT_PEER_REVIEW_FAIL: {
      return {
        ...state,
        editPeerReview: action.error,
      };
    }
    case peerReviewConstants.DELETE_PEER_REVIEW_START: {
      return {
        ...state,
        deletePeerReview: null,
      };
    }
    case peerReviewConstants.DELETE_PEER_REVIEW_FAIL: {
      return {
        ...state,
        deletePeerReview: action.error,
      };
    }
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
    case peerReviewConstants.BROWSE_ACCOUNT_REVIEWED_PEER_REVIEW_RECORD_START: {
      return {
        ...state,
        browseAccountReviewedPeerReviewRecord: null,
      };
    }
    case peerReviewConstants.BROWSE_ACCOUNT_REVIEWED_PEER_REVIEW_RECORD_FAIL: {
      return {
        ...state,
        browseAccountReviewedPeerReviewRecord: action.error,
      };
    }

    default: {
      return state;
    }
  }
}
