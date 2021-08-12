import { teamConstants } from "../../../actions/myClass/constant";

const initialState = {
  fetchClassTeam: null,
  addClassTeam: null,
  fetchTeam: null,
  editTeam: null,
};

export default function team(state = initialState, action) {
  switch (action.type) {
    case teamConstants.FETCH_CLASS_TEAM_SUCCESS: {
      return {
        ...state,
        fetchClassTeam: null,
      };
    }
    case teamConstants.FETCH_CLASS_TEAM_FAIL: {
      return {
        ...state,
        fetchClassTeam: action.error,
      };
    }

    case teamConstants.ADD_CLASS_TEAM_SUCCESS: {
      return {
        ...state,
        addClassTeam: null,
      };
    }
    case teamConstants.ADD_CLASS_TEAM_FAIL: {
      return {
        ...state,
        addClassTeam: action.error,
      };
    }

    case teamConstants.FETCH_TEAM_SUCCESS: {
      return {
        ...state,
        fetchTeam: null,
      };
    }
    case teamConstants.FETCH_TEAM_FAIL: {
      return {
        ...state,
        fetchTeam: action.error,
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

    default: {
      return state;
    }
  };
};
