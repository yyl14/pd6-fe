import { problemConstants } from '../../../actions/myClass/constant';

const initialState = {
  readProblem: null,
  readSubmission: null,
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
  downloadSamples: null,
  downloadTestcases: null,
  uploadFailFilename: [],
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

    case problemConstants.DOWNLOAD_ALL_SAMPLE_TESTCASE_SUCCESS:
      return {
        ...state,
        downloadSamples: null,
      };
    case problemConstants.DOWNLOAD_ALL_SAMPLE_TESTCASE_FAIL:
      return {
        ...state,
        downloadSamples: action.error,
      };

    case problemConstants.DOWNLOAD_ALL_NON_SAMPLE_TESTCASE_SUCCESS:
      return {
        ...state,
        downloadTestcases: null,
      };
    case problemConstants.DOWNLOAD_ALL_NON_SAMPLE_TESTCASE_FAIL:
      return {
        ...state,
        downloadTestcases: action.error,
      };

    case problemConstants.CLEAR_UPLOAD_FAIL_RECORD: {
      return {
        ...state,
        uploadFailFilename: [],
      };
    }
    case problemConstants.UPLOAD_DATA_FAIL: {
      console.log(action.filename);
      return {
        ...state,
        uploadFailFilename: state.uploadFailFilename.concat([action.filename]),
      };
    }

    default: {
      return state;
    }
  }
}
