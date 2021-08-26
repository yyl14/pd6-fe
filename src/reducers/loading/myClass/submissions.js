import { submissionConstants } from '../../../actions/myClass/constant';

const initialState = {
  fetchAllSubmissions: false,
  fetchClassSubmissions: false,
  fetchSubmission: false,
  addSubmission: false,
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

    default:
      return state;
  }
}
