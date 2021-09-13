import { submissionConstants } from '../../../actions/myClass/constant';

const initialState = {
  fetchClassSubmissions: false,
  fetchSubmission: false,
  browseChallengeOverview: false,
  readSubmissionDetail: false,
  browseJudgeCases: false,
  readTestcase: false,
  rejudgeSubmission: false,
};

export default function submissions(state = initialState, action) {
  switch (action.type) {
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
    case submissionConstants.REJUDGE_SUBMISSION_START:
      return {
        ...state,
        rejudgeSubmission: true,
      };
    case submissionConstants.REJUDGE_SUBMISSION_SUCCESS:
      return {
        ...state,
        rejudgeSubmission: false,
      };
    case submissionConstants.REJUDGE_SUBMISSION_FAIL:
      return {
        ...state,
        rejudgeSubmission: false,
      };
    default:
      return state;
  }
}
