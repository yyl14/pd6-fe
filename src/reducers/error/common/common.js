import { commonConstants } from '../../../actions/common/constant';

const initialState = {
  fetchInstitutes: null,
  fetchClassMembers: null,
  editClassMember: null,
  // deleteClassMember: null,
  browseSubmitLang: null,
};

export default function common(state = initialState, action) {
  switch (action.type) {
    case commonConstants.GET_INSTITUTE_START: {
      return {
        ...state,
        fetchInstitutes: null,
      };
    }
    case commonConstants.GET_INSTITUTE_SUCCESS: {
      return {
        ...state,
        fetchInstitutes: null,
      };
    }
    case commonConstants.GET_INSTITUTE_FAIL: {
      return {
        ...state,
        fetchInstitutes: action.error,
      };
    }
    case commonConstants.FETCH_CLASS_MEMBERS_SUCCESS: {
      return {
        ...state,
        fetchClassMembers: null,
      };
    }
    case commonConstants.FETCH_CLASS_MEMBERS_FAIL: {
      return {
        ...state,
        fetchClassMembers: action.error,
      };
    }
    case commonConstants.EDIT_CLASS_MEMBER_SUCCESS: {
      return {
        ...state,
        editClassMember: null,
      };
    }
    case commonConstants.EDIT_CLASS_MEMBER_FAIL: {
      return {
        ...state,
        editClassMember: action.error,
      };
    }
    case commonConstants.DELETE_CLASS_MEMBER_SUCCESS: {
      return {
        ...state,
        deleteClassMember: null,
      };
    }
    case commonConstants.DELETE_CLASS_MEMBER_FAIL: {
      return {
        ...state,
        deleteClassMember: action.error,
      };
    }
    case commonConstants.BROWSE_SUBMISSION_LANG_FAIL: {
      return {
        ...state,
        browseSubmitLang: action.errors,
      };
    }
    case commonConstants.BROWSE_SUBMISSION_LANG_SUCCESS: {
      return {
        ...state,
        browseSubmitLang: null,
      };
    }
    default: {
      return state;
    }
  }
}
