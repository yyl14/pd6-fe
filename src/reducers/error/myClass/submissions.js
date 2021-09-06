import { submissionConstants } from '../../../actions/myClass/constant';

const initialState = {
  fetchClassSubmissions: null,
  fetchSubmission: null,
  browseChallengeOverview: null,
  readSubmissionDetail: null,
  browseJudgeCases: null,
  readTestcase: null,
  getAccountBatch: null,
};

export default function submissions(state = initialState, action) {
  switch (action.type) {
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

    case submissionConstants.READ_SUBMISSION_JUDGE_FAIL: {
      return {
        ...state,
        readSubmissionDetail: action.error,
      };
    }
    case submissionConstants.BROWSE_JUDGE_CASES_FAIL: {
      return {
        ...state,
        browseJudgeCases: action.error,
      };
    }
    case submissionConstants.READ_TESTCASE_FAIL: {
      return {
        ...state,
        readTestcase: action.error,
      };
    }
    case submissionConstants.GET_ACCOUNT_BATCH_FAIL: {
      return {
        ...state,
        getAccountBatch: action.error,
      };
    }
    default:
      return state;
  }
}
