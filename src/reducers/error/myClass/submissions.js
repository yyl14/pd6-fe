import { submissionConstants } from '../../../actions/myClass/constant';

const initialState = {
  fetchAllSubmissions: null,
  fetchSubmission: null,
  addSubmission: null,
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

    default:
      return state;
  }
}
