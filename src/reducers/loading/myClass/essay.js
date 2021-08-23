import { essayConstants } from '../../../actions/myClass/constant';

const initialState = {
  readEssay: false,
  editEssay: false,
  deleteEssay: false,
  browseEssaySubmission: false,
  uploadEssay: false,
  readEssaySubmission: false,
  reUploadEssay: false,
};

export default function essay(state = initialState, action) {
  switch (action.type) {
    case essayConstants.READ_ESSAY_START: {
      return {
        ...state,
        readEssay: true,
      };
    }
    case essayConstants.READ_ESSAY_SUCCESS: {
      return {
        ...state,
        readEssay: true,
      };
    }
    case essayConstants.READ_ESSAY_FAIL: {
      return {
        ...state,
        readEssay: false,
      };
    }
    case essayConstants.EDIT_ESSAY_START: {
      return {
        ...state,
        editEssay: true,
      };
    }
    case essayConstants.EDIT_ESSAY_SUCCESS: {
      return {
        ...state,
        editEssay: false,
      };
    }
    case essayConstants.EDIT_ESSAY_FAIL: {
      return {
        ...state,
        editEssay: false,
      };
    }
    case essayConstants.DELETE_ESSAY_START: {
      return {
        ...state,
        deleteEssay: true,
      };
    }
    case essayConstants.DELETE_ESSAY_SUCCESS: {
      return {
        ...state,
        deleteEssay: false,
      };
    }
    case essayConstants.DELETE_ESSAY_FAIL: {
      return {
        ...state,
        deleteEssay: false,
      };
    }
    case essayConstants.BROWSE_ESSAY_SUBMISSION_START: {
      return {
        ...state,
        browseEssaySubmission: true,
      };
    }
    case essayConstants.BROWSE_ESSAY_SUBMISSION_SUCCESS: {
      return {
        ...state,
        browseEssaySubmission: true,
      };
    }
    case essayConstants.BROWSE_ESSAY_SUBMISSION_FAIL: {
      return {
        ...state,
        browseEssaySubmission: false,
      };
    }
    case essayConstants.UPLOAD_ESSAY_SUBMISSION_START: {
      return {
        ...state,
        uploadEssay: true,
      };
    }
    case essayConstants.UPLOAD_ESSAY_SUBMISSION_SUCCESS: {
      return {
        ...state,
        uploadEssay: true,
      };
    }
    case essayConstants.UPLOAD_ESSAY_SUBMISSION_FAIL: {
      return {
        ...state,
        uploadEssay: false,
      };
    }
    case essayConstants.READ_ESSAY_SUBMISSION_START: {
      return {
        ...state,
        readEssaySubmission: true,
      };
    }
    case essayConstants.READ_ESSAY_SUBMISSION_SUCCESS: {
      return {
        ...state,
        readEssaySubmission: true,
      };
    }
    case essayConstants.READ_ESSAY_SUBMISSION_FAIL: {
      return {
        ...state,
        readEssaySubmission: false,
      };
    }
    case essayConstants.REUPLOAD_ESSAY_SUBMISSION_START: {
      return {
        ...state,
        reUploadEssay: true,
      };
    }
    case essayConstants.REUPLOAD_ESSAY_SUBMISSION_SUCCESS: {
      return {
        ...state,
        reUploadEssay: true,
      };
    }
    case essayConstants.REUPLOAD_ESSAY_SUBMISSION_FAIL: {
      return {
        ...state,
        reUploadEssay: false,
      };
    }

    default: {
      return state;
    }
  }
}
