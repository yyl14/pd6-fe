import { problemConstants } from '../../../actions/myClass/constant';

const initialState = {
  readProblem: null,
  readSubmission: null,
  readChallenge: null,
  readJudgment: null,
  browseTestcase: null,
  browseAssistingData: null,
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
    default: {
      return state;
    }
  }
}
