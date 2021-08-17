import { problemConstants } from '../../../actions/myClass/constant';

const initialState = {
  readProblem: null,
  browseChallengeOverview: null,
  editChallenge: null,
};

export default function problem(state = initialState, action) {
  switch (action.type) {
    case problemConstants.READ_PROBLEM_FAIL:
      return {
        ...state,
        readProblem: action.errors,
      };

    case problemConstants.READ_CHALLENGE_SUCCESS:
      return {
        ...state,
        browseChallengeOverview: null,
      };
    case problemConstants.READ_CHALLENGE_FAIL:
      return {
        ...state,
        browseChallengeOverview: action.error,
      };

    case problemConstants.EDIT_CHALLENGE_SUCCESS:
      return {
        ...state,
        editChallenge: null,
      };
    case problemConstants.EDIT_CHALLENGE_FAIL:
      return {
        ...state,
        editChallenge: action.error,
      };
    default: {
      return state;
    }
  }
}
