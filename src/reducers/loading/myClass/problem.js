import { problemConstants } from '../../../actions/myClass/constant';

const initialState = {
  readProblem: false,
  browseChallengeOverview: false,
  editChallenge: false,
};

export default function problem(state = initialState, action) {
  switch (action.type) {
    case problemConstants.READ_PROBLEM_START:
      return {
        ...state,
        readProblem: true,
      };
    case problemConstants.READ_PROBLEM_SUCCESS:
      return {
        ...state,
        readProblem: false,
      };
    case problemConstants.READ_PROBLEM_FAIL:
      return {
        ...state,
        readProblem: false,
      };

    case problemConstants.READ_CHALLENGE_START:
      return {
        ...state,
        browseChallengeOverview: true,
      };
    case problemConstants.READ_CHALLENGE_SUCCESS:
      return {
        ...state,
        browseChallengeOverview: false,
      };
    case problemConstants.READ_CHALLENGE_FAIL:
      return {
        ...state,
        browseChallengeOverview: false,
      };

    case problemConstants.EDIT_CHALLENGE_START:
      return {
        ...state,
        editChallenge: true,
      };
    case problemConstants.EDIT_CHALLENGE_SUCCESS:
      return {
        ...state,
        editChallenge: false,
      };
    case problemConstants.EDIT_CHALLENGE_FAIL:
      return {
        ...state,
        editChallenge: false,
      };
    default: {
      return state;
    }
  }
}
