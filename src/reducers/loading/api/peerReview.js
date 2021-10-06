import { peerReviewConstants } from '../../../actions/api/constant';

const initialState = {
  readPeerReview: false,
  editPeerReview: false,
  deletePeerReview: false,
  readPeerReviewRecord: false,
  submitPeerReviewRecord: false,
  browseAccountReviewedPeerReviewRecord: false,
  browseAccountReceivedPeerReviewRecord: false,
};

export default function view(state = initialState, action) {
  switch (action.type) {
    case peerReviewConstants.READ_PEER_REVIEW_START: {
      return {
        ...state,
        readPeerReview: true,
      };
    }
    case peerReviewConstants.READ_PEER_REVIEW_SUCCESS:
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
    case peerReviewConstants.EDIT_PEER_REVIEW_SUCCESS:
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
    case peerReviewConstants.DELETE_PEER_REVIEW_SUCCESS:
    case peerReviewConstants.DELETE_PEER_REVIEW_FAIL: {
      return {
        ...state,
        deletePeerReview: false,
      };
    }

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

    case peerReviewConstants.SUBMIT_PEER_REVIEW_RECORD_START: {
      return {
        ...state,
        submitPeerReviewRecord: true,
      };
    }
    case peerReviewConstants.SUBMIT_PEER_REVIEW_RECORD_SUCCESS:
    case peerReviewConstants.SUBMIT_PEER_REVIEW_RECORD_FAIL: {
      return {
        ...state,
        submitPeerReviewRecord: false,
      };
    }

    case peerReviewConstants.BROWSE_ACCOUNT_REVIEWED_PEER_REVIEW_RECORD_START: {
      return {
        ...state,
        browseAccountReviewedPeerReviewRecord: true,
      };
    }
    case peerReviewConstants.BROWSE_ACCOUNT_REVIEWED_PEER_REVIEW_RECORD_SUCCESS:
    case peerReviewConstants.BROWSE_ACCOUNT_REVIEWED_PEER_REVIEW_RECORD_FAIL: {
      return {
        ...state,
        browseAccountReviewedPeerReviewRecord: false,
      };
    }

    case peerReviewConstants.BROWSE_ACCOUNT_RECEIVED_PEER_REVIEW_RECORD_START: {
      return {
        ...state,
        browseAccountReceivedPeerReviewRecord: true,
      };
    }
    case peerReviewConstants.BROWSE_ACCOUNT_RECEIVED_PEER_REVIEW_RECORD_SUCCESS:
    case peerReviewConstants.BROWSE_ACCOUNT_RECEIVED_PEER_REVIEW_RECORD_FAIL: {
      return {
        ...state,
        browseAccountReceivedPeerReviewRecord: false,
      };
    }
    default: {
      return state;
    }
  }
}
