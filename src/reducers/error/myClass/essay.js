import { essayConstants } from '../../../actions/myClass/constant';

const initialState = {
  readEssays: null,
  editEssays: null,
  deleteEssays: null,
};

export default function essay(state = initialState, action) {
  switch (action.type) {
    case essayConstants.READ_ESSAY_SUCCESS: {
      return {
        ...state,
        readEssays: null,
      };
    }
    case essayConstants.READ_ESSAY_FAIL: {
      return {
        ...state,
        readEssays: action.error,
      };
    }
    case essayConstants.EDIT_ESSAY_SUCCESS: {
      return {
        ...state,
        editEssays: null,
      };
    }
    case essayConstants.EDIT_ESSAY_FAIL: {
      return {
        ...state,
        editEssays: action.error,
      };
    }
    case essayConstants.DELETE_ESSAY_SUCCESS: {
      return {
        ...state,
        deleteEssays: null,
      };
    }
    case essayConstants.DELETE_ESSAY_FAIL: {
      return {
        ...state,
        deleteEssays: action.error,
      };
    }

    default: {
      return state;
    }
  }
}
