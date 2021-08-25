import { challengeConstants } from '../../../actions/myClass/constant';

const initialState = {
  fetchChallenges: false,
  addChallenge: false,
  editChallenge: false,
  deleteChallenge: false,
};

export default function challenge(state = initialState, action) {
  switch (action.type) {
    case challengeConstants.FETCH_CHALLENGES_REQUEST: {
      return {
        ...state,
        fetchChallenges: true,
      };
    }
    case challengeConstants.FETCH_CHALLENGES_SUCCESS: {
      return {
        ...state,
        fetchChallenges: false,
      };
    }
    case challengeConstants.FETCH_CHALLENGES_FAIL: {
      return {
        ...state,
        fetchChallenges: false,
      };
    }

    case challengeConstants.ADD_CHALLENGE_REQUEST: {
      return {
        ...state,
        addChallenge: true,
      };
    }
    case challengeConstants.ADD_CHALLENGE_SUCCESS: {
      return {
        ...state,
        addChallenge: false,
      };
    }
    case challengeConstants.ADD_CHALLENGE_FAIL: {
      return {
        ...state,
        addChallenge: false,
      };
    }

    case challengeConstants.EDIT_CHALLENGE_REQUEST: {
      return {
        ...state,
        editChallenge: true,
      };
    }
    case challengeConstants.EDIT_CHALLENGE_SUCCESS: {
      return {
        ...state,
        editChallenge: false,
      };
    }
    case challengeConstants.EDIT_CHALLENGE_FAIL: {
      return {
        ...state,
        editChallenge: false,
      };
    }

    case challengeConstants.DELETE_CHALLENGE_REQUEST: {
      return {
        ...state,
        deleteChallenge: true,
      };
    }
    case challengeConstants.DELETE_CHALLENGE_SUCCESS: {
      return {
        ...state,
        deleteChallenge: false,
      };
    }
    case challengeConstants.DELETE_CHALLENGE_FAIL: {
      return {
        ...state,
        deleteChallenge: false,
      };
    }

    default: {
      return state;
    }
  }
}
