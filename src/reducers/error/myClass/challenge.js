import { challengeConstants } from '../../../actions/myClass/constant';

const initialState = {
  fetchChallenges: null,
  addChallenge: null,
  fetchChallengeSummary: null,
  editChallenge: null,
  deleteChallenge: null,
};

export default function challenge(state = initialState, action) {
  switch (action.type) {
    case challengeConstants.FETCH_CHALLENGES_SUCCESS: {
      return {
        ...state,
        fetchChallenges: null,
      };
    }
    case challengeConstants.FETCH_CHALLENGES_FAIL: {
      return {
        ...state,
        fetchChallenges: action.error,
      };
    }
    case challengeConstants.ADD_CHALLENGE_SUCCESS: {
      return {
        ...state,
        addChallenge: null,
      };
    }
    case challengeConstants.ADD_CHALLENGE_FAIL: {
      return {
        ...state,
        addChallenge: action.error,
      };
    }
    case challengeConstants.FETCH_CHALLENGE_SUMMARY_SUCCESS: {
      return {
        ...state,
        fetchChallengeSummary: null,
      };
    }
    case challengeConstants.FETCH_CHALLENGE_SUMMARY_FAIL: {
      return {
        ...state,
        fetchChallengeSummary: action.error,
      };
    }

    case challengeConstants.EDIT_CHALLENGE_SUCCESS: {
      return {
        ...state,
        editChallenge: null,
      };
    }
    case challengeConstants.EDIT_CHALLENGE_FAIL: {
      return {
        ...state,
        editChallenge: action.error,
      };
    }

    case challengeConstants.DELETE_CHALLENGE_SUCCESS: {
      return {
        ...state,
        deleteChallenge: null,
      };
    }
    case challengeConstants.DELETE_CHALLENGE_FAIL: {
      return {
        ...state,
        deleteChallenge: action.error,
      };
    }

    default: {
      return state;
    }
  }
}
