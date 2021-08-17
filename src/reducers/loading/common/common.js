import { commonConstants } from '../../../actions/common/constant';

const initialState = {
  fetchInstitutes: false,
  fetchClassMembers: false,
  editClassMember: false,
  // deleteClassMember: false,
  browseSubmitLang: false,
  fetchCourse: false,
  fetchClass: false,
  fetchAccount: false,
};

export default function common(state = initialState, action) {
  switch (action.type) {
    case commonConstants.GET_INSTITUTE_START: {
      return {
        ...state,
        fetchInstitutes: true,
      };
    }
    case commonConstants.GET_INSTITUTE_SUCCESS: {
      return {
        ...state,
        fetchInstitutes: false,
      };
    }
    case commonConstants.GET_INSTITUTE_FAIL: {
      return {
        ...state,
        fetchInstitutes: false,
      };
    }
    case commonConstants.FETCH_CLASS_MEMBERS_REQUEST: {
      return {
        ...state,
        fetchClassMembers: true,
      };
    }
    case commonConstants.FETCH_CLASS_MEMBERS_SUCCESS: {
      return {
        ...state,
        fetchClassMembers: false,
      };
    }
    case commonConstants.FETCH_CLASS_MEMBERS_FAIL: {
      return {
        ...state,
        fetchClassMembers: false,
      };
    }

    case commonConstants.EDIT_CLASS_MEMBER_REQUEST: {
      return {
        ...state,
        editClassMember: true,
      };
    }
    case commonConstants.EDIT_CLASS_MEMBER_SUCCESS: {
      return {
        ...state,
        editClassMember: false,
      };
    }
    case commonConstants.EDIT_CLASS_MEMBER_FAIL: {
      return {
        ...state,
        editClassMember: false,
      };
    }
    case commonConstants.DELETE_CLASS_MEMBER_REQUEST: {
      return {
        ...state,
        deleteClassMember: true,
      };
    }
    // case commonConstants.DELETE_CLASS_MEMBER_SUCCESS: {
    //   return {
    //     ...state,
    //     deleteClassMember: false,
    //   };
    // }
    // case commonConstants.DELETE_CLASS_MEMBER_FAIL: {
    //   return {
    //     ...state,
    //     deleteClassMember: false,
    //   };
    // }
    case commonConstants.FETCH_COURSE_START: {
      return {
        ...state,
        fetchCourse: true,
      };
    }
    case commonConstants.FETCH_COURSE_SUCCESS: {
      return {
        ...state,
        fetchCourse: false,
      };
    }
    case commonConstants.FETCH_COURSE_FAIL: {
      return {
        ...state,
        fetchCourse: false,
      };
    }
    case commonConstants.FETCH_CLASS_START: {
      return {
        ...state,
        fetchClass: true,
      };
    }
    case commonConstants.FETCH_CLASS_SUCCESS: {
      return {
        ...state,
        fetchClass: false,
      };
    }
    case commonConstants.FETCH_CLASS_FAIL: {
      return {
        ...state,
        fetchClass: false,
      };
    }
    case commonConstants.FETCH_ACCOUNT_REQUEST: {
      return {
        ...state,
        fetchAccount: true,
      };
    }
    case commonConstants.FETCH_ACCOUNT_SUCCESS: {
      return {
        ...state,
        fetchAccount: false,
      };
    }
    case commonConstants.FETCH_ACCOUNT_FAIL: {
      return {
        ...state,
        fetchAccount: false,
      };
    }

    case commonConstants.BROWSE_SUBMISSION_LANG_START: {
      return {
        ...state,
        browseSubmitLang: true,
      };
    }
    case commonConstants.BROWSE_SUBMISSION_LANG_SUCCESS: {
      return {
        ...state,
        browseSubmitLang: false,
      };
    }
    case commonConstants.BROWSE_SUBMISSION_LANG_FAIL: {
      return {
        ...state,
        browseSubmitLang: false,
      };
    }

    default: {
      return state;
    }
  }
}
