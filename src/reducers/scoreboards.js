import { combineReducers } from 'redux';
import { scoreboardConstants } from '../actions/api/constant';

const prototype = {
  id: null,
  challenge_id: null,
  challenge_label: null,
  title: null,
  target_problem_ids: [],
  is_deleted: null,
  scoreboard_type: null,
  data: {
    scoring_formula: null,
    baseline_team_id: null,
    rank_by_total_score: null,
    team_label_filter: null,
  },
};

const byId = (state = {}, action) => {
  switch (action.type) {
    // case challengeConstants.BROWSE_TASKS_UNDER_CHALLENGE_SUCCESS: {
    //   const { data } = action.payload;
    //   return data.scoreboard.reduce((acc, item) => ({ ...acc, [item.id]: { ...prototype, ...state[item.id], ...item } }), state);
    // }
    case scoreboardConstants.READ_SCOREBOARD_SUCCESS: {
      return {
        ...state,
        [action.payload.id]: { ...prototype, ...state[action.payload.id], ...action.payload },
      };
    }

    default:
      return state;
  }
};

const allIds = (state = [], action) => {
  switch (action.type) {
    // case challengeConstants.BROWSE_TASKS_UNDER_CHALLENGE_SUCCESS: {
    //   const { data } = action.payload;
    //   return [...new Set([...data.scoreboard.map((item) => item.id), ...state])];
    // }
    case scoreboardConstants.READ_SCOREBOARD_SUCCESS: {
      return [...new Set([action.payload.id, ...state])];
    }
    default:
      return state;
  }
};

export default combineReducers({ byId, allIds });
