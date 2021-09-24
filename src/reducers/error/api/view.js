import { viewConstants } from '../../../actions/api/constant';

const initialState = {
  browseAccessLog: null,
  browseAccountWithDefaultStudentId: null,
  browseClassMember: null,
  browseSubmissionUnderClass: null,
  browseMySubmission: null,
};

export default function view(state = initialState, action) {
  switch (action.type) {
    case viewConstants.BROWSE_ACCESS_LOG_START: {
      return {
        ...state,
        browseAccessLog: null,
      };
    }
    case viewConstants.BROWSE_ACCESS_LOG_FAIL: {
      return {
        ...state,
        browseAccessLog: action.error,
      };
    }

    case viewConstants.BROWSE_ACCOUNT_WITH_DEFAULT_STUDENT_ID_START: {
      return {
        ...state,
        browseAccountWithDefaultStudentId: null,
      };
    }
    case viewConstants.BROWSE_ACCOUNT_WITH_DEFAULT_STUDENT_ID_FAIL: {
      return {
        ...state,
        browseAccountWithDefaultStudentId: action.error,
      };
    }

    case viewConstants.BROWSE_CLASS_MEMBER_START: {
      return {
        ...state,
        browseClassMember: null,
      };
    }
    case viewConstants.BROWSE_CLASS_MEMBER_FAIL: {
      return {
        ...state,
        browseClassMember: action.error,
      };
    }

    case viewConstants.BROWSE_SUBMISSION_UNDER_CLASS_START: {
      return {
        ...state,
        browseSubmissionUnderClass: null,
      };
    }
    case viewConstants.BROWSE_SUBMISSION_UNDER_CLASS_FAIL: {
      return {
        ...state,
        browseSubmissionUnderClass: action.error,
      };
    }

    case viewConstants.BROWSE_MYSUBMISSION_START: {
      return {
        ...state,
        browsemySubmission: null,
      };
    }
    case viewConstants.BROWSE_MYSUBMISSION_FAIL: {
      return {
        ...state,
        browseMySubmission: action.error,
      };
    }
    default: {
      return state;
    }
  }
}
