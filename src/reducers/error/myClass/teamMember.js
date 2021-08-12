import { teamConstants } from "../../../actions/myClass/constant";

const initialState = {
  fetchTeamMember: null,
  editTeamMember: null,
  deleteTeamMember: null,
};

export default function teamMember(state = initialState, action) {
  switch (action.type) {
    case teamConstants.FETCH_TEAM_MEMBER_SUCCESS: {
      return {
        ...state,
        fetchTeamMember: null,
      };
    }
    case teamConstants.FETCH_TEAM_MEMBER_FAIL: {
      return {
        ...state,
        fetchTeamMember: action.error,
      };
    }

    case teamConstants.EDIT_TEAM_MEMBER_SUCCESS: {
      return {
        ...state,
        editTeamMember: null,
      };
    }
    case teamConstants.EDIT_TEAM_MEMBER_FAIL: {
      return {
        ...state,
        editTeamMember: action.error,
      };
    }

    case teamConstants.DELETE_TEAM_MEMBER_SUCCESS: {
      return {
        ...state,
        deleteTeamMember: null,
      };
    }
    case teamConstants.DELETE_TEAM_MEMBER_FAIL: {
      return {
        ...state,
        deleteTeamMember: action.error,
      };
    }

    default: {
      return state;
    }
  };
};
