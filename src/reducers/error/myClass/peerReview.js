import { peerReviewConstants } from '../../../actions/myClass/constant';

const initialState = {
  readPeerReview: null,
  editPeerReview: null,
  deletePeerReview: null,
};

export default function peerReview(state = initialState, action) {
  switch (action.type) {
    case peerReviewConstants.READ_PEER_REVIEW_SUCCESS: {
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
    case peerReviewConstants.EDIT_PEER_REVIEW_SUCCESS: {
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
    case peerReviewConstants.DELETE_PEER_REVIEW_SUCCESS: {
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

    default: {
      return state;
    }
  }
}
