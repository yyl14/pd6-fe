import { scoreboardConstants } from '../../../actions/api/constant';

const initialState = {
  addTeamProjectScoreboardUnderChallenge: null,
  readScoreboard: null,
  editTeamProjectScoreboard: null,
  deleteScoreboard: null,
  viewTeamProjectScoreboard: null,
};

export default function scoreboard(state = initialState, action) {
  switch (action.type) {
    case scoreboardConstants.ADD_TEAM_PROJECT_SCOREBOARD_UNDER_CHALLENGE_START: {
      return {
        ...state,
        addTeamProjectScoreboardUnderChallenge: null,
      };
    }
    case scoreboardConstants.ADD_TEAM_PROJECT_SCOREBOARD_UNDER_CHALLENGE_FAIL: {
      return {
        ...state,
        addTeamProjectScoreboardUnderChallenge: action.error,
      };
    }
    case scoreboardConstants.READ_SCOREBOARD_START: {
      return {
        ...state,
        readScoreboard: null,
      };
    }
    case scoreboardConstants.READ_SCOREBOARD_FAIL: {
      return {
        ...state,
        readScoreboard: action.error,
      };
    }
    case scoreboardConstants.EDIT_TEAM_PROJECT_SCOREBOARD_START: {
      return {
        ...state,
        editTeamProjectScoreboard: null,
      };
    }
    case scoreboardConstants.EDIT_TEAM_PROJECT_SCOREBOARD_FAIL: {
      return {
        ...state,
        editTeamProjectScoreboard: action.error,
      };
    }
    case scoreboardConstants.DELETE_SCOREBOARD_START: {
      return {
        ...state,
        deleteScoreboard: null,
      };
    }
    case scoreboardConstants.DELETE_SCOREBOARD_FAIL: {
      return {
        ...state,
        deleteScoreboard: action.error,
      };
    }
    case scoreboardConstants.VIEW_TEAM_PROJECT_SCOREBOARD_START: {
      return {
        ...state,
        viewTeamProjectScoreboard: null,
      };
    }
    case scoreboardConstants.VIEW_TEAM_PROJECT_SCOREBOARD_FAIL: {
      return {
        ...state,
        viewTeamProjectScoreboard: action.error,
      };
    }

    default: {
      return state;
    }
  }
}
