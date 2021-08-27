import { problemConstants } from '../../../actions/myClass/constant';

const initialState = {
  browseChallengeOverview: null,
  editChallenge: null,
  browseTasksUnderChallenge: null,
  readProblem: null,
  readSubmission: null,
  readChallenge: null,
  readJudgment: null,
  browseTestcase: null,
  browseAssistingData: null,
  editProblem: null,
  deleteProblem: null,
  deleteTestcase: null,
  deleteAssistingData: null,
  editAssistingData: null,
  addAssistingData: null,
  submitCode: null,
  editTestcase: null,
  uploadTestcaseInput: null,
  uploadTestcaseOutput: null,
  addTestcase: null,
  browseJudgeCases: null,
  readTestcase: null,
  readProblemScore: null,
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
        readChallenge: action.errors,
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
    case problemConstants.READ_SUBMISSION_FAIL:
      return {
        ...state,
        readSubmission: action.errors,
      };
    // case problemConstants.READ_CHALLENGE_FAIL:
    //   return {
    //     ...state,
    //     readChallenge: action.errors,
    //   };
    case problemConstants.READ_SUBMISSION_JUDGE_FAIL:
      return {
        ...state,
        readJudgment: action.errors,
      };
    case problemConstants.BROWSE_JUDGE_CASES_FAIL:
      return {
        ...state,
        browseJudgeCases: action.errors,
      };
    case problemConstants.FETCH_TESTCASE_UNDER_PROBLEM_FAIL:
      return {
        ...state,
        browseTestcase: action.errors,
      };
    case problemConstants.BROWSE_ASSISTING_DATA_FAIL:
      return {
        ...state,
        browseAssistingData: action.errors,
      };
    case problemConstants.EDIT_PROBLEM_FAIL:
      return {
        ...state,
        editProblem: action.errors,
      };
    case problemConstants.DELETE_PROBLEM_FAIL:
      return {
        ...state,
        deleteProblem: action.errors,
      };
    case problemConstants.DELETE_TESTCASE_FAIL:
      return {
        ...state,
        deleteTestcase: action.errors,
      };
    case problemConstants.DELETE_ASSISTING_DATA_FAIL:
      return {
        ...state,
        deleteAssistingData: action.errors,
      };
    case problemConstants.EDIT_ASSISTING_DATA_FAIL:
      return {
        ...state,
        editAssistingData: action.errors,
      };
    case problemConstants.ADD_ASSISTING_DATA_FAIL:
      return {
        ...state,
        addAssistingData: action.errors,
      };
    case problemConstants.SUBMIT_PROBLEM_FAIL:
      return {
        ...state,
        submitCode: action.errors,
      };
    case problemConstants.EDIT_TESTCASE_FAIL:
      return {
        ...state,
        editTestcase: action.errors,
      };
    case problemConstants.UPLOAD_TESTCASE_INPUT_FAIL:
      return {
        ...state,
        uploadTestcaseInput: action.errors,
      };
    case problemConstants.UPLOAD_TESTCASE_OUTPUT_FAIL:
      return {
        ...state,
        uploadTestcaseOutput: action.errors,
      };
    case problemConstants.ADD_TESTCASE_FAIL:
      return {
        ...state,
        addTestcase: action.errors,
      };
    case problemConstants.READ_TESTCASE_FAIL:
      return {
        ...state,
        readTestcase: action.errors,
      };
    case problemConstants.READ_PROBLEM_SCORE_FAIL:
      return {
        ...state,
        readProblemScore: action.errors,
      };
    default: {
      return state;
    }
  }
}
