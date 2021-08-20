import { teamConstants } from '../../../actions/myClass/constant';

const initialState = {
  fetchTeams: null,
  addTeam: null,
  editTeam: null,

  fetchTeamMember: null,
  addTeamMember: null,
  editTeamMember: null,
  deleteTeamMember: null,
};

export default function team(state = initialState, action) {
  switch (action.type) {
    case teamConstants.FETCH_TEAMS_SUCCESS: {
      return {
        ...state,
        fetchTeams: null,
      };
    }
    case teamConstants.FETCH_TEAMS_FAIL: {
      return {
        ...state,
        fetchTeams: action.error,
      };
    }

    case teamConstants.ADD_TEAM_SUCCESS: {
      return {
        ...state,
        addTeam: null,
      };
    }
    case teamConstants.ADD_TEAM_FAIL: {
      return {
        ...state,
        addTeam: action.error,
      };
    }

    case teamConstants.EDIT_TEAM_SUCCESS: {
      return {
        ...state,
        editTeam: null,
      };
    }
    case teamConstants.EDIT_TEAM_FAIL: {
      return {
        ...state,
        editTeam: action.error,
      };
    }

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

    case teamConstants.ADD_TEAM_MEMBER_SUCCESS: {
      return {
        ...state,
        fetchTeamMember: null,
      };
    }
    case teamConstants.ADD_TEAM_MEMBER_FAIL: {
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
  }
}
