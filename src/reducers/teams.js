import { combineReducers } from 'redux';
import { teamConstants } from '../actions/myClass/constant';

const byId = (state = {}, action) => {
  switch (action.type) {
    case teamConstants.FETCH_TEAMS_SUCCESS: {
      const { data } = action.payload;
      return data.reduce((acc, item) => ({ ...acc, [item.id]: { ...item, teamMemberIds: [], template: {} } }), state);
    }

    case teamConstants.FETCH_TEAM_SUCCESS: {
      const { teamId, data } = action.payload;
      return {
        ...state,
        [teamId]: {
          ...data,
          teamMemberIds: state[teamId] ? state[teamId].teamMemberIds : [],
          template: state[teamId] ? state[teamId].template : [],
        },
      };
    }

    case teamConstants.FETCH_TEAM_MEMBERS_SUCCESS: {
      const { teamId, data } = action.payload;
      return { ...state, [teamId]: { ...state[teamId], teamMemberIds: data.map((item) => item.member_id) } };
    }

    case teamConstants.DOWNLOAD_TEAM_FILE_SUCCESS: {
      return { ...state, template: action.payload };
    }

    default:
      return state;
  }
};

const allIds = (state = [], action) => {
  switch (action.type) {
    case teamConstants.FETCH_TEAMS_SUCCESS: {
      const { data } = action.payload;
      return data.map((item) => item.id);
    }
    case teamConstants.FETCH_TEAM_SUCCESS: {
      const { data } = action.payload;
      return state.includes(action.payload.id) ? state : state.concat([data.id]);
    }

    default:
      return state;
  }
};

export default combineReducers({ byId, allIds });
