import { submissionConstants } from '../../../actions/myClass/constant';

const initialState = {
  fetchAllSubmissions: false,
  fetchClassSubmissions: false,
  fetchSubmission: false,
  addSubmission: false,
  browseChallengeOverview: false,
  readProblem: false,
  readSubmissionDetail: false,
  browseJudgeCases: false,
  readTestcase: false,
  getAccountBatch: false,
};

export default function submissions(state = initialState, action) {
  switch (action.type) {
    case submissionConstants.FETCH_ALL_SUBMISSIONS_START: {
      return {
        ...state,
        fetchAllSubmissions: true,
      };
    }
    case submissionConstants.FETCH_ALL_SUBMISSIONS_SUCCESS: {
      return {
        ...state,
        fetchAllSubmissions: false,
      };
    }
    case submissionConstants.FETCH_ALL_SUBMISSIONS_FAIL: {
      return {
        ...state,
        fetchAllSubmissions: false,
      };
    }

    case submissionConstants.FETCH_SUBMISSION_START: {
      return {
        ...state,
        fetchSubmission: true,
      };
    }
    case submissionConstants.FETCH_SUBMISSION_SUCCESS: {
      return {
        ...state,
        fetchSubmission: false,
      };
    }
    case submissionConstants.FETCH_SUBMISSION_FAIL: {
      return {
        ...state,
        fetchSubmission: false,
      };
    }

    case submissionConstants.FETCH_SUBMISSIONS_START: {
      return {
        ...state,
        fetchClassSubmissions: true,
      };
    }
    case submissionConstants.FETCH_SUBMISSIONS_SUCCESS: {
      return {
        ...state,
        fetchClassSubmissions: false,
      };
    }
    case submissionConstants.FETCH_SUBMISSIONS_FAIL: {
      return {
        ...state,
        fetchClassSubmissions: false,
      };
    }

    case submissionConstants.ADD_SUBMISSION_START: {
      return {
        ...state,
        addSubmission: true,
      };
    }
    case submissionConstants.ADD_SUBMISSION_SUCCESS: {
      return {
        ...state,
        addSubmission: false,
      };
    }
    case submissionConstants.ADD_SUBMISSION_FAIL: {
      return {
        ...state,
        addSubmission: false,
      };
    }
    case submissionConstants.READ_CHALLENGE_START: {
      return {
        ...state,
        browseChallengeOverview: true,
      };
    }
    case submissionConstants.READ_CHALLENGE_SUCCESS: {
      return {
        ...state,
        browseChallengeOverview: false,
      };
    }
    case submissionConstants.READ_CHALLENGE_FAIL: {
      return {
        ...state,
        browseChallengeOverview: false,
      };
    }
    case submissionConstants.READ_PROBLEM_START: {
      return {
        ...state,
        readProblem: true,
      };
    }
    case submissionConstants.READ_PROBLEM_SUCCESS: {
      return {
        ...state,
        readProblem: false,
      };
    }
    case submissionConstants.READ_PROBLEM_FAIL: {
      return {
        ...state,
        readProblem: false,
      };
    }
    case submissionConstants.READ_SUBMISSION_JUDGE_START: {
      return {
        ...state,
        readSubmissionDetail: true,
      };
    }
    case submissionConstants.READ_SUBMISSION_JUDGE_SUCCESS: {
      return {
        ...state,
        readSubmissionDetail: false,
      };
    }
    case submissionConstants.READ_SUBMISSION_JUDGE_FAIL: {
      return {
        ...state,
        readSubmissionDetail: false,
      };
    }
    case submissionConstants.BROWSE_JUDGE_CASES_START: {
      return {
        ...state,
        browseJudgeCases: true,
      };
    }
    case submissionConstants.BROWSE_JUDGE_CASES_SUCCESS: {
      return {
        ...state,
        browseJudgeCases: false,
      };
    }
    case submissionConstants.BROWSE_JUDGE_CASES_FAIL: {
      return {
        ...state,
        browseJudgeCases: false,
      };
    }
    case submissionConstants.READ_TESTCASE_START: {
      return {
        ...state,
        readTestcase: true,
      };
    }
    case submissionConstants.READ_TESTCASE_SUCCESS: {
      return {
        ...state,
        readTestcase: false,
      };
    }
    case submissionConstants.READ_TESTCASE_FAIL: {
      return {
        ...state,
        readTestcase: false,
      };
    }
    case submissionConstants.GET_ACCOUNT_BATCH_START: {
      return {
        ...state,
        getAccountBatch: true,
      };
    }
    case submissionConstants.GET_ACCOUNT_BATCH_SUCCESS: {
      return {
        ...state,
        getAccountBatch: false,
      };
    }
    case submissionConstants.GET_ACCOUNT_BATCH_FAIL: {
      return {
        ...state,
        getAccountBatch: false,
      };
    }
    default:
      return state;
  }
}
