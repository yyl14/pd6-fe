import { peerReviewConstants } from '../../../actions/api/constant';

const initialState = {
  readPeerReviewWithProblem: false,
  readPeerReviewRecord: false,
  getTargetProblemChallengeId: false,
};

export default function peerReview(state = initialState, action) {
  switch (action.type) {
    case peerReviewConstants.READ_PEER_REVIEW_WITH_PROBLEM_START: {
      return {
        ...state,
        readPeerReviewWithProblem: true,
      };
    }
    case peerReviewConstants.READ_PEER_REVIEW_WITH_PROBLEM_SUCCESS:
    case peerReviewConstants.READ_PEER_REVIEW_WITH_PROBLEM_FAIL: {
      return {
        ...state,
        readPeerReviewWithProblem: false,
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

    case peerReviewConstants.GET_TARGET_PROBLEM_CHALLENGE_ID_START: {
      return {
        ...state,
        getTargetProblemChallengeId: true,
      };
    }
    case peerReviewConstants.GET_TARGET_PROBLEM_CHALLENGE_ID_SUCCESS:
    case peerReviewConstants.GET_TARGET_PROBLEM_CHALLENGE_ID_FAIL: {
      return {
        ...state,
        getTargetProblemChallengeId: false,
      };
    }

    default: {
      return state;
    }
  }
}
