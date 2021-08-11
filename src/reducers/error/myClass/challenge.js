import { challengeConstants } from '../../../actions/myClass/constant';

const initialState = {
  fetchChallenges: null,
  addChallenge: null,
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

    default: {
      return state;
    }
  }
}
