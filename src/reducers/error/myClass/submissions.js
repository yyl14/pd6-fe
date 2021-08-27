import { submissionConstants } from '../../../actions/myClass/constant';

const initialState = {
  fetchAllSubmissions: null,
  fetchClassSubmissions: null,
  fetchSubmission: null,
  addSubmission: null,
  browseChallengeOverview: null,
  readProblem: null,
  readSubmissionDetail: null,
  browseJudgeCases: null,
  readTestcase: null,
};

export default function submissions(state = initialState, action) {
  switch (action.type) {
    case submissionConstants.FETCH_ALL_SUBMISSIONS_START: {
      return {
        ...state,
        fetchAllSubmissions: null,
      };
    }
    case submissionConstants.FETCH_ALL_SUBMISSIONS_SUCCESS: {
      return {
        ...state,
        fetchAllSubmissions: null,
      };
    }
    case submissionConstants.FETCH_ALL_SUBMISSIONS_FAIL: {
      return {
        ...state,
        fetchAllSubmissions: action.error,
      };
    }

    case submissionConstants.FETCH_SUBMISSION_START: {
      return {
        ...state,
        fetchSubmission: null,
      };
    }
    case submissionConstants.FETCH_SUBMISSION_SUCCESS: {
      return {
        ...state,
        fetchSubmission: null,
      };
    }
    case submissionConstants.FETCH_SUBMISSION_FAIL: {
      return {
        ...state,
        fetchSubmission: action.error,
      };
    }

    case submissionConstants.FETCH_SUBMISSIONS_START: {
      return {
        ...state,
        fetchClassSubmissions: null,
      };
    }
    case submissionConstants.FETCH_SUBMISSIONS_SUCCESS: {
      return {
        ...state,
        fetchClassSubmissions: null,
      };
    }
    case submissionConstants.FETCH_SUBMISSIONS_FAIL: {
      return {
        ...state,
        fetchClassSubmissions: action.error,
      };
    }

    case submissionConstants.ADD_SUBMISSION_START: {
      return {
        ...state,
        addSubmission: null,
      };
    }
    case submissionConstants.ADD_SUBMISSION_SUCCESS: {
      return {
        ...state,
        addSubmission: null,
      };
    }
    case submissionConstants.ADD_SUBMISSION_FAIL: {
      return {
        ...state,
        addSubmission: action.error,
      };
    }
    case submissionConstants.READ_CHALLENGE_FAIL: {
      return {
        ...state,
        browseChallengeOverview: action.errors,
      };
    }
    case submissionConstants.READ_PROBLEM_FAIL: {
      return {
        ...state,
        readProblem: action.errors,
      };
    }
    case submissionConstants.READ_SUBMISSION_JUDGE_FAIL: {
      return {
        ...state,
        readSubmissionDetail: action.errors,
      };
    }
    case submissionConstants.BROWSE_JUDGE_CASES_FAIL: {
      return {
        ...state,
        browseJudgeCases: action.errors,
      };
    }
    case submissionConstants.READ_TESTCASE_FAIL: {
      return {
        ...state,
        readTestcase: action.errors,
      };
    }
    default:
      return state;
  }
}
