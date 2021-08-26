import { problemConstants } from '../../../actions/myClass/constant';

const initialState = {
  browseChallengeOverview: false,
  editChallenge: false,
  browseTasksUnderChallenge: false,
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
  editAssistingData: false,
  addAssistingData: false,
  submitCode: false,
  editTestcase: false,
  uploadTestcaseInput: false,
  uploadTestcaseOutput: false,
  addTestcase: false,
  browseJudgeCases: false,
  readTestcase: false,
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
    case problemConstants.BROWSE_JUDGE_CASES_START:
      return {
        ...state,
        browseJudgeCases: true,
      };
    case problemConstants.BROWSE_JUDGE_CASES_SUCCESS:
      return {
        ...state,
        browseJudgeCases: false,
      };
    case problemConstants.BROWSE_JUDGE_CASES_FAIL:
      return {
        ...state,
        browseJudgeCases: false,
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
    case problemConstants.EDIT_ASSISTING_DATA_START:
      return {
        ...state,
        editAssistingData: true,
      };
    case problemConstants.EDIT_ASSISTING_DATA_SUCCESS:
      return {
        ...state,
        editAssistingData: false,
      };
    case problemConstants.EDIT_ASSISTING_DATA_FAIL:
      return {
        ...state,
        editAssistingData: false,
      };
    case problemConstants.ADD_ASSISTING_DATA_START:
      return {
        ...state,
        addAssistingData: true,
      };
    case problemConstants.ADD_ASSISTING_DATA_SUCCESS:
      return {
        ...state,
        addAssistingData: false,
      };
    case problemConstants.ADD_ASSISTING_DATA_FAIL:
      return {
        ...state,
        addAssistingData: false,
      };
    case problemConstants.SUBMIT_PROBLEM_START:
      return {
        ...state,
        submitCode: true,
      };
    case problemConstants.SUBMIT_PROBLEM_SUCCESS:
      return {
        ...state,
        submitCode: false,
      };
    case problemConstants.SUBMIT_PROBLEM_FAIL:
      return {
        ...state,
        submitCode: false,
      };
    case problemConstants.EDIT_TESTCASE_SUCCESS:
      return {
        ...state,
        editTestcase: false,
      };
    case problemConstants.EDIT_TESTCASE_FAIL:
      return {
        ...state,
        editTestcase: false,
      };
    case problemConstants.EDIT_TESTCASE_START:
      return {
        ...state,
        editTestcase: true,
      };
    case problemConstants.UPLOAD_TESTCASE_INPUT_START:
      return {
        ...state,
        uploadTestcaseInput: true,
      };
    case problemConstants.UPLOAD_TESTCASE_INPUT_SUCCESS:
      return {
        ...state,
        uploadTestcaseInput: false,
      };
    case problemConstants.UPLOAD_TESTCASE_INPUT_FAIL:
      return {
        ...state,
        uploadTestcaseInput: false,
      };
    case problemConstants.UPLOAD_TESTCASE_OUTPUT_START:
      return {
        ...state,
        uploadTestcaseOutput: true,
      };
    case problemConstants.UPLOAD_TESTCASE_OUTPUT_SUCCESS:
      return {
        ...state,
        uploadTestcaseOutput: false,
      };
    case problemConstants.UPLOAD_TESTCASE_OUTPUT_FAIL:
      return {
        ...state,
        uploadTestcaseOutput: false,
      };
    case problemConstants.ADD_TESTCASE_START:
      return {
        ...state,
        addTestcase: true,
      };
    case problemConstants.ADD_TESTCASE_SUCCESS:
      return {
        ...state,
        addTestcase: false,
      };
    case problemConstants.ADD_TESTCASE_FAIL:
      return {
        ...state,
        addTestcase: false,
      };
    case problemConstants.READ_TESTCASE_START:
      return {
        ...state,
        readTestcase: true,
      };
    case problemConstants.READ_TESTCASE_SUCCESS:
      return {
        ...state,
        readTestcase: false,
      };
    case problemConstants.READ_TESTCASE_FAIL:
      return {
        ...state,
        readTestcase: false,
      };
    default: {
      return state;
    }
  }
}
