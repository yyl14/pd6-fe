import { combineReducers } from 'redux';
import { teamConstants } from '../actions/myClass/constant';

const byId = (state = {}, action) => {
  switch (action.type) {
    case teamConstants.FETCH_TEAMS_SUCCESS: {
      const { data } = action.payload;
      return data.reduce((acc, item) => ({ ...acc, [item.id]: { ...item, teamMemberIds: [] } }), state );
    }

    case teamConstants.FETCH_TEAM_MEMBER_SUCCESS: {
      const { teamId , data } = action.payload;
      return { ...state, [teamId]: { ...state[teamId], teamMemberIds: data.map((item) => item.member_id) } };
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

    default:
      return state;
  }
};

export default combineReducers({ byId, allIds });
