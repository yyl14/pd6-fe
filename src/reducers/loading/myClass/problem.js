import { problemConstants } from '../../../actions/myClass/constant';

const initialState = {
  browseChallengeOverview: false,
  editChallenge: false,
  browseTasksUnderChallenge: false,
  readProblem: false,
};

export default function problem(state = initialState, action) {
  switch (action.type) {
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

    case problemConstants.BROWSE_TASKS_UNDER_CHALLENGE_START:
      return {
        ...state,
        browseTasksUnderChallenge: true,
      };
    case problemConstants.BROWSE_TASKS_UNDER_CHALLENGE_SUCCESS:
      return {
        ...state,
        browseTasksUnderChallenge: false,
      };
    case problemConstants.BROWSE_TASKS_UNDER_CHALLENGE_FAIL:
      return {
        ...state,
        browseTasksUnderChallenge: false,
      };

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

    default: {
      return state;
    }
  }
}
