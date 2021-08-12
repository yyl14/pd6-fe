import { teamConstants } from "../../../actions/myClass/constant";

const initialState = {
  fetchTeams: false,
  addTeam: false,
  editTeam: false,

  fetchTeamMember: false,
  editTeamMember: false,
  deleteTeamMember: false,
};

export default function team(state = initialState, action) {
  switch (action.type) {
    case teamConstants.FETCH_TEAMS_START: {
      return {
        ...state,
        fetchTeams: true,
      };
    }
    case teamConstants.FETCH_TEAMS_SUCCESS: {
      return {
        ...state,
        fetchTeams: false,
      };
    }
    case teamConstants.FETCH_TEAMS_FAIL: {
      return {
        ...state,
        fetchTeams: false,
      };
    }

    case teamConstants.ADD_TEAM_START: {
      return {
        ...state,
        addTeam: true,
      };
    }
    case teamConstants.ADD_TEAM_SUCCESS: {
      return {
        ...state,
        addTeam: false,
      };
    }
    case teamConstants.ADD_TEAM_FAIL: {
      return {
        ...state,
        addTeam: false,
      };
    }

    case teamConstants.EDIT_TEAM_START: {
      return {
        ...state,
        editTeam: true,
      };
    }
    case teamConstants.EDIT_TEAM_SUCCESS: {
      return {
        ...state,
        editTeam: false,
      };
    }
    case teamConstants.EDIT_TEAM_FAIL: {
      return {
        ...state,
        editTeam: false,
      };
    }

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

    default:
      return state;
  }
};
