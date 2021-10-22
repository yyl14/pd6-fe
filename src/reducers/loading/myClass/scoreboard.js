import { scoreboardConstants } from '../../../actions/myClass/constant';

const initialState = {
  addTeamProjectScoreboardUnderChallenge: false,
  readScoreboard: false,
  editTeamProjectScoreboard: false,
  deleteScoreboard: false,
};

export default function scoreboard(state = initialState, action) {
  switch (action.type) {
    case scoreboardConstants.ADD_TEAM_PROJECT_SCOREBOARD_UNDER_CHALLENGE_START: {
      return {
        ...state,
        addTeamProjectScoreboardUnderChallenge: true,
      };
    }
    case scoreboardConstants.ADD_TEAM_PROJECT_SCOREBOARD_UNDER_CHALLENGE_SUCCESS: {
      return {
        ...state,
        addTeamProjectScoreboardUnderChallenge: false,
      };
    }
    case scoreboardConstants.ADD_TEAM_PROJECT_SCOREBOARD_UNDER_CHALLENGE_FAIL: {
      return {
        ...state,
        addTeamProjectScoreboardUnderChallenge: false,
      };
    }
    case scoreboardConstants.READ_SCOREBOARD_START: {
      return {
        ...state,
        readScoreboard: true,
      };
    }
    case scoreboardConstants.READ_SCOREBOARD_SUCCESS: {
      return {
        ...state,
        readScoreboard: false,
      };
    }
    case scoreboardConstants.READ_SCOREBOARD_FAIL: {
      return {
        ...state,
        readScoreboard: false,
      };
    }
    case scoreboardConstants.EDIT_TEAM_PROJECT_SCOREBOARD_START: {
      return {
        ...state,
        editTeamProjectScoreboard: true,
      };
    }
    case scoreboardConstants.EDIT_TEAM_PROJECT_SCOREBOARD_SUCCESS: {
      return {
        ...state,
        editTeamProjectScoreboard: false,
      };
    }
    case scoreboardConstants.EDIT_TEAM_PROJECT_SCOREBOARD_FAIL: {
      return {
        ...state,
        editTeamProjectScoreboard: false,
      };
    }
    case scoreboardConstants.DELETE_SCOREBOARD_START: {
      return {
        ...state,
        deleteScoreboard: true,
      };
    }
    case scoreboardConstants.DELETE_SCOREBOARD_SUCCESS: {
      return {
        ...state,
        deleteScoreboard: false,
      };
    }
    case scoreboardConstants.DELETE_SCOREBOARD_FAIL: {
      return {
        ...state,
        deleteScoreboard: false,
      };
    }

    default: {
      return state;
    }
  }
}
