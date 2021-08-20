import { essayConstants } from '../../../actions/myClass/constant';

const initialState = {
  readEssays: false,
  editEssays: false,
  deleteEssays: false,
};

export default function essay(state = initialState, action) {
  switch (action.type) {
    case essayConstants.READ_ESSAY_START: {
      return {
        ...state,
        readEssays: true,
      };
    }
    case essayConstants.READ_ESSAY_SUCCESS: {
      return {
        ...state,
        readEssays: true,
      };
    }
    case essayConstants.READ_ESSAY_FAIL: {
      return {
        ...state,
        readEssays: false,
      };
    }
    case essayConstants.EDIT_ESSAY_START: {
      return {
        ...state,
        editEssays: true,
      };
    }
    case essayConstants.EDIT_ESSAY_SUCCESS: {
      return {
        ...state,
        editEssays: false,
      };
    }
    case essayConstants.EDIT_ESSAY_FAIL: {
      return {
        ...state,
        editEssays: false,
      };
    }
    case essayConstants.DELETE_ESSAY_START: {
      return {
        ...state,
        deleteEssays: true,
      };
    }
    case essayConstants.DELETE_ESSAY_SUCCESS: {
      return {
        ...state,
        deleteEssays: false,
      };
    }
    case essayConstants.DELETE_ESSAY_FAIL: {
      return {
        ...state,
        deleteEssays: false,
      };
    }

    default: {
      return state;
    }
  }
}
