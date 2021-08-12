import { teamConstants } from "../../../actions/myClass/constant";

const initialState = {
  fetchClassTeam: false,
  addClassTeam: false,
  fetchTeam: false,
  editTeam: false,
};

export default function team(state = initialState, action) {
  switch (action.type) {
    case teamConstants.FETCH_CLASS_TEAM_START: {
      return {
        ...state,
        fetchClassTeam: true,
      };
    }
    case teamConstants.FETCH_CLASS_TEAM_SUCCESS: {
      return {
        ...state,
        fetchClassTeam: false,
      };
    }
    case teamConstants.FETCH_CLASS_TEAM_FAIL: {
      return {
        ...state,
        fetchClassTeam: false,
      };
    }

    case teamConstants.ADD_CLASS_TEAM_START: {
      return {
        ...state,
        addClassTeam: true,
      };
    }
    case teamConstants.ADD_CLASS_TEAM_SUCCESS: {
      return {
        ...state,
        addClassTeam: false,
      };
    }
    case teamConstants.ADD_CLASS_TEAM_FAIL: {
      return {
        ...state,
        addClassTeam: false,
      };
    }

  case teamConstants.FETCH_TEAM_START: {
      return {
        ...state,
        fetchTeam: true,
      };
    }
    case teamConstants.FETCH_TEAM_SUCCESS: {
      return {
        ...state,
        fetchTeam: false,
      };
    }
    case teamConstants.FETCH_TEAM_FAIL: {
      return {
        ...state,
        fetchTeam: false,
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

    default: {
      return state;
    }
  }
};
