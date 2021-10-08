import { peerReviewConstants } from '../../../actions/api/constant';

const initialState = {
  readPeerReviewWithProblem: null,
  readPeerReviewRecord: null,
  browseAccountAllPeerReviewRecord: null,
  getTargetProblemChallengeId: null,
};

export default function peerReview(state = initialState, action) {
  switch (action.type) {
    case peerReviewConstants.READ_PEER_REVIEW_WITH_PROBLEM_START: {
      return {
        ...state,
        readPeerReviewWithProblem: null,
      };
    }
    case peerReviewConstants.READ_PEER_REVIEW_WITH_PROBLEM_FAIL: {
      return {
        ...state,
        readPeerReviewWithProblem: action.error,
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

    case peerReviewConstants.GET_TARGET_PROBLEM_CHALLENGE_ID_START: {
      return {
        ...state,
        getTargetProblemChallengeId: null,
      };
    }
    case peerReviewConstants.GET_TARGET_PROBLEM_CHALLENGE_ID_FAIL: {
      return {
        ...state,
        getTargetProblemChallengeId: action.error,
      };
    }

    default: {
      return state;
    }
  }
}
