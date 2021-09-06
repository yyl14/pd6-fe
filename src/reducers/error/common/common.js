import { commonConstants } from '../../../actions/common/constant';

const initialState = {
  fetchInstitutes: null,
  fetchClassMembers: null,
  fetchClassMemberWithAccountReferral: null,
  editClassMember: null,
  replaceClassMembers: null,
  // deleteClassMember: null,
  browseSubmitLang: null,
  fetchCourse: null,
  fetchClass: null,
  fetchChallenge: null,
  fetchAccount: null,
  fetchAllChallengesProblems: null,
  fetchDownloadFileUrl: null,
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
    case commonConstants.FETCH_CLASS_MEMBER_WITH_ACCOUNT_REFERRAL_SUCCESS: {
      return {
        ...state,
        fetchClassMemberWithAccountReferral: null,
      };
    }
    case commonConstants.FETCH_CLASS_MEMBER_WITH_ACCOUNT_REFERRAL_FAIL: {
      return {
        ...state,
        fetchClassMemberWithAccountReferral: action.error,
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
    case commonConstants.REPLACE_CLASS_MEMBERS_SUCCESS: {
      return {
        ...state,
        replaceClassMembers: null,
      };
    }
    case commonConstants.REPLACE_CLASS_MEMBERS_FAIL: {
      return {
        ...state,
        replaceClassMembers: action.error,
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
        browseSubmitLang: action.error,
      };
    }
    case commonConstants.BROWSE_SUBMISSION_LANG_SUCCESS: {
      return {
        ...state,
        browseSubmitLang: null,
      };
    }
    case commonConstants.FETCH_COURSE_SUCCESS: {
      return {
        ...state,
        fetchCourse: null,
      };
    }
    case commonConstants.FETCH_COURSE_FAIL: {
      return {
        ...state,
        fetchCourse: action.error,
      };
    }
    case commonConstants.FETCH_CLASS_SUCCESS: {
      return {
        ...state,
        fetchClass: null,
      };
    }
    case commonConstants.FETCH_CLASS_FAIL: {
      return {
        ...state,
        fetchClass: action.error,
      };
    }
    case commonConstants.READ_CHALLENGE_SUCCESS: {
      return {
        ...state,
        fetchChallenge: null,
      };
    }
    case commonConstants.READ_CHALLENGE_FAIL: {
      return {
        ...state,
        fetchChallenge: action.error,
      };
    }
    case commonConstants.FETCH_ACCOUNT_SUCCESS: {
      return {
        ...state,
        fetchAccount: null,
      };
    }
    case commonConstants.FETCH_ACCOUNT_FAIL: {
      return {
        ...state,
        fetchAccount: action.error,
      };
    }

    case commonConstants.FETCH_ALL_CHALLENGES_PROBLEMS_SUCCESS: {
      return {
        ...state,
        fetchAllChallengesProblems: null,
      };
    }
    case commonConstants.FETCH_ALL_CHALLENGES_PROBLEMS_FAIL: {
      return {
        ...state,
        fetchAllChallengesProblems: action.error,
      };
    }

    case commonConstants.FETCH_DOWNLOAD_FILE_URL_SUCCESS: {
      return {
        ...state,
        fetchDownloadFileUrl: null,
      };
    }
    case commonConstants.FETCH_DOWNLOAD_FILE_URL_FAIL: {
      return {
        ...state,
        fetchDownloadFileUrl: action.error,
      };
    }

    default: {
      return state;
    }
  }
}
