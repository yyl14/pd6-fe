import { problemConstants } from '../../../actions/myClass/constant';

const initialState = {
  readProblem: false,
  readSubmission: false,
  readChallenge: false,
  readJudgment: false,
  browseTestcase: false,
  browseAssistingData: false,
  editProblem: false,
  deleteProblem: false,
  deleteTestcase: false,
  deleteAssistingData: false,
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
    case problemConstants.READ_CHALLENGE_START:
      return {
        ...state,
        readChallenge: true,
      };
    case problemConstants.READ_CHALLENGE_SUCCESS:
      return {
        ...state,
        readChallenge: false,
      };
    case problemConstants.READ_CHALLENGE_FAIL:
      return {
        ...state,
        readChallenge: false,
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
    case problemConstants.FETCH_TESTCASE_UNDER_PROBLEM_START:
      return {
        ...state,
        browseTestcase: true,
      };
    case problemConstants.FETCH_TESTCASE_UNDER_PROBLEM_SUCCESS:
      return {
        ...state,
        browseTestcase: false,
      };
    case problemConstants.FETCH_TESTCASE_UNDER_PROBLEM_FAIL:
      return {
        ...state,
        browseTestcase: false,
      };
    case problemConstants.BROWSE_ASSISTING_DATA_START:
      return {
        ...state,
        browseAssistingData: true,
      };
    case problemConstants.BROWSE_ASSISTING_DATA_SUCCESS:
      return {
        ...state,
        browseAssistingData: false,
      };
    case problemConstants.BROWSE_ASSISTING_DATA_FAIL:
      return {
        ...state,
        browseAssistingData: false,
      };
    case problemConstants.EDIT_PROBLEM_START:
      return {
        ...state,
        editProblem: true,
      };
    case problemConstants.EDIT_PROBLEM_SUCCESS:
      return {
        ...state,
        editProblem: false,
      };
    case problemConstants.EDIT_PROBLEM_FAIL:
      return {
        ...state,
        editProblem: false,
      };
    case problemConstants.DELETE_PROBLEM_START:
      return {
        ...state,
        deleteProblem: true,
      };
    case problemConstants.DELETE_PROBLEM_SUCCESS:
      return {
        ...state,
        deleteProblem: false,
      };
    case problemConstants.DELETE_PROBLEM_FAIL:
      return {
        ...state,
        deleteProblem: false,
      };
    case problemConstants.DELETE_TESTCASE_START:
      return {
        ...state,
        deleteTestcase: true,
      };
    case problemConstants.DELETE_TESTCASE_SUCCESS:
      return {
        ...state,
        deleteTestcase: false,
      };
    case problemConstants.DELETE_TESTCASE_FAIL:
      return {
        ...state,
        deleteTestcase: false,
      };
    case problemConstants.DELETE_ASSISTING_DATA_START:
      return {
        ...state,
        deleteAssistingData: true,
      };
    case problemConstants.DELETE_ASSISTING_DATA_SUCCESS:
      return {
        ...state,
        deleteAssistingData: false,
      };
    case problemConstants.DELETE_ASSISTING_DATA_FAIL:
      return {
        ...state,
        deleteAssistingData: false,
      };
    default: {
      return state;
    }
  }
}
