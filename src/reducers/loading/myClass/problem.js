import { problemConstants } from '../../../actions/myClass/constant';

const initialState = {
  browseChallengeOverview: false,
  editChallenge: false,
  browseTasksUnderChallenge: false,
  readProblem: false,
  readSubmission: false,
  readChallenge: false,
  readJudgment: false,
};

export default function problem(state = initialState, action) {
  switch (action.type) {
    case problemConstants.READ_CHALLENGE_START:
      return {
        ...state,
        browseChallengeOverview: true,
        readChallenge: true,
      };
    case problemConstants.READ_CHALLENGE_SUCCESS:
      return {
        ...state,
        browseChallengeOverview: false,
        readChallenge: false,
      };
    case problemConstants.READ_CHALLENGE_FAIL:
      return {
        ...state,
        browseChallengeOverview: false,
        readChallenge: false,
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
    case problemConstants.READ_SUBMISSION_START:
      return {
        ...state,
        readSubmission: true,
      };
    case problemConstants.READ_SUBMISSION_SUCCESS:
      return {
        ...state,
        readSubmission: false,
      };
    case problemConstants.READ_SUBMISSION_FAIL:
      return {
        ...state,
        readSubmission: false,
      };
    case problemConstants.READ_SUBMISSION_JUDGE_START:
      return {
        ...state,
        readJudgment: true,
      };
    case problemConstants.READ_SUBMISSION_JUDGE_SUCCESS:
      return {
        ...state,
        readJudgment: false,
      };
    case problemConstants.READ_SUBMISSION_JUDGE_FAIL:
      return {
        ...state,
        readJudgment: false,
      };
    default: {
      return state;
    }
  }
}
