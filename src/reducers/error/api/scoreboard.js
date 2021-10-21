import { scoreboardConstants } from '../../../actions/api/constant';

const initialState = {
  addTeamProjectScoreboardUnderChallenge: null,
  readScoreboard: null,
  editTeamProjectScoreboard: null,
  deleteScoreboard: null,
};

export default function scoreboard(state = initialState, action) {
  switch (action.type) {
    case scoreboardConstants.ADD_TEAM_PROJECT_SCOREBOARD_UNDER_CHALLENGE_SUCCESS: {
      return {
        ...state,
        addTeamProjectScoreboardUnderChallenge: null,
      };
    }
    case scoreboardConstants.ADD_TEAM_PROJECT_SCOREBOARD_UNDER_CHALLENGE_FAIL: {
      const { error } = action;
      return {
        ...state,
        addTeamProjectScoreboardUnderChallenge: error,
      };
    }
    case scoreboardConstants.READ_SCOREBOARD_SUCCESS: {
      return {
        ...state,
        readScoreboard: null,
      };
    }
    case scoreboardConstants.READ_SCOREBOARD_FAIL: {
      const { error } = action;
      return {
        ...state,
        readScoreboard: error,
      };
    }
    case scoreboardConstants.EDIT_TEAM_PROJECT_SCOREBOARD_SUCCESS: {
      return {
        ...state,
        editTeamProjectScoreboard: null,
      };
    }
    case scoreboardConstants.EDIT_TEAM_PROJECT_SCOREBOARD_FAIL: {
      const { error } = action;
      return {
        ...state,
        editTeamProjectScoreboard: error,
      };
    }
    case scoreboardConstants.DELETE_SCOREBOARD_SUCCESS: {
      return {
        ...state,
        deleteScoreboard: null,
      };
    }
    case scoreboardConstants.DELETE_SCOREBOARD_FAIL: {
      const { error } = action;
      return {
        ...state,
        deleteScoreboard: error,
      };
    }

    default: {
      return state;
    }
  }
}
