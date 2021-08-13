import { memberConstants } from '../../../actions/myClass/constant';

const initialState = {
  fetchClassMembers: false,
  editClassMember: false,
  deleteClassMember: false,
};

export default function member(state = initialState, action) {
  switch (action.type) {
    case memberConstants.FETCH_CLASS_MEMBERS_REQUEST: {
      return {
        ...state,
        fetchClassMembers: true,
      };
    }
    case memberConstants.FETCH_CLASS_MEMBERS_SUCCESS: {
      return {
        ...state,
        fetchClassMembers: false,
      };
    }
    case memberConstants.FETCH_CLASS_MEMBERS_FAIL: {
      return {
        ...state,
        fetchClassMembers: false,
      };
    }

    case memberConstants.EDIT_CLASS_MEMBER_REQUEST: {
      return {
        ...state,
        editClassMember: true,
      };
    }
    case memberConstants.EDIT_CLASS_MEMBER_SUCCESS: {
      return {
        ...state,
        editClassMember: false,
      };
    }
    case memberConstants.EDIT_CLASS_MEMBER_FAIL: {
      return {
        ...state,
        editClassMember: false,
      };
    }
    case memberConstants.DELETE_CLASS_MEMBER_REQUEST: {
      return {
        ...state,
        deleteClassMember: true,
      };
    }
    case memberConstants.DELETE_CLASS_MEMBER_SUCCESS: {
      return {
        ...state,
        deleteClassMember: false,
      };
    }
    case memberConstants.DELETE_CLASS_MEMBER_FAIL: {
      return {
        ...state,
        deleteClassMember: false,
      };
    }

    default: {
      return state;
    }
  }
}
