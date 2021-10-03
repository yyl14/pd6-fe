import { peerReviewConstants } from '../../../actions/api/constant';

const initialState = {
  readPeerReview: false,
  editPeerReview: false,
  deletePeerReview: false,
};

export default function peerReview(state = initialState, action) {
  switch (action.type) {
    case peerReviewConstants.READ_PEER_REVIEW_START: {
      return {
        ...state,
        readPeerReview: true,
      };
    }
    case peerReviewConstants.READ_PEER_REVIEW_SUCCESS: {
      return {
        ...state,
        readPeerReview: false,
      };
    }
    case peerReviewConstants.READ_PEER_REVIEW_FAIL: {
      return {
        ...state,
        readPeerReview: false,
      };
    }
    case peerReviewConstants.EDIT_PEER_REVIEW_START: {
      return {
        ...state,
        editPeerReview: true,
      };
    }
    case peerReviewConstants.EDIT_PEER_REVIEW_SUCCESS: {
      return {
        ...state,
        editPeerReview: false,
      };
    }
    case peerReviewConstants.EDIT_PEER_REVIEW_FAIL: {
      return {
        ...state,
        editPeerReview: false,
      };
    }
    case peerReviewConstants.DELETE_PEER_REVIEW_START: {
      return {
        ...state,
        deletePeerReview: true,
      };
    }
    case peerReviewConstants.DELETE_PEER_REVIEW_SUCCESS: {
      return {
        ...state,
        deletePeerReview: false,
      };
    }
    case peerReviewConstants.DELETE_PEER_REVIEW_FAIL: {
      return {
        ...state,
        deletePeerReview: false,
      };
    }

    default: {
      return state;
    }
  }
}
