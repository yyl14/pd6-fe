import { problemConstants } from '../../../actions/myClass/constant';

const initialState = {
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
};

export default function problem(state = initialState, action) {
  switch (action.type) {
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
    case problemConstants.READ_CHALLENGE_FAIL:
      return {
        ...state,
        readChallenge: action.errors,
      };
    case problemConstants.READ_SUBMISSION_JUDGE_FAIL:
      return {
        ...state,
        readJudgment: action.errors,
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
    default: {
      return state;
    }
  }
}
