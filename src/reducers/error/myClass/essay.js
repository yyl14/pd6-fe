import { essayConstants } from '../../../actions/myClass/constant';

const initialState = {
  readEssay: null,
  editEssay: null,
  deleteEssay: null,
  browseEssaySubmission: null,
  uploadEssay: null,
  readEssayubmission: null,
  reUploadEssay: null,
};

export default function essay(state = initialState, action) {
  switch (action.type) {
    case essayConstants.READ_ESSAY_SUCCESS: {
      return {
        ...state,
        readEssay: null,
      };
    }
    case essayConstants.READ_ESSAY_FAIL: {
      return {
        ...state,
        readEssay: action.error,
      };
    }
    case essayConstants.EDIT_ESSAY_SUCCESS: {
      return {
        ...state,
        editEssay: null,
      };
    }
    case essayConstants.EDIT_ESSAY_FAIL: {
      return {
        ...state,
        editEssay: action.error,
      };
    }
    case essayConstants.DELETE_ESSAY_SUCCESS: {
      return {
        ...state,
        deleteEssay: null,
      };
    }
    case essayConstants.DELETE_ESSAY_FAIL: {
      return {
        ...state,
        deleteEssay: action.error,
      };
    }
    case essayConstants.BROWSE_ESSAY_SUBMISSION_SUCCESS: {
      return {
        ...state,
        browseEssaySubmission: null,
      };
    }
    case essayConstants.BROWSE_ESSAY_SUBMISSION_FAIL: {
      return {
        ...state,
        browseEssaySubmission: action.error,
      };
    }
    case essayConstants.UPLOAD_ESSAY_SUBMISSION_SUCCESS: {
      return {
        ...state,
        uploadEssay: null,
      };
    }
    case essayConstants.UPLOAD_ESSAY_SUBMISSION_FAIL: {
      return {
        ...state,
        uploadEssay: action.error,
      };
    }
    case essayConstants.READ_ESSAY_SUBMISSION_SUCCESS: {
      return {
        ...state,
        readEssayubmission: null,
      };
    }
    case essayConstants.READ_ESSAY_SUBMISSION_FAIL: {
      return {
        ...state,
        readEssayubmission: action.error,
      };
    }
    case essayConstants.REUPLOAD_ESSAY_SUBMISSION_SUCCESS: {
      return {
        ...state,
        reUploadEssay: null,
      };
    }
    case essayConstants.REUPLOAD_ESSAY_SUBMISSION_FAIL: {
      return {
        ...state,
        reUploadEssay: action.error,
      };
    }

    default: {
      return state;
    }
  }
}
