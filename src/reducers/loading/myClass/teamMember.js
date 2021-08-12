import { teamConstants } from "../../../actions/myClass/constant";

const initialState = {
  fetchTeamMember: null,
  editTeamMember: null,
  deleteTeamMember: null,
};

export default function teamMember(state = initialState, action) {
  switch (actin.type) {
    case teamConstants.FETCH_TEAM_MEMBER_START: {
      return {
        ...state,
        fetchTeamMember: true,
      };
    }
    case teamConstants.FETCH_TEAM_MEMBER_SUCCESS: {
      return {
        ...state,
        fetchTeamMember: false,
      };
    }
    case teamConstants.FETCH_TEAM_MEMBER_FAIL: {
      return {
        ...state,
        fetchTeamMember: false,
      };
    }

    case teamConstants.EDIT_TEAM_MEMBER_START: {
      return {
        ...state,
        editTeamMember: true,
      };
    }
    case teamConstants.EDIT_TEAM_MEMBER_SUCCESS: {
      return {
        ...state,
        editTeamMember: false,
      };
    }
    case teamConstants.EDIT_TEAM_MEMBER_FAIL: {
      return {
        ...state,
        editTeamMember: false,
      };
    }

    case teamConstants.DELETE_TEAM_MEMBER_START: {
      return {
        ...state,
        deleteTeamMember: true,
      };
    }
    case teamConstants.DELETE_TEAM_MEMBER_SUCCESS: {
      return {
        ...state,
        deleteTeamMember: false,
      };
    }
    case teamConstants.DELETE_TEAM_MEMBER_FAIL: {
      return {
        ...state,
        deleteTeamMember: false,
      };
    }

    default: {
      return state;
    }
  }
};
