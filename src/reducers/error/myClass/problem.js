import { problemConstants } from '../../../actions/myClass/constant';

const initialState = {
  browseChallengeOverview: null,
  editChallenge: null,
  browseTasksUnderChallenge: null,
  readProblem: null,
};

export default function problem(state = initialState, action) {
  switch (action.type) {
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

    case problemConstants.BROWSE_TASKS_UNDER_CHALLENGE_SUCCESS:
      return {
        ...state,
        browseTasksUnderChallenge: null,
      };
    case problemConstants.BROWSE_TASKS_UNDER_CHALLENGE_FAIL:
      return {
        ...state,
        browseTasksUnderChallenge: action.error,
      };

    case problemConstants.READ_PROBLEM_FAIL:
      return {
        ...state,
        readProblem: action.errors,
      };

    default: {
      return state;
    }
  }
}
