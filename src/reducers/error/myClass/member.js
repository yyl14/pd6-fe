import { memberConstants } from '../../../actions/myClass/constant';

const initialState = {
  fetchClassMembers: null,
  editClassMember: null,
  deleteClassMember: null,
};

export default function member(state = initialState, action) {
  switch (action.type) {
    case memberConstants.FETCH_CLASS_MEMBERS_SUCCESS: {
      return {
        ...state,
        fetchClassMembers: null,
      };
    }
    case memberConstants.FETCH_CLASS_MEMBERS_FAIL: {
      return {
        ...state,
        fetchClassMembers: action.error,
      };
    }
    case memberConstants.EDIT_CLASS_MEMBER_SUCCESS: {
      return {
        ...state,
        editClassMember: null,
      };
    }
    case memberConstants.EDIT_CLASS_MEMBER_FAIL: {
      return {
        ...state,
        editClassMember: action.error,
      };
    }
    case memberConstants.DELETE_CLASS_MEMBER_SUCCESS: {
      return {
        ...state,
        deleteClassMember: null,
      };
    }
    case memberConstants.DELETE_CLASS_MEMBER_FAIL: {
      return {
        ...state,
        deleteClassMember: action.error,
      };
    }

    default: {
      return state;
    }
  }
}
